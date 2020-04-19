const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("../models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({  extended: true  }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGOD_URI || "mongod://localhost/populate", { useNewUrlParser: true });

//Creates Workouts Library
db.Library.create({ name: "Workouts" })
    .then(dbLibrary => {
        console.log(dbLibrary);
    })
    .catch(({message}) => {
        console.log(message);
    });

    //Creates new Workout
    app.post("/submit", ({body}, res) => {
        db.Workout.create(body)
            .then(({_id}) => db.Library.findOneAndUpdate({}, { $push: { workout: _id } }, { new: true}))
            .then(dbLibrary => {
                res.json(dbLibrary);
            })
            .catch(err => {
                res.json(err);
            });
    });

    //Gets all workouts
    app.get("/workouts", (req, res) => {
        db.Workout.find({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.listen(PORT, () => {
        console.log(`App running on port ${PORT}!`);
    });