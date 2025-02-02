import {create} from 'zustand';
import axiosInstance from '../lib/axios.js';

export const useAuthStore = create((set) => ({
    authUser  : null,
    isSigningUp : false,
    isLoggingIn : false,
    isUpdatingProfile : false,

    // when we refresh, it is used for checking the user if it is authenticated
    isCheckingAuth : true,

    checkAuth : async() =>{
        try {
            const res = await axiosInstance.get('/auth/check');

            set({authUser : res.data});

        } catch (error) {
            set({authUser : null});
            console.log("Error in checking auth " + error);
            
            
        }
        finally{
            set({isCheckingAuth : false});
        }
    }
    
}))