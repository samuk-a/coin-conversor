const fs = require('fs');

const readFile = () => {
    const data = fs.readFileSync('src/database/coins.json');
    return JSON.parse(data);
}

module.exports = {
    list: () => readFile(),
    findBySymbol: symbol => {
        const data = readFile();
        for (let currency of data) {
            if (currency.symbol === symbol)
                return currency;
        }
        return null;
    }
};