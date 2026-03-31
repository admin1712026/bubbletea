@echo off
REM Скрипт для очистки кеша и перезапуска dev сервера

echo Очистка процессов Node.js...
taskkill /F /IM node.exe 2>nul

echo Ожидание 2 секунды...
timeout /t 2 /nobreak

echo Очистка .next кеша...
rmdir /s /q .next 2>nul

echo Установка зависимостей...
call npm install

echo.
echo ✅ Готово! Сервер запускается...
echo.

call npm run dev

pause
