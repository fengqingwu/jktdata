
import { LoadController } from "./loader.js";
let Router = (Expess_, config) => {

    Expess_.get('/', (req, res) => {
        res.send('hello world')
    })

    Expess_.use(LoadController(config));
    return true;
}

export default Router;