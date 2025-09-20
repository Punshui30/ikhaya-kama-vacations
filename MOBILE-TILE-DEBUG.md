# Mobile Tile Diagnostics

## Quick Debug Re-enable

If mobile destination tiles start flashing or showing cropped text again:

1. **Enable diagnostics:**
   ```tsx
   // In src/router.tsx, uncomment these lines:
   import { TileDiagnostics } from './components/TileDiagnostics';
   // And in the JSX:
   <TileDiagnostics />
   ```

2. **Open mobile viewport** and check browser console for:
   - Computed `object-fit`, `object-position`, dimensions
   - Winning CSS selector (file + line)
   - Asset URL and natural dimensions
   - Any style mutations after hydration

3. **Expected values:**
   - `object-fit: contain` (no cropping)
   - `object-position: center center`
   - Asset: 1024×1536 PNG files only
   - No changes between hydration and +1s

## Current Policy

**Mobile:** `object-fit: contain` with dark letterboxing (`#2a2a2a`) to show full baked-in text
**Desktop:** Same policy for consistency

## Fixed Issues

- ✅ Global `img { height: auto }` override
- ✅ Multiple conflicting `object-fit: cover` rules
- ✅ Duplicate JPG asset references
- ✅ Late CSS overrides after hydration
