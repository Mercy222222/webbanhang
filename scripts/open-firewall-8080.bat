@echo off
echo Mo cong 8080 tren Windows Firewall...
netsh advfirewall firewall delete rule name="TechStore Port 8080" >nul 2>&1
netsh advfirewall firewall add rule name="TechStore Port 8080" dir=in action=allow protocol=TCP localport=8080
echo.
echo XONG! Gio co the truy cap TechStore tu dien thoai:
echo http://192.168.1.179:8080/index.html
echo.
pause
