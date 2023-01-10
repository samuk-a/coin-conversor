const Bcb = require('../clients/bcb');

class Convert {
    async coin(req, res) {
        const {coin} = req.params;
        const {origin, dest} = req.body;

        let converted = await Bcb.convert(coin, origin, dest);
        return res.json({converted});
    }
}

module.exports = new Convert();