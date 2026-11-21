#!/bin/sh
set -e
cd /var/www/html

if [ "$RUN_MIGRATIONS" = "true" ]; then

  php artisan migrate --force


  if [ -n "$ADMIN_PASSWORD" ]; then
    php artisan db:seed --class=AdminSeeder --force
  fi
fi

exec "$@"