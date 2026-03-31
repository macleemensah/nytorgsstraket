# Fonts

Place your licensed DIN Condensed webfont files here.

## Expected files

The `@font-face` declarations in `src/index.css` expect the following files:

| File | Weight | Style |
|------|--------|-------|
| `DINCondensed-Regular.woff2` | 400 (Regular) | normal |
| `DINCondensed-Regular.woff` | 400 (Regular) | normal |
| `DINCondensed-Bold.woff2` | 700 (Bold) | normal |
| `DINCondensed-Bold.woff` | 700 (Bold) | normal |

## Notes

- `.woff2` is preferred by modern browsers for its superior compression.
- `.woff` is included as a fallback for slightly older browsers.
- Once your files are in this folder, the font will automatically load via the
  `@font-face` rules already defined in `src/index.css`.
- The CSS custom property `--font-din` will switch from the fallback
  (Barlow Condensed) to the real DIN Condensed as soon as the files are present.
