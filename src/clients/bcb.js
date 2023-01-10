const axios = require('axios');
const { xml2js } = require('xml-js');

class Bcb {
    constructor() {
        this.client = axios.create({
            baseURL: 'https://www3.bcb.gov.br/bc_moeda/rest',
            headers: {
                Accept: 'application/xml'
            }
        });
    }

    async convert(value, originCurrency, destCurrency) {
        const date = new Date();
        const [onlyDate] = date.toISOString().split('T');
        const resp = await this.client.get(`/converter/${value}/1/${originCurrency}/${destCurrency}/${onlyDate}`);
        let respData = xml2js(resp.data, {compact: true, nativeType: true});
        
        if (respData['valor-convertido']) {
            return Number(respData['valor-convertido']._text)
        }
        throw new Error("Error on convert!");
    }

    async getCoins() {
        const resp = await this.client.get('/moeda/data');
        const { moedas } = xml2js(resp.data, {compact: true, nativeType: true});
        moedas.moeda.map(obj => {
            Object.keys(obj).forEach(key => {
                obj[key] = obj[key]._text
            });
        });
        return moedas.moeda;
    }
}

module.exports = new Bcb();