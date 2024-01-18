#!/bin/bash

docker compose down

docker rmi prueba_tecnica_app:latest postgres:13-bullseye

docker compose up -d