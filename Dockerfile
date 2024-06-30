# Usa l'immagine ufficiale di PHP 8.3 con Apache
FROM php:8.3-apache

# Copia l'intero contenuto del progetto nella directory /var/www/html nel container
COPY . /var/www/html

# Abilita il modulo di rewrite di Apache (utile per Laravel)
RUN a2enmod rewrite

# Installa le dipendenze di PHP necessarie
RUN docker-php-ext-install pdo_mysql

# Imposta i permessi appropriati per le cartelle di storage e cache di Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Installa Composer e dipendenze PHP
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-interaction

# Porta esposta da Apache
EXPOSE 80

# Comando di avvio del server Apache
CMD ["apache2-foreground"]
