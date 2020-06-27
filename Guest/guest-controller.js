const router = require('express').Router();
const db = require('./guest-model');
const nodemailer = require('nodemailer');


router.post("/comments", (req, res) => {
    const { name, email, comment, number } = req.body;
    const output = `
            <h4>Hello Martins</h4>
            <p>This is a message from your portfolio contact page</p>
            <h4>Contact Details</h4>
            <ul>
                <li>Name: ${name}</li>
                <li>Email: ${email}</li>
                <li>Number: ${number}</li>
            </ul>
            <h4>Message</h4>
            <p>${comment}</p>  
            `;
    if (name && email && comment) {
        var transporter = nodemailer.createTransport({
            host: 'mail.privateemail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'contact@martinsonyedikachi.com',
                pass: process.env.EMAIL_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        var mailOptions = {
            from: 'contact@martinsonyedikachi.com',
            to: "martinsonyedikachi@gmail.com",
            subject: 'Message From Portfolio Web App',
            html: output
        };
        db.insertComment(req.body)
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.status(500).json({ error: error.message });
            }

            return res.status(200).json({
                message: 'Contact message sent successfully!',
            });
        })
    } else {
        res.json({ message: "Please provide all needed columns (full_name, email_address, comment)" })
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