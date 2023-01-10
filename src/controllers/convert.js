const Bcb = require('../clients/bcb');
const { list, findBySymbol } = require('../database/operations')

class Convert {
    async listCurrencies(req, res) {
        let currencies = list();
        return res.json({currencies});
    }

    async coin(req, res) {
        let {value, origin, dest} = req.params;

        if (/\D{3}/g.exec(origin))
            origin = findBySymbol(origin)?.code;
        if (/\D{3}/g.exec(dest))
            dest = findBySymbol(dest)?.code;
        if (!origin || !dest) {
            return res.status(400).json({message: '`Origin` AND/OR `Dest` fields are not valid'});
        }

        try {
            let converted = await Bcb.convert(value, origin, dest);
            return res.json({converted});
        } catch (err) {
            if (err.toString() == 'Error: `Origin` AND/OR `Dest` fields are not valid')
                return res.status(400).json({message: err.toString()});
            return res.status(500).json({message: err.toString()});
        }
    }
}

module.exports = new Convert();