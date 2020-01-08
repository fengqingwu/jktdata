let Router = (Expess_) => {

    Expess_.get('/', (req, res) => {
        res.send('hello world')
    })
}

export default Router;