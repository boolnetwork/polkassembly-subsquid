#!/bin/bash

docker compose down
docker compose up -d
npm run build
npx squid-typeorm-migration apply
node -r dotenv/config lib/processor.js
