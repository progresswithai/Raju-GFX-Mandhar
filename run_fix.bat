@echo off
title Mirrored Website Portfolio Fixer
echo ======================================================
echo          MIRRORED WEBSITE PORTFOLIO FIXER
echo ======================================================
echo This script will automatically replace the broken Divi
echo tabs with custom responsive CSS/JS tabs and download
echo all 9 images locally so they work offline perfectly.
echo.
echo Running Node.js fixer...
node fix_portfolio.js
echo.
echo ======================================================
echo Process complete. Press any key to close.
pause > null
