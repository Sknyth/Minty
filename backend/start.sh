#!/bin/bash
set -e

# Load environment variables
if [ -f .env ]; then
  export $(cat .env | grep -v '#' | xargs)
fi

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL environment variable is not set"
  exit 1
fi

echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Starting application..."
node dist/main
