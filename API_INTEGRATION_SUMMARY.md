# Backend API Integration Summary

## Overview
Your Ragnarok Client has been successfully integrated with the backend API at:
**Base URL:** `https://scoring-app-08ju.onrender.com`

## What Was Done

### 1. API Layer Created (`/src/api/`)
- **`config.ts`** - Base configuration and API call helper function
- **`houses.ts`** - All house-related API calls (GET, POST, PATCH, DELETE)
- **`factions.ts`** - All faction-related API calls (GET, POST, PATCH, DELETE)
- **`games.ts`** - All game-related API calls (GET, POST, PATCH, DELETE)
- **`index.ts`** - Central export point for all API functions

### 2. Data Context Created (`/src/context/DataContext.tsx`)
- React Context that manages all data state
- Provides hooks for all CRUD operations
- Automatically refreshes data after mutations
- Handles loading states and errors
- Fetches all data on initial load

### 3. Components Updated
The following components now use the DataContext instead of mock data:

✅ **scoreboard.tsx** - Uses `houses` and `factions` from context, implements delete
✅ **viewHouseModal.tsx** - Uses `updateHouse` for editing houses
✅ **addHouse.tsx** - Uses `createHouse` for creating new houses
✅ **festivalBalance.tsx** - Uses `houses` from context
✅ **newGame.tsx** - Uses `houses` and `createGame` for recording rites
✅ **gameHistory.tsx** - Uses `games` from context
✅ **houseGameHistory.tsx** - Uses `games` from context
✅ **addFaction.tsx** - Uses `houses`, `factions`, and `createFaction`

### 4. App Wrapped with Providers (`/src/index.tsx`)
The DataProvider now wraps the entire app, making data available everywhere.

## API Endpoints Used

### Houses
- `GET /api/houses` - Fetch all houses
- `GET /api/houses/:id` - Fetch single house
- `POST /api/houses` - Create new house
- `PATCH /api/houses/:id` - Update house
- `DELETE /api/houses/:id` - Delete house

### Factions
- `GET /api/factions` - Fetch all factions
- `GET /api/factions/:id` - Fetch single faction
- `POST /api/factions` - Create new faction
- `PATCH /api/factions/:id` - Update faction
- `DELETE /api/factions/:id` - Delete faction

### Games
- `GET /api/games` - Fetch all games
- `GET /api/games/:id` - Fetch single game
- `POST /api/games` - Create new game (record rite)
- `PATCH /api/games/:id` - Update game
- `DELETE /api/games/:id` - Delete game

## How to Use the DataContext

In any component, import and use the hook:

```typescript
import { useData } from '../context/DataContext';

function MyComponent() {
  const { 
    houses,      // Array of all houses
    factions,    // Array of all factions
    games,       // Array of all games
    isLoading,   // Boolean loading state
    error,       // Error message if any
    
    // House operations
    createHouse,
    updateHouse,
    deleteHouse,
    
    // Faction operations
    createFaction,
    updateFaction,
    deleteFaction,
    
    // Game operations
    createGame,
    updateGame,
    deleteGame,
    
    // Refresh all data
    refreshAll
  } = useData();
  
  // Use the data and functions...
}
```

## Testing the Integration

1. **Start the app**: `npm start`
2. **Check the browser console** for any API errors
3. **Test each operation**:
   - View houses on the scoreboard
   - Create a new house
   - Edit a house
   - Delete a house
   - Create a faction
   - Record a new rite (game)
   - View game history

## Important Notes

1. **Mock Data Removed**: The app no longer uses mock data from `/src/mockAPI/`. All data comes from the backend API.

2. **Auto-refresh**: After any create/update/delete operation, the relevant data is automatically refreshed from the server.

3. **Error Handling**: All API calls include try-catch blocks with user-friendly error messages.

4. **Loading States**: The `isLoading` flag can be used to show loading spinners if needed.

5. **CORS**: Make sure your backend API has CORS enabled for your frontend domain.

## Potential Issues to Watch For

1. **API Response Format**: Ensure the backend returns data in the expected format matching your TypeScript interfaces.

2. **Score Calculation**: ✅ **Handled on Frontend** - The backend provides raw scores and strength/weakness data. The frontend applies multipliers (×2 for strength, ÷2 for weakness) using `applyMultipliers()` and `aggregateScores()` helper functions in `/src/helpers/scoreHelpers.ts`. This happens automatically when displaying the scoreboard.

3. **Faction Management**: When creating/deleting factions, the backend should update the related houses.

4. **Network Delays**: The API is hosted on Render's free tier, which may have cold starts. First requests might be slow.

## Next Steps

1. Test all functionality thoroughly
2. Add loading spinners using the `isLoading` state if desired
3. Improve error messages and user feedback
4. Consider adding optimistic updates for better UX
5. Add data validation before API calls
6. Implement proper authentication if needed

## Files You Can Now Delete (Optional)

The following mock API files are no longer used:
- `/src/mockAPI/getHouses.ts`
- `/src/mockAPI/getFactions.ts`
- `/src/mockAPI/getGames.ts`
- `/src/mockAPI/postNewHouse.ts`
- `/src/mockAPI/postNewFaction.ts`
- `/src/mockAPI/postNewGame.ts`

Keep them for now as reference, but they can be deleted once you confirm everything works.
