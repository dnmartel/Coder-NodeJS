process.on("message", function (message) {
    console.log(`Iniciando calculo: ${message}`);
});

const queryParam = parseInt(process.argv[2]);

function between(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function random(cant) {
    const arrNumeros = [];
    for (let i = 1; i <= 1000; i++) {
        let obj = { numero: i, repeticiones: 0 };
        arrNumeros.push(obj);
    }

    for (let i = 0; i <= cant; i++) {
        const num = between(1, 1000);
        arrNumeros.map((n) => {
            if (n.numero === num) {
                n.repeticiones++;
            }
        });
    }

    return arrNumeros;
}

process.send(random(queryParam));
