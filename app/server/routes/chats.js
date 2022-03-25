//inventory
const express = require("express");
const router = express.Router();

const Chats = require('../models/chats');

router.get('/', (req, res) => {
    Chats.find({})
        .then(chats => res.send(chats))
        .catch(error => console.log(error));
});

router.post('/', (req, res) => {  
     // (new Chats(req.body))
    (new Chats(req.body.data))
    .save()
    .then((chats) => res.send(chats))
    .catch((error) => console.log(error));
    
});

router.get('/:_id', (req, res) => {
    Chats.find({})
        .then(chats => res.send(chats))
        .catch(error => console.log(error));
});

router.put('/:_id', (req, res) => {
    Chats.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(chats => res.send(chats))
        .catch(error => console.log(error));
});

router.patch('/:_id', (req, res) => {
    Chats.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(chats => res.send(chats))
        .catch(error => console.log(error));
});

module.exports = router;
