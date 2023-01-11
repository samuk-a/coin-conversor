module.exports = {
    encodeURIs: (...values) => {
        return values.map(value => encodeURI(value));
    }
}