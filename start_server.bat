@echo off
title Project 08: SpaceX Starship Raptor 3 Spatial CAD
echo ======================================================================
echo  🚀 PROJECT 08: SPACEX STARSHIP RAPTOR 3 SPATIAL CAD ENGINE
echo ======================================================================
echo.
echo Launching local development server on port 8080...
python start_server.py
if %ERRORLEVEL% NEQ 0 (
    echo Python not found. Opening index.html directly in your default browser...
    start index.html
)
pause
