const axios = require('axios');
const { xml2js } = require('xml-js');

const { encodeURIs } = require('../utils/string');

class Bcb {
    constructor() {
        this.client = axios.create({
            baseURL: 'https://www3.bcb.gov.br/bc_moeda/rest',
            headers: {
                Accept: 'application/xml'
            }
        });
    }

    async convert(val, origin, dest) {
        const date = new Date();
        const [onlyDate] = date.toISOString().split('T');
        
        const [value, originCurrency, destCurrency] = encodeURIs(val, origin, dest);

        try {
            const resp = await this.client.get(`/converter/${value}/1/${originCurrency}/${destCurrency}/${onlyDate}`);
            let respData = xml2js(resp.data, {compact: true, nativeType: true});
        
            if (respData['valor-convertido']) {
                return Number(respData['valor-convertido']._text);
            }
            throw new Error("Error on convert!");
        } catch (err) {
            if (err.response)
                if (err.response.status === 404)
                    throw new Error("`Origin` AND/OR `Dest` fields are not valid");
                else
                    throw new Error("Error on convert");
            throw err;
        }
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