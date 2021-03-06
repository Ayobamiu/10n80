import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiRequest } from './api';   
import moment from 'moment';
import axios from 'axios';

let lastId = 0

//We can replace both createAction and createReducer with createSlice

const bugs = createSlice({
    name: "bugs",
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        // actions => action handlers
        bugsRequested: (bugs, action) => {
            bugs.loading = true;
        },
        
        bugsRequestFailed: (bugs, action) => {
            bugs.loading = false;
        },

        bugsReceived: (bugs, action) => {
            bugs.list = action.payload;
            bugs.loading = false;
            bugs.lastFetch = Date.now()
        },
        
        

        bugAssignedToUser :(bugs, action)=> {
            const { id: bugID, userID } = action.payload;
            const index = bugs.list.findIndex(bug => bug.id == bugID);
            bugs.list[index].userID = userID;
        },

        bugAdded : (bugs, action) => {
            bugs.list.push(action.payload)
        },
        
        bugRemoved : (bugs, action) => {
            bugs.list.pop(bug => bug.id!== action.payload.id)
        },
        
        bugResolved : (bugs, action) => {
            const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
            bugs.list[index].resolved = true;
        }
    }

});

export const { bugAdded, bugResolved, bugsReceived, bugRemoved, bugAssignedToUser, bugsRequested, bugsRequestFailed} = bugs.actions;
export default bugs.reducer;

//Action Creators
const  url= '/bugs';

export const loadBugs = () => (dispatch, getState) => {
    const { lastFetch } = getState().Entities.Bugs;

    const diffInMinutes = moment().diff(moment(lastFetch), "minutes")
    if (diffInMinutes < 10) return;
    dispatch(
        apiRequest({
        url,
        onStart: bugsRequested.type,
        onSuccess: bugsReceived.type,
        onError: bugsRequestFailed.type
    }));
};

// export const addBugs = bug => async dispatch => {
//     const response = await axios.request({
//         baseURL: 'http://localhost:9001/api',
//         url: '/bugs',
//         method: 'post',
//         data: bug
//     });
//     dispatch(bugAdded(response.data))
// }

export const addBugs = bug => 
    apiRequest({
        url,
        method: "post",
        data: bug,
        onSuccess: bugAdded.type
    })

export const resolveBugs = id => 
    apiRequest({
        url: url + '/' + id,
        method: "patch",
        data: { resolved: true },
        onSuccess: bugResolved.type
    });

export const assignBugToUser = (bugID, userID) => 
    apiRequest({
        url: url + '/' + bugID,
        method: "patch",
        data: { userID },
        onSuccess: bugAssignedToUser.type
    });


//Selector
// export const getUnresolvedBugs = state => 
//     state.Entities.Bugs.filter(bug => !bug.resolved);


//Memoization
//Used for Caching. If we are querying for the same results from the store
//multiple times, we want the store to return a cached data. Not querying
//each time we request. This saves time.`

export const getUnresolvedBugs = createSelector(
    state => state.Entities.Bugs,
    bugs => bugs.list.filter(bug => !bug.resolved)
);  

export const getBugsByUser = userID => createSelector(
    state => state.Entities.Bugs,
    bugs => bugs.list.filter(bug => bug.userID === userID)
);  