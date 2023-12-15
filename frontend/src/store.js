import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';

//config redux contexts - todos os dados que forem criados ficaram aqui guardados
export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    }
});