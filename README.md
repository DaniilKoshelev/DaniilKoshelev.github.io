# web-backend #

## Использование ##
```
    $ docker-compose --env-file resources/docker/.env build
    $ docker-compose --env-file resources/docker/.env up -d 
```

## Остановить контейнеры ##
```
    $ docker-compose --env-file resources/docker/.env down
```

## Вход в контейнеры ##
```
    $ docker-compose --env-file resources/docker/.env exec node bash
    $ docker-compose --env-file resources/docker/.env exec mysql bash
```