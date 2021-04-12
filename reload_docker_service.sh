#!/bin/bash
	# Delete containers docker
sudo chmod 777 -R *
docker-compose down -v
#docker-compose build
    # Up containers docker
docker-compose up -d
echo OK
