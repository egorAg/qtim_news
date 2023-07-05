# QTim news

## Для развертывания базы и проекта достаточно поднять все в докере

```shell
docker-compose up --build
```

## Внутри проекта прикреплена настроенная коллекиця Postman v2.1

```shell
open ./Qteam.postman_collection.json
```

### В .env файле лежит конфигурация проекта, он не подтянут к докеру

```dotenv
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=qtim_news
PORT=5001
JWT_ACCESS=qweQWE123
JWT_REF=qweQWE1234
```