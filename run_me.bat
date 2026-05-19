@echo off
echo ====================================================
echo   RAJU GFX - FOOTER & STYLING SYNCHRONIZER
echo ====================================================
echo.
echo Running Cache Alignment...
node fix_et_cache.js
echo.
echo Fixing Background Image Suffixes...
node fix_bg_extensions.js
echo.
echo Syncing and Fixing Footer Styles...
node sync_all_footers.js
echo.
echo ====================================================
echo   SUCCESS! All pages synced perfectly!
echo   Please refresh your browser (Ctrl + F5).
echo ====================================================
pause
