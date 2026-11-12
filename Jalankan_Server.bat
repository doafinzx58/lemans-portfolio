@echo off
title Server Portofolio Dafin - SMK Telkom Malang
echo Menjalankan local server portofolio...
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
