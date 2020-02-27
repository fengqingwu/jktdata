class User {
    constructor(config) {
        this.config = config;
    }
    login(req, res) {
        console.log("req", req)
        res.send("User/login")
    }
}

module.exports = User;