#!/usr/bin/env pwsh
# Скрипт для очистки кеша и перезапуска dev сервера

Write-Host "🧹 Очистка процессов Node.js..." -ForegroundColor Cyan
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

Write-Host "⏳ Ожидание 2 секунды..." -ForegroundColor Cyan
Start-Sleep -Seconds 2

Write-Host "🧹 Очистка .next кеша..." -ForegroundColor Cyan
Remove-Item -Path .next -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "📦 Установка зависимостей..." -ForegroundColor Cyan
npm install

Write-Host ""
Write-Host "✅ Готово! Сервер запускается..." -ForegroundColor Green
Write-Host ""

npm run dev
