// Importing modules
const express = require('express');
const router = express.Router();

const Contact = require('../models/movies');

router.get('/contacts', (req, res)=>{
    //res.send('Retrieving contact list');
    Contact.find((err, contacts)=>{
        res.json(contacts);
    })
});

// Add contact
router.post('/contact', (req, res, next)=>{
    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone
    });

    newContact.save((err, contact)=>{
        if(err) res.json({msg: 'Failed to add contact'});
        else res.json({msg: 'Contact added succesfully'});
    });
});

// Delete contact
router.delete('/contact/:id', (req, res, next)=>{
    Contact.remove({_id: req.params.id}, (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    })
});

// Update contact
router.post('/contact', (req, res, next)=>{

});

module.exports = router;