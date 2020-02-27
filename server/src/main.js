
import Express from 'express'
import AppConfig from "./config/index.js";
import Router from "./router/index.js";
import path from "path";


class jktApp {
    constructor() {
        this.init();
    }
    init() {
        this.config = AppConfig;
        //init express app
        this.Express_ = Express();
        //init static path
        this.Express_.use('/static/', Express.static(this.config.staticFolder));
        //init route
        this.initRoute().then(() => {
            this.run();
        }).catch(e => {
            console.log("error", e)
        })
    }
    initRoute() {
        return new Promise((resolve, reject) => {
            try {
                this.router = Router(this.Express_, this.config);
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