class test {
    constructor(config) {
        this.config = config;
    }
    test(req, res) {
        res.send("test")
    }
}

module.exports = test;