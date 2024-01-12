import React from 'react'
import { Button } from '@chakra-ui/react'
import { useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import useShowToast from '../hooks/useShowToast'
import {FiLogOut} from "react-icons/fi"
import { useRouter } from 'next/router';
import axios from 'axios'

const LogoutButton = () => {

    const setUser=useSetRecoilState(userAtom);  // for cahnging local storage value like useState is used
    const showToast=useShowToast();

    const handleLogout=async(req,res)=>{
        try {
            
            // fetch (see endpoints in backend k andar userRoutes)
            
            const data = await axios.post('http://localhost:5000//api/users/logout', null, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });

            // const data=await res.json();
            console.log(data);
            
            if(data.error){
                // custom hook se lena h toase insted of creating it here
                
                showToast("Error",data.error,"error");
                return; // so that correct wala na chle
            }
            
            // if no error

            localStorage.removeItem("user-threads"); //removes user-details which we hav stored in local storage while we were signing up the user
            setUser(null);  // remove from local storage
            // console.log('Redirecting to /auth');
            // router.push('/auth');

        } 
        catch (error) {
            console.log(error);
            showToast("Error",error,"error");  // title,desc,status
        }
    }
  return (
    
    <Button position={"fixed"} top={"30px"} right={"30px"} size={"sm"} 

        onClick={handleLogout}
    >
        <FiLogOut size={20}/>
    </Button>
  )
}

export default LogoutButton