import MockAdapter from 'axios-mock-adapter';
import { addBugs, bugAdded,resolveBugs } from '../bugs';
import { apiRequest } from '../api';
import configureStore from '../configureStore';
import axios from 'axios';
//Social Test

describe("bugSlice", () => {
    let fakeAxios;
    let store;

    beforeEach(()=> {
        fakeAxios = new MockAdapter(axios);
        store = configureStore();
    })

    const bugSlice = () => store.getState().Entities.Bugs;

    it("should add the bug to the state if it's saved to the server", async () => {
        //In this test, we are going to dispatch the addBugs action,
        //And check the store for the bug we added.

        const bug = { description: "a" };
        const savedBug = {...bug, id: 1};
        fakeAxios.onPost('/bugs').reply(200, savedBug)
        
        await store.dispatch(addBugs(bug));
        
        expect(bugSlice().list).toContainEqual(savedBug);
    });
    
    it("should set resolved prop of the bug to true if it's saved to the server", async () => {
        //In this test, we are going to dispatch the addBugs action,
        //And check the store for the bug we added.

        const bug = { id:1 };
        // const id = 1;
        const savedBug = {...bug ,resolved: true};
        fakeAxios.onPatch('/bugs/1').reply(200, {id:1, resolved:true})
        fakeAxios.onPost('/bugs').reply(200, {id:1})
        
        await store.dispatch(addBugs({description: 'a'}));
        await store.dispatch(resolveBugs(1));
        
        // console.log(store.getState());
        
        expect(bugSlice().list[0].resolved).toBe(true);
    });
    
    it("should not add the bug to the state if it's not saved to the server", async () => {
        //In this test, we are going to dispatch the addBugs action,
        //And check the store for the bug we added.

        const bug = { description: "a" };
        fakeAxios.onPost('/bugs').reply(500)
        
        await store.dispatch(addBugs(bug));
        
        expect(bugSlice().list).toHaveLength(0);
    });
});  



//this tests the action creator 'addBugs'. The problem is that 
//if the middleware function for calling API is not working, this 
//test won't point it out. The test will pass but if we run the app,
//it won't run.

/*
//Slitary Test
describe("bugSlice", ()=>{
    describe("action creators", ()=> {
        it("addBugs", () => {
            const bug = { description: 'a' };
            const result = addBugs(bug);
            const expected = {
                type: apiRequest.type,
                payload: {
                    url: '/bugs',
                    method: "post",
                    data: bug,
                    onSuccess: bugAdded.type
                }
            }
            expect(result).toEqual(expected);
        })
    })
})
*/
