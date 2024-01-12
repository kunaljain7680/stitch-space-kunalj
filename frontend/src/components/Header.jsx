import React from 'react'
import { Button, Flex ,Image,useColorMode} from '@chakra-ui/react'
import userAtom from "../atoms/userAtom"
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {AiFillHome} from "react-icons/ai";
import {Link, Link as RouterLink} from "react-router-dom";
import {RxAvatar} from "react-icons/rx"
import { FiLogOut } from 'react-icons/fi';
import useLogout from '../hooks/useLogout';
import authScreenAtom from '../atoms/authAtom';

const Header = () => {

    const {colorMode,toggleColorMode}=useColorMode();

    const user=useRecoilValue(userAtom);

    const logout=useLogout();

    const setAuthScreen=useSetRecoilState(authScreenAtom);
  return (
    
    // mt is margin-top ,sly mb is margin-bottom

    <Flex justifyContent={"space-between"} mt={6} mb="12" >

        {/* if user is logged in take it home page*/}

        {user && (

          <Link as={RouterLink} to="/">
            <AiFillHome size={24}/>
          </Link>
        )}

        {!user && (
        
        <Link as={RouterLink} to={"/auth"} onClick={
          ()=>setAuthScreen("login")
        }>
          Login
        </Link>
        )}

        <Image 
            cursor={"pointer"}
            alt="logo"
            w={9}  // width 6
            h={9}
            // made logo dynamic i.e based on color mode of bg

            src={colorMode ==="dark" ? "/lgt-1.png" :"/drk-1.png"}

            onClick={toggleColorMode}
        />

{/* if user lgged in take to profile page */}

        {user && (
        
          <Flex alignItems={"center"} gap={4}>
            <Link as={RouterLink} to={`/${user.username}`}>
              <RxAvatar size={24}/>
            </Link>

            <Button size={"xs "} onClick={logout}>
              <FiLogOut size={20}/>
            </Button>
          </Flex>
        )}

        {!user && (
        
        // So, in essence, the user will be redirected to the "/auth" page, and on that page, the authScreen state will be updated to "signup," likely resulting in the rendering of the signup screen.
          <Link as={RouterLink} to={"/auth"} onClick= {
            ()=>setAuthScreen("signup")
          }>
            Signup
          </Link>
        )}
    </Flex>
  )
}

export default Header