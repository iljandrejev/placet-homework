# PlaceGroup Test assignment


### Prerequisites
* [Docker](https://www.docker.com/)

### Container
 - [nginx](https://pkgs.alpinelinux.org/packages?name=nginx&branch=v3.10) 1.16.+
 - [php-fpm](https://pkgs.alpinelinux.org/packages?name=php7&branch=v3.10) 7.3.+
    - [composer](https://getcomposer.org/) 
    - [yarn](https://yarnpkg.com/lang/en/) and [node.js](https://nodejs.org/en/) 
- [mysql](https://hub.docker.com/_/mysql/) 5.7.+

### Installing

Copy `.env.example` file to `.env`


Open project folder in terminal and run docker and connect to container:
```
 docker-compose up --build
 docker-compose exec php sh
 composer install
 yarn build
```

To seed database with fixtures run
```
 php bin/console doctrine:fixtures:load
```

To access dashboard

call [localhost](http://localhost/) in your browser
 
