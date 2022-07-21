const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password,salt, null, (err, hash) => callback(hash))
        }) //essa função vai gerar um hash 
    }
    const save = (req, res) => {
        obterHash(req.body.password, hash => {
            const password = hash
            app.db('users')
                .insert({
                    name: req.body.name,
                    email: req.body.email,
                    password
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).json(err))
        })
    }
    return { save }
}