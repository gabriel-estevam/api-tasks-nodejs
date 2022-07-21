const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        if(!req.body.email || !req.body.password) {
            return res.status(400).send('Dados incompletos')
        }

        const user = await app.db('users')
                              .where({ email: req.body.email })
                              .first()

        if(user) {
            bcrypt.compare(req.body.password, user.password, (err, isMath) => {
                if(err || !isMath) {
                    return res.status(401).send('Usuário não autorizado') //usuario não autorizado
                }
                          
                const payload = { id: user.id }
                res.json({
                    name: user.name,
                    email: user.email,
                    token: jwt.encode(payload, authSecret), //nesse função ele gera o token no id do usuário com assinatura do authSecret
                })
            })
        }
        else {
            res.status(400).send('Usuário não cadastrado!')
        }    
    }
    
    return { signin }
    
}