@echo off
set PATH=%PATH%;C:\Users\Chandru\AppData\Local\Microsoft\WinGet\Packages\PHP.PHP.8.3_Microsoft.Winget.Source_8wekyb3d8bbwe;C:\Program Files\7-Zip
cd /d D:\test1
php composer.phar create-project laravel/laravel backend --prefer-dist --no-interaction
