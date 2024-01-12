import React from 'react'
import SignupCard from '../components/SignupCard'
import LoginCard from '../components/LoginCard'
import authScreenAtom from '../atoms/authAtom';
import {useRecoilValue} from "recoil"

const AuthPage = () => {

  
  const authScreenState = useRecoilValue(authScreenAtom);  // kind of use state  pass inside which atom to use
  // const[value,setValue]=useState("login");
  console.log(authScreenState);

  return (
    <div>
        {authScreenState==="login" ? <LoginCard/> :<SignupCard/>}
    </div>
  )
}

export default AuthPage