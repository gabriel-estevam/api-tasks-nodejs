const moment = require('moment')

module.exports = app => {
    const getTasks = (req,res) => {
        const date = req.query.date ? 
                     req.query.date : moment().endOf('day').toDate()

        app.db('tasks')
            .where({ user_id: req.user.id })
            .where('estimate_at', '<=', date)
            .orderBy('estimate_at')
            .then(tasks => res.json(tasks))
            .catch(err => res.status(500).json(err))
    }

    const save = (req,res) => {
        if(!req.body.desc.trim()) {
            return res.status(400).send('Descrição é um campo obrigatório')
        }
        
        req.body.user_id = req.user.id

        app.db('tasks')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).json(err))
    }

    const remove = (req, res) => {
        app.db('tasks')
            .where({ id: req.params.id, user_id: req.user.id })
            .del()
            .then(rowsDeleted => {
                if(rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `Não foi possivel deletar task com id ${req.params.id}.`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(500).json(err))
    }

    const updateTasksDoneAt = (req, res, done_at) => {
        app.db('tasks')
            .where({ id: req.params.id, user_id: req.user.id })
            .update({ done_at })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).json(err))
    }

    const toggleTask = (req, res) => {
        app.db('tasks')
            .where({ id: req.params.id, user_id: req.user.id })
            .first()
            .then(task => {
                if(!task) {
                    const msg = `Task com id ${req.params.id} não encontrada.`
                    res.status(400).send(msg)
                }
                const done_at = task.done_at ? null : new Date()
                updateTasksDoneAt(req,res, done_at)
            })
            .catch((err) => res.status(500).json(err))
    }
    return { getTasks, save, remove, toggleTask }
}