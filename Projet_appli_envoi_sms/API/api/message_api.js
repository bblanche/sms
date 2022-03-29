const Messages = require('../models/messages')
const autoCatch = require('../lib/auto-catch').autoCatch

module.exports = {
    createMessage: autoCatch(createMessage),
    getMessage: autoCatch(getMessage),
    deleteMessage: autoCatch(deleteMessage)
}

//handle create message request
async function createMessage(req, res, next){
    const fields = req.body

    //envoie du message au destinaataire en utilisant l'api
    ///////////////////////////////////////////////////////


    fields.sender = req.user.id

    const message = await Messages.create(fields)

    res.json(message)
}

//handle get message request
async function getMessage(req, res, next){
    const message = await Messages.get(req.params.id)

    if(!message) return next()

    if(message && message.sender._id === req.user.id){

        res.json(message)
    }else{
        res.status(401).json({message: 'Unauthorized'})
    }
}

//handle delete message request
async function deleteMessage(req, res, next){
    const message = await Messages.get(req.params.id)

    if(message && message.sender._id === req.user.id){
        await Messages.remove(req.params.id)

        res.json({success: true})

    }else{
        res.status(401).json({message: 'Unauthorized'})
    }
}