# Preparar el entorno

Ante todo, debemos tener instalado NODE JS.

```sh
git clone https://github.com/dnmartel/Coder-NodeJS.git
npm install
```

## Producción

```sh
npm start
```

## Desarrollo (nodemon)

```sh
npm run dev
```

## Argumentos

```sh
node .\server.js -p XXXX (-p PORT, por defecto 8080)
```

<http://localhost:8080/info> NO requiere estar logueado
<http://localhost:8080/api/randoms?cant=50000> (posibilidad de usar query param "cant", por defecto 100000000)

### Consignas y comandos

#### Un menú de registro y autenticación de usuarios basado en passport local, guardando en la base de datos las credenciales y el resto de los datos ingresados al momento del registro. El registro de usuario consiste en crear una cuenta en el servidor almacenada en la base de datos, que contenga el email y password de usuario, además de su nombre, dirección, edad, número de teléfono (debe contener todos los prefijos internacionales) y foto ó avatar. La contraseña se almacenará encriptada en la base de datos. La imagen se podrá subir al servidor y se guardará en una carpeta pública del mismo a la cual se tenga acceso por url

```sh
Se realiza el menu de registro (login + sign up) con los campos mencionados. Se utiliza MongoDB como base de datos, ajustando los modelos del Schema para que cumplan con los requisitos pedidos. 
Para subir la imagen, se utiliza multer, siendo la ruta /public/avatars la ubicacion de los archivos. Se configura para mantener la extension de los archivos y se almacena este String como campo dentro del perfil de la persona.
```

#### Un formulario post de registro y uno de login. De modo que, luego de concretarse cualquiera de estas operaciones en forma exitosa, el usuario accederá a su home. El usuario se logueará al sistema con email y password y tendrá acceso a un menú en su vista, a modo de barra de navegación. Esto le permitirá ver los productos totales con los filtros que se hayan implementado y su propio carrito de compras e información propia (datos de registro con la foto). Además, dispondrá de una opción para desloguearse del sistema.  Ante la incorporación de un usuario, el servidor enviará un email al administrador con todos los datos de registro y asunto 'nuevo registro', a una dirección que se encuentre por el momento almacenada en una constante global

```sh
Los formularios se incorporaron en las vistas correspondientes. En la vista home, por defecto se muestran los productos teniendo la barra de navegacion disponible para moverse entre menues (Productos, Carrito, Perfil). En ese mismo menu, se muestra ademas el mensaje de bienvenida personalizado y el boton de desloguearse + el avatar.
Dentro del passport signup, se incluye el envio de correo de registro al administrador.
```

#### Envío de un email y un mensaje de whatsapp al administrador desde el servidor, a un número de contacto almacenado en una constante global. - El usuario iniciará la acción de pedido en la vista del carrito. -Será enviado una vez finalizada la elección para la realizar la compra de productos. -El email contendrá en su cuerpo la lista completa de productos a comprar y en el asunto la frase 'nuevo pedido de ' y el nombre y email del usuario que los solicitó. En el mensaje de whatsapp se debe enviar la misma información del asunto del email. -El usuario recibirá un mensaje de texto al número que haya registrado, indicando que su pedido ha sido recibido y se encuentra en proceso

```sh
Se setea Twilio y Nodemailer para permitir el envio de las notificaciones. Esto se hace a travès de una ruta especifica /notificar, accionada desde el front al momento de emular la compra.
```

#### El servidor trabajará con una base de datos DBaaS (Ej. MongoDB Atlas) y estará preparado para trabajar en forma local o en la nube a través de la plataforma PaaS Heroku

```sh
Como se mencionó anteriormente, se utilizó MongoDB como DBaaS. Además, se sube la instancia a Railways.
```

#### Habilitar el modo cluster para el servidor, como opcional a través de una constante global

```sh
Se agrega el parametro "-m cluster" para indicar que se trabajara en modo cluster.
```

#### Utilizar alguno de los loggers ya vistos y así reemplazar todos los mensajes a consola por logs eficientes hacia la misma consola. En el caso de errores moderados ó graves el log tendrá además como destino un archivo elegido

```sh
Se configura winston como logger. Queda configurado para enviar INFO a consola, WARN y ERROR hacia archivos locales en la carpeta ./log
```
