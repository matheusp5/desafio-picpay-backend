docker-compose up -d redis mysql
ping 127.0.0.1 -n 10 >nul
docker-compose up -d app

