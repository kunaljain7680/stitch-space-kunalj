import React from 'react'
import { useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import useShowToast from './useShowToast';

const useLogout = () => {

    const setUser=useSetRecoilState(userAtom);
    const showToast=useShowToast();
    
    const logout=async(req,res)=>{
        try {
            
            // fetch (see endpoints in backend k andar userRoutes)
            
            const res=await fetch("/api/users/logout",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
            })

            const data=await res.json();
            console.log(data);
            
            if(data.error){
                // custom hook se lena h toase insted of creating it here
                
                showToast("Error",data.error,"error");
                return; // so that correct wala na chle
            }
            
            // if no error

            localStorage.removeItem("user-threads"); //removes user-details which we hav stored in local storage while we were signing up the user
            setUser(null);  // remove from local storage
            
        } 
        catch (error) {
            console.log(error);
            showToast("Error",error,"error");  // title,desc,status
        }
    }

    return logout;
}

export default useLogout