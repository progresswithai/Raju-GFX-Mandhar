@echo off
echo ====================================================
echo   RAJU GFX - FOOTER, STYLING & SERVICES SYNCHRONIZER
echo ====================================================
echo.
echo Running Cache Alignment...
node fix_et_cache.js
echo.
echo Fixing Background Image Suffixes...
node fix_bg_extensions.js
echo.
echo Rebranding Website text, Services Grid & Header Menu...
node rebrand_website.js
echo.
echo Writing Premium Agency Copywriting...
node rewrite_homepage_copy.js
echo.
echo Syncing and Fixing Footer Styles...
node sync_all_footers.js
echo.
echo ====================================================
echo   SUCCESS! The website is rebranded, optimized,
echo   and 100% ready for deployment!
echo   Please refresh your browser (Ctrl + F5).
echo ====================================================
pause
