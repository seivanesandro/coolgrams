import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';


//config redux contexts - todos os dados que forem criados ficaram aqui guardados
export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});