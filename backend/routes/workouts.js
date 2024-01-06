const express = require('express')
const { 
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout,
 } = require('../controllers/workoutController')

const router = express.Router()

// To get all workouts 
router.get('/', getWorkouts)

// GET a SINGLE workout
router.get('/:id', getWorkout)

// POST a single workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// PATCH a workout
router.patch('/:id', updateWorkout)

module.exports = router