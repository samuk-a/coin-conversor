const axios = require('axios');
const { xml2js } = require('xml-js');

class Bcb {
    constructor() {
        this.client = axios.create({
            baseURL: 'https://www3.bcb.gov.br/bc_moeda/rest/converter',
            headers: {
                Accept: 'application/xml'
            }
        });
    }

    async convert(value, originCurrency, destCurrency) {
        const date = new Date();
        const [onlyDate] = date.toISOString().split('T');
        const resp = await this.client.get(`/${value}/1/${originCurrency}/${destCurrency}/${onlyDate}`);
        let respJson = xml2js(resp.data, {compact: true});
        
        if (respJson['valor-convertido']) {
            return Number(respJson['valor-convertido']._text)
        }
        throw new Error("Error on convert!");
    }
}

module.exports = new Bcb();