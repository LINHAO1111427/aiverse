@echo off
cd /d "C:\Users\Lin\WebstormProjects\aiverse"
if exist "src\app\api.disabled" (
    echo Enabling API routes...
    ren "src\app\api.disabled" "api"
    echo API routes enabled.
) else (
    echo API routes already enabled or not found.
)