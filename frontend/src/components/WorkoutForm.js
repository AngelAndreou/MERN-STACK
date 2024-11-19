import { useState } from "react"
import{useWorkoutsContext} from "../hooks/useWorkoutsContext"

//mantine style
import { Button, Group, NumberInput, TextInput } from '@mantine/core';


const WorkoutForm=()=>{

    const {dispatch}=useWorkoutsContext()

    const[title,setTitle]=useState('')
    const[load,setLoad]=useState('')
    const[reps,setReps]=useState('')

    const[error,setError]=useState(null)
    const[emptyFields,setEmptyFields]=useState([])

    

    const handleSubmit=async (e) =>{
        e.preventDefault()
        const workout ={title,load,reps}

        const response=await fetch('/api/workouts',{
            method: 'POST',
            body: JSON.stringify(workout),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const json=await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            //reset previous data
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('new workout added',json)
            dispatch({type:'CREATE_WORKOUT',payload:json})
        }
    }

    return (
        <form  onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            
            <TextInput
                withAsterisk
             label="Exercise Title:"
             placeholder="Exercise 1"
             
             onChange={(e)=>setTitle(e.target.value)}
             value={title}
             className={emptyFields.includes('title')?'error':''}
      />
            <TextInput
                 type="number"
                withAsterisk
                label="Load (in kg):"
                placeholder="0"
                
                onChange={(e)=>setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load')?'error':''}
            
            />
            <TextInput
                type="number"
                withAsterisk
                label="Number of Reps:"
                placeholder="0"
                onChange={(e)=>setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps')?'error':''}
            />
            <Group justify="flex-end" mt="md">
            <Button type="submit" bg="var(--mantine-color-blue-5)">Add Workout</Button>
            
            {error && <div className="error">{error}</div>}
            </Group>
        </form>
    )
}

export default WorkoutForm