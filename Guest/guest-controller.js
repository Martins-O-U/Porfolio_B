const router = require('express').Router();
const db = require('./guest-model')



router.post("/comments", (req, res) => {
    let { full_name, email_address, comment, number } = req.body;
    // if (full_name && email_address && comment && number) {
    db.insertComment(req.body)
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(error => {
            res.status(500).json(error.message);
        })
    // } else {
    //     res.status(400).json({ message: "Please Provide needed columns (full_name, email_address, comment)" })
    // }
})

// router.post("/parks", authenticate, (req, res) => {
//     let {park_name, park_description, city, country} = req.body;
//     if(park_name && park_description && city && country){
//         db.addPark(req.body)
//         .then(saved => {
//             res.status(201).json(saved)
//         })
//         .catch(error => {
//             res.status(500).json({message: "something went wrong:-. " + error.message});
//         })
//     }else{
//       res.json({message: "Please provide all needed columns (park_name, park_description, city and country)"})
//     }
// })

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