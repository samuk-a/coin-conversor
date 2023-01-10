const Bcb = require('../clients/bcb');
const fs = require('fs');

const populate = (callback) => {
    let coins = [];

    Bcb.getCoins().then(data => {
        data.map(coin => {
            const { simbolo, codigo, nome, nomeFormatado } = coin;
            coins.push({
                simbol: simbolo,
                code: codigo,
                name: nome,
                formattedName: nomeFormatado
            });
        });
        callback(JSON.stringify(coins));
    });
}

const write = content => {
    try {
        fs.writeFileSync('src/database/coins.json', content);
    } catch (err) {
        console.error(err);
    }
}

populate(write);
// console.log(coins);
// coins = JSON.parse(coins);
// write(coins);