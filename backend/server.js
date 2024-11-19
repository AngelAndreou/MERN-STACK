require ('dotenv').config()

const express=require('express')
const workoutRoutes= require('./routes/workouts')

//MONGOOSE
//const mongoose=require('mongoose')

//Sequelize
const Sequelize=require('sequelize')

const sequelize=new Sequelize('test','root','root',

    {dialect:'mysql',
    host: 'localhost',
    port: 3306}
)


//express app as app
const app = express()

//middleware

app.use(express.json()) //when sending data to the server access the data from request body passes to req object



app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})




//routes
app.use('/api/workouts',workoutRoutes)

//connect to db
sequelize.authenticate().then(()=>{
    //listen for requests
    app.listen( process.env.PORT,()=>{
        console.log('connected to db & listening on port',process.env.PORT)})
}).catch((err)=>{console.log(err)}
)

module.exports=sequelize

/*
mongoose.connect(process.env.MONG_URI)
    .then(()=>{
        //listen for requests
        app.listen( process.env.PORT,()=>{
            console.log('connected to db & listening on port',process.env.PORT)
        }
        )
    })
    .catch((error)=>{console.log(error)}
    )
*/
/*
    //listen for requests
app.listen( process.env.PORT,()=>{
    console.log('listening on port',process.env.PORT)
}
)
*/