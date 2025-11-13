import { useState, useRef, useCallback } from "react";
import { 
  Box, 
  TextField, 
  Button, 
  CircularProgress, 
  Typography,
  Card,
  CardMedia,
  CardActionArea
} from "@mui/material";

interface CrestSearchProps {
  onSelectCrest: (url: string) => void;
}

interface WikiImage {
  title: string;
  url: string;
  thumbnail: string;
}

export const CrestSearch: React.FC<CrestSearchProps> = ({ onSelectCrest }) => {
  const [searchQuery, setSearchQuery] = useState("coat of arms");
  const [images, setImages] = useState<WikiImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [continueToken, setContinueToken] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const searchWikimedia = async (isLoadMore = false) => {
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
      setImages([]);
      setContinueToken(null);
      setHasMore(true);
    }
    setError(null);
    
    try {
      // Use Wikimedia Commons API
      let apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(searchQuery)}&gsrlimit=20&prop=imageinfo&iiprop=url|size&iiurlwidth=200&origin=*`;

      // Add continue token for pagination
      if (isLoadMore && continueToken) {
        apiUrl += `&gsroffset=${continueToken}`;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.query && data.query.pages) {
        const pages = Object.values(data.query.pages) as any[];
        const imageResults: WikiImage[] = pages
          .filter(page => page.imageinfo && page.imageinfo[0])
          .map(page => ({
            title: page.title.replace('File:', ''),
            url: page.imageinfo[0].url,
            thumbnail: page.imageinfo[0].thumburl || page.imageinfo[0].url
          }));
        
        if (isLoadMore) {
          setImages(prev => [...prev, ...imageResults]);
        } else {
          setImages(imageResults);
        }

        // Check if there are more results
        if (data.continue && data.continue.gsroffset) {
          setContinueToken(data.continue.gsroffset);
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      } else {
        if (!isLoadMore) {
          setImages([]);
          setError("No images found");
        }
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error searching Wikimedia:", err);
      setError("Failed to search images. Please try again.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchWikimedia();
    }
  };

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || loading || loadingMore || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    
    // Load more when user scrolls to within 100px of the bottom
    if (scrollHeight - scrollTop - clientHeight < 100) {
      searchWikimedia(true);
    }
  }, [loading, loadingMore, hasMore, continueToken]);

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Search Wikimedia Commons
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <TextField
          fullWidth
          label="Search for coat of arms"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          size="small"
        />
        <Button 
          variant="contained" 
          onClick={() => searchWikimedia()}
          disabled={loading}
        >
          Search
        </Button>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {!loading && images.length > 0 && (
        <>
          <Box 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
              gap: 2,
              maxHeight: 400, 
              overflow: 'auto' 
            }}
          >
            {images.map((image, index) => (
              <Card key={index}>
                <CardActionArea onClick={() => onSelectCrest(image.url)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={image.thumbnail}
                    alt={image.title}
                    sx={{ objectFit: 'contain', p: 1 }}
                  />
                </CardActionArea>
              </Card>
            ))}
          </Box>
          
          {loadingMore && (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress size={24} />
            </Box>
          )}
          
          {!hasMore && (
            <Typography sx={{ textAlign: 'center', color: 'text.secondary', p: 2, fontSize: '0.875rem' }}>
              No more results
            </Typography>
          )}
        </>
      )}

      {!loading && images.length === 0 && !error && (
        <Typography sx={{ textAlign: 'center', color: 'text.secondary', p: 2 }}>
          Search for coat of arms images from Wikimedia Commons
        </Typography>
      )}
    </Box>
  );
};
