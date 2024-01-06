const Workout = require('../models/workoutModel')
const mongoose =  require('mongoose')

// Get all workouts
const getWorkouts = async (request, response) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    response.status(200).json(workouts)
}
// Get a single workout
const getWorkout = async (request, response) => {
    const { id } = request.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({error: 'No such workout.'})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return response.status(404).json({error: 'No such workout.'})
    }

    response.status(200).json(workout)
}

// Create a new workout
const createWorkout = async (request, response) => {
    const {title, load, reps} = request.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }

    if(!load) {
        emptyFields.push('load')
    }

    if(!reps) {
        emptyFields.push('reps')
    }

    if(emptyFields.length > 0) {
        return response.status(400).json({error: 'Please fill in all of the fields.', emptyFields})
    }

    // Add document to database
    try {
        const workout = await Workout.create({title, load, reps})
        response.status(200)
        response.json(workout)
    } catch(error) {
        response.status(400)
        response.json({error: error.message})
    }
}
// Delete a workout 
const deleteWorkout = async (request, response) => {
    const { id } = request.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({error: 'No such workout.'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return response.status(404).json({error: 'No such workout.'})
    }

    response.status(200).json(workout)
    
}
// Update a workout
const updateWorkout = async (request, response) => {
    const { id } = request.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({error: 'No such workout.'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...request.body
    })

    if (!workout) {
        return response.status(404).json({error: 'No such workout.'})
    }

    response.status(200).json(workout)
}

module.exports = {
    getWorkout,
    getWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkout,
}