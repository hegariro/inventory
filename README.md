# Inventory - Test Project

Proyecto de prueba construido con Docker, NodeJS, ExpressJS, Sequelize ORM, JWT y PostgreSQL

## Requisitos para desplegar el Backend

__Se debe tener instalado y configurado Docker y Docker Compose__

## Comando para desplegar la aplicación en ambiente local

Para desplegar los servicios, debe abrir una consola en la ruta del proyecto y posteriormente ejecutar el siguiente comando:

```bash
$ sh launch.sh
```

## Acceder a la base de datos 

Para acceder a base de datos debe asegurarse que la instancia de postgresql este ejecutandose, puede verificar con el siguiente comando:

```bash
$ docker ps --all
```

para conectarse al contenedor y accesder a `PostgreSQL` utilice los siguientes comandos:

```bash
$ docker exec -it postgresdb /bin/bash
...
$ psql -U toor -d postgresql
```

## Revisar los logs de los contenedores

Para revisar los logs, puede accedaer con los siguientes comandos:


```bash
$ docker logs brm-backend -f # para acceder a los logs de la aplicación
...
$ docker logs postgresdb -f # para acceder a los logs de la base de datos
```

<!-- https://jasonwatmore.com/post/2022/07/25/vue-3-pinia-user-registration-and-login-example-tutorial#add-edit-vue -->