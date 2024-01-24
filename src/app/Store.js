import { configureStore } from '@reduxjs/toolkit';
import segmentsReducer from '../components/popUpSegment'


export default configureStore({
    reducer: {
        segments: segmentsReducer,
    }
})