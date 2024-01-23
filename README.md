# Inventory - Test Project

Proyecto de prueba construido con Docker, PostgreSQL, NodeJS, ExpressJS, Sequelize ORM, JWT, VueJS 3, Vue Router, Pinia, Vee Validate

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

## Credenciales de acceso administrativo

Puedes acceder al software como administrador puedes usar las siguientes credenciales.
Usuario: `gabotest` Contraseña: `qwerty..12345`

## Creación de adminsitradores

Debes crear un registro de usuario que quedará con rol de cliente y posteriormente cambiar el rol a `administrador` en base de datos.
Se debe hacer así porque las credenciales quedan ofuzcadas en la base de datos; el rol no está disponible en el formulario de registro.

## Registro de clientes

Para acceder como cliente, debe registrarse en el formulario de front `http://localhost:9000/account/register` si el registro es exitoso será redirigido a la página de login.

![Formulario de registro](/img/registro.png)

## Acceso de clientes

Acceda a la página de login usuando el siguiente enlace `http://localhost:9000/account/login`, utilice las credenciales que usó en el registro. Si el acceso es exitoso será redirigido al home, en este sitio puede ver el total de productos creados disponibles.

![Formulario de login](./img/login.png)

## Página de inicio

En el home puedes acceder al detalle de cada producto mostrado por medio del botón _ver detalle del producto_ 

![Home](./img/home.png)

## Detalle de productos

En las tarjetas de productos que se muestran en el __Home__ podemos acceder al ficha completa del producto. Esta ficha contiene la información del producto y botones que redirigen al __Home__, al formulario de __edición del producto__ y al formulario de confirmación para __eliminación de productos__.

![Tarjeta de detalle](./img/detalle_producto.png)

## Editar producto

En el formulario de edición de producto, se cargan la información del producto en los campos que están disponibles para ajustar, los atributos que no se puede editar son el identificador único del producto, la fecha de creación y la fecha de actualización, ya que son atributos de auditoría

![Formulario de edición de producto](./img/editar_producto.png)

## Remover producto

El formulario de eliminación de producto sirve como paso de verificación antes de eliminar el registro. 

![Formulario de eliminación de producto](./img/eliminar_producto.png)

## Registro de productos

se puede acceder al registro de productos por medio del enlace __Admin__ que se observa en el _Layout_ de la cabecera.

![Formulario de creación de productos](./img/crear_producto.png)

## Formulario de compras

El acceso al carro de compras se encuentra en el _Layout_ de la cabecera, y te llevará al formulario para la realización de compras.

Este formulario está dividido en dos secciones el formulario de solicitudes y la tabla de ordenes de compra. Para agregar compras debe seleccionar un __producto__ y este actualizará las cantidades disponibles en el selector de __cantidad solicitada__, el formulario realiza los cálculos y así puedes agregar el registro a la tabla de pedidos.

Una vez se haya terminado de agregar pedidos puedes __finalizar la compra__ y este enviará la tabla de pedidos a base de datos.

![Formulario de compras](./img/formulario_compras.png)
