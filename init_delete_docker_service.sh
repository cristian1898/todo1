#!/bin/bash
	# Delete containers docker
sudo chmod 777 -R *
docker-compose down -v
docker volume prune  -f
docker network prune -f
docker image prune -f

docker-compose build 
    # Up containers docker
docker-compose up -d
echo OK