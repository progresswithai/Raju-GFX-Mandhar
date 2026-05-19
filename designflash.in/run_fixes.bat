@echo off
echo ===================================================
echo   Design Flash - Local Asset Restorer & Fixer
echo ===================================================
echo.
echo Step 1: Fixing Footer Background...
node fix_footer_background.js
echo.
echo Step 2: Downloading & Restoring all missing assets...
node fix_all_missing_assets.js
echo.
echo ===================================================
echo   Done! All assets downloaded and references fixed!
echo ===================================================
pause
