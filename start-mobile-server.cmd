@echo off
title Golden WOK mobile preview
cd /d "%~dp0"
echo Golden WOK is available on this computer:
echo.
echo   http://127.0.0.1:4173
echo.
echo To open it on your phone, use your computer's local network IP:
echo.
echo   http://192.168.0.36:4173
echo.
echo Keep this window open while testing on the phone.
echo If Windows Firewall asks, allow access for private networks.
echo.
"C:\Program Files\nodejs\node.exe" "..\..\work\nori-static-server.js"
pause
