import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    segments: [],
    status: 'idle', //idle | pending | succeeded | failed
    error: null
}
const POSTS_URL = 'https://webhook.site/03c65937-9d0b-4401-9f02-e501bbdd7b1f';

export const addNewSegment = createAsyncThunk('segments/addNewSegment', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
})

const segmentSlice = createSlice({
    name: 'segment',
    initialState,
    reducers: {
        segmentsAdded: {
            reducer(state, action) {
                state.segments.push(action.payload)
            },
            prepare(segmenname, firstname, lastname, gender, age, city, state) {
                return {
                    payload: {
                        segmenname,
                        firstname,
                        lastname,
                        age,
                        gender,
                        city,
                        state
                    }
                }
            }
        },
        extraReducers(builder) {
            builder
                .addCase(addNewSegment.fulfilled, (state, action) => {
                    state.posts.push(action.payload)
                })
        }
    }

})
export const selectAllSegments = (state) => state.segments.segments;
export const getSegmentStatus = (state) => state.segments.status;
export const segmentsAdded = segmentSlice.actions;
export default segmentSlice.reducer;