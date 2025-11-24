# CORS Error Fix

## What I Did (Frontend Workaround)

### 1. Added Proxy to `package.json`
```json
"proxy": "https://scoring-app-08ju.onrender.com"
```

This tells Create React App to proxy API requests in development, bypassing CORS.

### 2. Updated `src/api/config.ts`
Changed the API base URL to use relative paths in development:
```typescript
export const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? ''  // Use proxy in development
  : 'https://scoring-app-08ju.onrender.com';  // Direct URL in production
```

## How to Test

1. **Stop your dev server** if it's running (Ctrl+C)
2. **Restart it**: `npm start`
3. The app should now work without CORS errors in development

## How It Works

- **Development**: Requests go to `/api/houses` → proxy forwards to `https://scoring-app-08ju.onrender.com/api/houses`
- **Production**: Requests go directly to `https://scoring-app-08ju.onrender.com/api/houses`

## ⚠️ Important Notes

### This is a TEMPORARY workaround for development only!

For production deployment, you **MUST** fix CORS on the backend. The backend needs to add these headers:

```javascript
// Example for Express.js
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://r-pal.github.io');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
```

Or use the `cors` package:
```javascript
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:3000', 'https://r-pal.github.io'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}));
```

## Alternative: CORS Browser Extension (Quick Test Only)

For quick testing, you can install a browser extension:
- Chrome: "CORS Unblock" or "Allow CORS"
- Firefox: "CORS Everywhere"

**⚠️ Only use for testing! Never rely on this for production.**

## Production Deployment

When you deploy to GitHub Pages, the proxy won't work. You need to:

1. **Fix CORS on the backend** (add the headers above)
2. **Whitelist your GitHub Pages domain**: `https://r-pal.github.io`
3. The app will use the full URL automatically in production

## Testing Checklist

- [ ] Restart dev server
- [ ] Check browser console for CORS errors (should be gone)
- [ ] Test fetching houses
- [ ] Test creating a house
- [ ] Test updating a house
- [ ] Test creating a faction
- [ ] Test recording a rite (game)

If CORS errors persist after restart, check:
1. Dev server fully restarted
2. No typos in proxy URL
3. Backend is actually running at that URL
