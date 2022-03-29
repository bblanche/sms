const Discussions = require('../models/discussions')
const autoCatch = require('../lib/auto-catch').autoCatch

module.exports = {
    listDiscussions: autoCatch(listDiscussions),
    getDiscussion: autoCatch(getDiscussion)
}

//handle list discussions request
async function listDiscussions(req, res, next){
    const {offset = 0, limit = 25} = req.query

    const discussions = await Discussions.list({
        offset: Number(offset), 
        limit: Number(limit),
        sender: req.user.id
    })

    res.json(discussions)
}

//handle get discussion request
async function getDiscussion(req, res, next){
    const discussion = await Discussions.get({id: req.params.id})

    if(!discussion) return next()

    res.json(discussion)
}