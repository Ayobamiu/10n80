import { createSlice } from '@reduxjs/toolkit'

let lastID = 0

const projects = createSlice({
    name: "projects",
    initialState: [],
    reducers:  {
        projectAdded : (projects, action)=>{
            projects.push({
                id: ++lastID,
                name: action.payload.name

            })
        }
    }
})


export const {projectAdded} = projects.actions;
export default projects.reducer;