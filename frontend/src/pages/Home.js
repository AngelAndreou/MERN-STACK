import { useEffect } from "react"
import{useWorkoutsContext} from "../hooks/useWorkoutsContext"

//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = ()=>{

    const {workouts,dispatch}=useWorkoutsContext()

    useEffect(()=>{
        const fetchWorkouts = async ()=>{
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if(response.ok){
                dispatch({type:'SET_WORKOUTS',payload:json})

            }
        }
fetchWorkouts()
    },[dispatch])//empty to only fire once, dispatch reroll if changed types

    return(
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout)=>(
                    //test <p key={workout._id}>{workout.title}</p>
                    <WorkoutDetails key={workout.id} workout={workout}/>

                ))}
            </div>
            <WorkoutForm/>
        </div>
    )
}

export default Home