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

<http://localhost:8080/info> requiere estar logueado
<http://localhost:8080/api/randoms?cant=50000> (posibilidad de usar query param "cant", por defecto 100000000)

## Consignas y comandos

### Tomando con base el proyecto que vamos realizando, agregar un parámetro más en la ruta de comando que permita ejecutar al servidor en modo fork o cluster. Dicho parámetro será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no pasarlo, el servidor iniciará en modo fork

- Agregar en la vista info, el número de procesadores presentes en el servidor.✅
- Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.

```sh
NODEMON
FORK ✅ nodemon server.js -p 8081 -m fork
CLUSTER ✅ nodemon server.js -p 8082 -m cluster
```

- Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo.

```sh
FOREVER
FORK ✅ forever -w start server.js -p 8081 -m fork
CLUSTER ✅ forever -w start server.js -p 8082 -m cluster

LISTAR - forever list
```

- Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo. Tanto en Forever como en PM2 permitir el modo escucha, para que la actualización del código del servidor se vea reflejado inmediatamente en todos los procesos.

```sh
DESDE CMD (en windows)
FORK ✅ pm2 start --name="i01" server.js --watch -- -p 8081
CLUSTER ✅  pm2 start --name="i02" server.js --watch -i max -- -p 8082

LISTAR - pm2 monit
```

- Configurar Nginx para balancear cargas de nuestro servidor de la siguiente manera:
Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.
El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080.

```sh
Renombrar el archivo NGINX/config/nginx.config_consigna1 como nginx.config
Correr nginx.exe desde la carpeta NGINX adjunta.

pm2 start --name="i01" server.js -- -p 8081 -m cluster
pm2 start --name="i02" server.js -- -p 8080

FINALIZAR - pm2 delete all
```

- Luego, modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.

```sh
Renombrar el archivo NGINX/config/nginx.config_consigna2 como nginx.config
Correr nginx.exe desde la carpeta NGINX adjunta.

pm2 start --name="i01" server.js -- -p 8080
pm2 start --name="i02" server.js -- -p 8082
pm2 start --name="i03" server.js -- -p 8083
pm2 start --name="i04" server.js -- -p 8084
pm2 start --name="i05" server.js -- -p 8085

```
