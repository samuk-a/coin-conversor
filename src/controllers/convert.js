const Bcb = require('../clients/bcb');

class Convert {
    async coin(req, res) {
        const {value} = req.params;
        const {origin, dest} = req.body;

        let converted = await Bcb.convert(value, origin, dest);
        return res.json({converted, moedas});
    }
}

module.exports = new Convert();