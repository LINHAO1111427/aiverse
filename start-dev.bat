@echo off
echo Cleaning build cache...
if exist .next rmdir /s /q .next 2>nul
if exist out rmdir /s /q out 2>nul

echo Starting development server...
set NODE_ENV=development
npm run dev