const router = require('express').Router();
const db = require('./guest-model')



router.post("/comments", (req, res) => {
    let { name, email, comment, number } = req.body;
    if (name && email && comment) {
        db.insertComment(req.body)
            .then(saved => {
                res.status(201).json(saved)
            })
            .catch(error => {
                res.status(500).json(error.message);
            })
    } else {
        res.status(400).json({ message: "Please Provide needed columns (full_name, email_address, comment)" })
    }
})

router.get("/comments", (req, res) => {
    db.getGuestComments()
        .then(comments => {
            res.status(200).json(comments)
        })
        .catch(error => {
            res.status(500).json({ message: "Oops!, Something went wrong. " + error.message })
        })
})

router.get("/comments/:id", (req, res) => {
    db.findCommentById(req.params.id)
        .then(comment => {
            if (comment) {
                res.status(200).json(comment)
            } else {
                res.json({ message: `A Message with ID ${req.params.id} does not exist in the database` })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Something went wrong:-" + error.message })
        })
})

router.get("/comments/:name", (req, res) => {
    db.findCommentByName(req.params.id)
        .then(comment => {
            if (comment) {
                res.status(200).json(comment)
            } else {
                res.json({ message: `A Message with a sender name "${req.params.id}" does not exist in the database` })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Something went wrong:-" + error.message })
        })
})


module.exports = router