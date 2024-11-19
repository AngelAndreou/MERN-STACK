
const Sequelize = require('sequelize')
//const sequelize=require('../server')


const sequelize=new Sequelize('test','root','root',

    {dialect:'mysql',
    host: 'localhost',
    port: 3306}
)
    
//const Schema=mongoose.Schema

const workoutSchema= sequelize.define('Workout',{
    title:{
        type: Sequelize.DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    reps:{
        type: Sequelize.DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    load:{
        type: Sequelize.DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true
        }  
    }
},{timestamps:true})
workoutSchema.sync().then((data)=>{
    console.log("Table and Model synced successfully!!!")
}).catch((e)=>{
    console.log("Error syncing Table and Model!!!")
})
//return workoutSchema

module.exports=workoutSchema

