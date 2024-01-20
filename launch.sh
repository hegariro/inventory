#!/bin/bash

docker compose down

docker rmi prueba_tecnica_frontend:latest # prueba_tecnica_backend:latest # postgres:13-bullseye

docker compose up -d