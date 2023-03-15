const express = require('express')
const router = express.Router()
const { getSightings, createSighting, deleteSighting, updateSighting, getOneSighting, getAllSightings
} = require('../controllers/sighting_controller')

//Add route  protection
const { protect } = require('../middleware/authMiddleware')

//GET all public sightings
router.get('/', getAllSightings)

//GET all sightings for one user
router.get('/user', protect, getSightings)

//GET one sighting
router.get('/:id',protect, getOneSighting)

//CREATE a new sighting
router.post('/', protect,createSighting)

// //DELETE one sighting by id
router.delete('/:id', protect, deleteSighting)

//Update one sighting by id
router.put('/:id', protect, updateSighting)

module.exports = router