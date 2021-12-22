cd %~dp0

echo Y | del "com"
echo Y | del "eap"
echo Y | del "tsk"
echo Y | rmdir "com"
echo Y | rmdir "eap"
echo Y | rmdir "tsk"

mklink /d "com" "..\..\..\ows-web-com\src"
mklink /d "eap" "..\..\..\ows-web-eap\src"
mklink /d "tsk" "..\..\..\ows-web-tsk\src"

pause