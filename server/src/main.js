
import Express from 'express'
import AppConfig from "./config/index.js";
import Router from "./router/index.js";

class jktApp {
    constructor() {
        this.init();
    }
    init() {
        this.config = AppConfig;
        this.Express_ = Express();
        this.initRoute().then(() => {
            this.run();
        })
    }
    initRoute() {
        return new Promise((resolve, reject) => {
            try {
                this.router = new Router(this.Express_);
                if (this.router) {
                    resolve(this.router);
                } else {
                    reject()
                }
            } catch (error) {
                reject(error);
            }
        })
    }
    run() {
        this.Express_.listen(this.config.port, () => {
            console.log("server is running at " + this.config.port);
        })
    }
}


export default jktApp;