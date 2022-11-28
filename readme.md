## Preparar el entorno

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

http://localhost:8080/info requiere estar logueado 
http://localhost:8080/api/randoms?cant=50000 (posibilidad de usar query param "cant", por defecto 100000000)