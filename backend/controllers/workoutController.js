//import workout model
const Workout=require('../models/workoutModel')
//Sequelize
const Sequelize=require('sequelize')
//id mongoose
//const mongoose=require('mongoose')

//get all workouts
const getWorkouts = async (req,res)=>{
   
    const workouts=await Workout.findAll({order:[['createdAt', 'DESC']]})//.sort({createdAt:-1})
   
   
    res.status(200).json(workouts)
   
}

//get a single workout
const getWorkout=async (req,res)=>{
    const{id}=req.params

   // if(!Sequelize.Types.ObjectId.isValid(id)){
  //      return res.status(404).json({error:'No such Workout'})
   // }
    
   Workout.findOne({
    where: { id: id },
    rejectOnEmpty: true,
  })

    if(!workout){
        return res.status(404).json({error:'No such workout'})
    }

    res.status(200).json(workout)
}
//create a new workout
const createWorkout = async (req,res)=>{
    const{title,load,reps}=req.body

    let emptyFields=[]

    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }

    if(emptyFields.length>0){
        return res.status(400).json({error:'Please fill in all the fields',emptyFields})
    }

    //add doc to db
    try{
        const workout=await Workout.create({title,load,reps})
        console.log(" auto-generated ID:", workout.id);
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
//delete a workout

const deleteWorkout=async (req,res)=>{
    const{id}=req.params

   // if(!Sequelize.Types.ObjectId.isValid(id)){
  //      return res.status(404).json({error:'No such Workout'})
  //  }

    const workout=await Workout.findOne({
        where: { id: id },
        rejectOnEmpty: true,
      })

    if(workout===null){
        return res.status(400).json({error:'No such workout'})
    }
    workout.destroy()
    res.status(200).json(workout)
}
//update a workout
const updateWorkout=async(req,res)=>{
    const{id}=req.params

   // if(!Sequelize.Types.ObjectId.isValid(id)){
   //     return res.status(404).json({error:'No such Workout'})
  //  }

    const workout=await Workout.update({
        ...req.body
    },{where:{
        _id:id,
    }})

    if(!workout){
        return res.status(400).json({error:'No such workout'})
    }
    res.status(200).json(workout)
}

module.exports={
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}