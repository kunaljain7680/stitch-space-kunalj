import { Avatar, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Box,Flex,Text,Link} from '@chakra-ui/react'
import {BsInstagram} from "react-icons/bs";
import {CgMoreO} from "react-icons/cg";
import { Menu,MenuButton,MenuItem,MenuList} from '@chakra-ui/menu';
import { Portal } from '@chakra-ui/portal';
import { useToast } from '@chakra-ui/toast';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { Button } from '@chakra-ui/react';
import { Link as RouterLink} from 'react-router-dom';  // imported from here not from chakra ui as then it is refreshing not single page application 
import useShowToast from '../hooks/useShowToast';

const UserHeader = ({user}) => {  // this is the user we are looking into its profile
    console.log(user);
    // using toast
    
    const toast=useToast();

    const currentUser=useRecoilValue(userAtom); // logged in user

    // check following or not

    // The expression user.followers.includes(currentUser?._id) is checking whether the _id property of the current user (currentUser)
    //  is included in the array of followers of another user (user)

    const [following,setFollowing]=useState(user.followers.includes(currentUser?._id));
    
    const showToast=useShowToast();

    const [updating,setUpdating]=useState(false);

    const copyURL=()=>{
        const currentURL=window.location.href;
        // console.log(currentURL);

        // copy the current url to cliboard and access it using naviagtor
        
// It looks like you've provided a code snippet using the Clipboard API in JavaScript. 
// This code is designed to copy the current URL to the clipboard and then log a message to the console once the operation is successful.

        navigator.clipboard.writeText(currentURL).then(()=>{
            toast({
                title: 'Account created.',
                description: "Profile link copied.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        })
    }

    const handleFollowUnfollow=async()=>{

        if(!currentUser){
            showToast("error","Please login to follow","error");
            return;
        }

        if(updating)return;

        setUpdating(true);

        try {
            const data = await axios.post(`/api/users/follow/${user._id}`, null, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });

            // console.log(res);

            // const data=await res.json();
           
            if(data.error){
                showToast("Error",data.error,"error");
                return;   
            }
            
            if(following){
                showToast("Success",`Unfollowed ${user.name}`,"success");
                user.followers.pop(); // decrement the followers length by 1 to whom we are unfollowing // simulate adding to the followers(only client side not at backend in db)
            }

            else{
                showToast("Success",`Followed ${user.name}`,"success");
                user.followers.push(currentUser?._id); // simulate adding to the followers(only client side not at backend in db)
            }

            setFollowing(!following); // change state

        } 
        
        catch (error) {
            showToast("error",error,"error");
        }

        finally{
            setUpdating(false);
        }
    }
  return (

    
    <VStack gap={4} alignItems={"start"}>
        <Flex justifyContent={"space-between"} w={"full"}>
            <Box>
                <Text fontSize="2xl" fontWeight={"bold"}>
                    {user.name}
                </Text>

                <Flex gap={2} alignItems={"center"}>

                    <Text fontSize={"sm"} >{user.username}</Text>
                    <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"} >threads.net</Text>   {/* gray.dark is written isde main.jsx where we have wriiten inside color : gray:dark */}
                </Flex>

                
            </Box>
            <Box>
                {user.profilePic && (
                    <Avatar 
                    name={user.name} 
                    src={user.profilePic}

                    // making responsive in all kinds of props that can be adjusted in size 

                    size={
                        {
                            base:"md",  // base and above screens should be medium
                            md:"xl"     // medium and aboce screens should be xl
                        }

                    }
                />

                )}

{/* no profile pic available for user */}
                {!user.profilePic && (
                    <Avatar 
                    name={user.name} 
                    src="https://bit.ly/broken-link"

                    // making responsive in all kinds of props that can be adjusted in size 

                    size={
                        {
                            base:"md",  // base and above screens should be medium
                            md:"xl"     // medium and aboce screens should be xl
                        }

                    }
                    />

                )}

            </Box>
            {/* <Box></Box> */}
        </Flex>
        
        <Text>{user.bio}</Text>
                
        {/* if we are looking into our own profile */}

        {currentUser?._id===user._id && (
            <Link as={RouterLink} to="/update">
                <Button size={"sm"}>Update Profile</Button>
            </Link>
        )}

        {/* if another user id */}

        {currentUser?._id!==user._id && (
            // <Link as={RouterLink} to="/update">

            // isLoading is showing loader using updating

                <Button size={"sm"} onClick={handleFollowUnfollow} isLoading={updating}>  

                    {following ? "Unfollow" :"Follow"}
                </Button>
            
        )}

        <Flex w={"full"} justifyContent={"space-between"}>

            <Flex gap={2} alignItems={"center"}>

                <Text color={"gray.light"}>{user.followers.length} followers</Text>
                <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
                <Link color={"gray.light"}>instagram.com</Link>
            </Flex>

            <Flex>

                {/* this Box is just like a normal div in html */}

                <Box className="icon-container">
                    <BsInstagram size={"24"} cursor={"pointer"} />
                </Box>

            {/* this box is the menu icon button which is created using charkra ui components */}
                <Box className="icon-container">

                    <Menu>
                        <MenuButton>
                            <CgMoreO size={"24"} cursor={"pointer"} />
                        </MenuButton>

                        <Portal>
                            <MenuList bg={"gray.dark"}>
                                <MenuItem bg={"gray.dark"} onClick={copyURL}>Menu 1</MenuItem>
                            </MenuList>
                        </Portal>
                    </Menu>
                    
                    
                </Box>

            </Flex>
        </Flex>

        {/* threads/replies parts */}

        <Flex w={"full"}>  {/* flex 1 means so that both flex have same width*/}

            <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb="3" cursor={"pointer"}>
                <Text fontWeight={"bold"}>Threads</Text>
            </Flex>  

            <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} pb="3" color={"gray.light"} cursor={"pointer"}>
                <Text fontWeight={"bold"}>Replies</Text>
            </Flex>  

        </Flex>
    </VStack>
  )
}

export default UserHeader