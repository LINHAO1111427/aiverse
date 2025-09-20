@echo off
cd /d "C:\Users\Lin\WebstormProjects\aiverse"
if exist "src\app\api" (
    echo Disabling API routes for static export...
    ren "src\app\api" "api.disabled"
    echo API routes disabled.
) else (
    echo API routes already disabled or not found.
)