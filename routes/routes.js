const express = require('express');
const router = express.Router();

const Model = require('../model/model');

router.post('/post', async (req, res) => {
   
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave); 
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
});

router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3) READ ONE - get a single record by its ID
router.get('/getOne/:id', async (req, res) => {
    try {
        // req.params.id grabs the ":id" part of the URL
        const data = await Model.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 4) UPDATE - change an existing record by its ID
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;   // the new values sent by the client
        const options = { new: true };  // return the UPDATED record, not the old one

        const result = await Model.findByIdAndUpdate(id, updatedData, options);
        res.send(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 5) DELETE - remove a record by its ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.send(`Document with name "${data.name}" has been deleted.`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;