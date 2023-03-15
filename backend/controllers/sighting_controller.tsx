const asyncHandler = require('express-async-handler')
//mongoose model
let Sighting = require('../models/sightingModel');
const User = require('../models/userModel')



//CREATE a sighting
//POST /api/sightings/
//Access Level Public
const createSighting = asyncHandler(async (req, res) => {

    const newSighting = await Sighting.create({
        date: Date.parse(req.body.date),
        time: req.body.time,
        location: req.body.location,
        species: req.body.species,
        images: req.body.images,
        description: req.body.description,
        user: req.user.id
    })
    if (!newSighting) {
        res.status(400)
        throw new Error('Please fill in required fields.')
    }
    res.status(200).json(newSighting)

})

//READ all sightings
//GET /api/sightings/
//Access Level Public
const getAllSightings = asyncHandler(async (req, res) => {
    //get sightings through our mongoDB returns all of the sightings
    const feedSightings = await Sighting.find()

    res.status(200).json(feedSightings)
})

//READ all sightings from one user
//GET /api/sightings/user
//Access Level Private
const getSightings = asyncHandler(async (req, res) => {
    //get sightings through our mongoDB returns all of the sightings
    const allSightings = await Sighting.find({ user: req.user.id })

    res.status(200).json(allSightings)
})

//need this?
//READ ONE sighting
//GET /api/sightings/:id
const getOneSighting = asyncHandler(async (req, res) => {
    //get one sighting from mongodb, returns one sighting by ID
    const oneSighting = await Sighting.findById(req.params.id)

    res.status(200).json(oneSighting)
})

//UPDATE Sighting
//PUT /api/sightings/:id
//Access Level Private
const updateSighting = asyncHandler(async (req, res) => {

    const sighting = await Sighting.findById(req.params.id)

    if (!sighting) {
        res.status(400)
        throw new Error('Sighting not found')
    }

    //Check for  user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    //Make sure user matches the record to be updated
    if (sighting.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    //New set to true will tell mongoose to create it if the sighting does not exist
    const updatedSighting = await Sighting.findByIdAndUpdate(req.params.id, req.
        body, {
        new: true,
    })

    res.status(200).json(updatedSighting)
})


//DELETE Sighting 
//DELETE /api/sightings/:id
//Access Level Private
const deleteSighting = asyncHandler(async (req, res) => {

    const sighting = await Sighting.findById(req.params.id)

    if (!sighting) {
        res.status(400)
        throw new Error('Sighting does not exist')
    }

    //Check for  user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    //Make sure user matches the record that is trying to be deleted
    if (sighting.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }


    await sighting.remove()
    res.status(200).json(`This object document has been deleted succesfully ${req.params.id}!`)
})



module.exports = {
    getSightings,
    createSighting,
    deleteSighting,
    updateSighting,
    getOneSighting,
    getAllSightings
}