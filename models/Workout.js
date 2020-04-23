const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now()
    },
    exercises: [
        {
            type: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            duration: {
                type: Number,
                required: true
            },
            weight: Number,
            sets: Number,
            reps: Number,
            distance: Number,
        }
    ]
});

//virtuals
//loop through exercises array (this.exercises) and add up all durations
//regular for loop or .reduce() array method
//call it totalDuration

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;