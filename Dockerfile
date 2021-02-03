FROM node:12

# SYSTEM PACKAGES
RUN apt-get update && apt-get install -y \
    libicu-dev \
    libjpeg-dev \
    libpng-dev \
    librabbitmq-dev \
    librdkafka-dev \
    libxslt-dev \
    libzip-dev \
    libpq-dev \
    exim4-daemon-light \
    git \
    nginx \
    procps \
    supervisor \
    unzip \
    nano

# CLEAN UP CONTAINER
RUN apt purge -y \
    && apt autoremove -y --purge \
    && apt clean all


# NODE JS RUNTIME
WORKDIR /app
RUN chown -R www-data:www-data /app
USER www-data
COPY --chown=www-data:www-data . .

USER root

# NGINX
RUN rm /etc/nginx/nginx.conf && chown -R www-data:www-data /var/www/html /run /var/lib/nginx /var/log/nginx
COPY docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
ENTRYPOINT [ "/app/docker/entrypoint.sh" ]
