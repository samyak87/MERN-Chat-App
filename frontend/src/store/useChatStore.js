import { create } from "zustand";
import {toast} from 'react-hot-toast';
import axiosInstance from "../lib/axios.js";

export const useChatStore = create((set) => ({
    messages : [],
    users : [],
    selectedUser : null,
    isUserLoading : false, 
    isMessagesLoading : false,


    getUsers : async() =>{
        set({isUserLoading : true});
        try {
            const res = await axiosInstance.get('/message/users');
            set({users : res.data});
        } catch (error) {
            toast.error(error.message);
        }
        finally{
            set({isUserLoading : false});
        }
    },

    getMessages : async(userId) =>{
        set({isMessagesLoading : true});
        try {
            const res = await axiosInstance.get(`/message/${userId}`);
            set({messages : res.data, selectedUser : userId});
        } catch (error) {
            toast.error(error.message);
        }
        finally{
            set({isMessagesLoading : false});
        }
    },
    setSelectedUser : (selectedUser) => set({selectedUser}),
    
}));