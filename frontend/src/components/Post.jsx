import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Flex,Box,Avatar,Text,Image} from "@chakra-ui/react"
// import { BsThreeDots } from 'react-icons/bs'
import Actions from './Actions'
import { useState } from 'react'
import useShowToast from '../hooks/useShowToast'
import {DeleteIcon} from "@chakra-ui/icons";
import userAtom from "../atoms/userAtom"
import { useRecoilState, useRecoilValue } from 'recoil';

import {formatDistanceToNow} from "date-fns";  // for created at date fetching 
import postsAtom from '../atoms/postsAtom'
import axios from 'axios'
 
// user post is complete link

const Post = ({post,postedBy}) => {

  // in order to change color of liked

  
  const [user,setUser]=useState(null);

  const showToast=useShowToast();

  const currentUser=useRecoilValue(userAtom); // logged in user

  const navigate=useNavigate();

  const [posts,setPosts]=useRecoilState(postsAtom);

//   fetch user

  useEffect(()=>{
    const getUser=async()=>{

      try{
        const data=await axios.get("http://localhost:5000//api/users/profile/"+postedBy);
        // const data=await res.json();
        // console.log(data);

        if(data.error){
          showToast("Error",data.error,"error");
          return;
        }

        setUser(data);
        
      } 
      
      catch (error) {
        showToast("Error",error.message,"error");
        setUser(null);
      }
    };

    getUser();

  },[postedBy])

  const handleDeletePost=async(e)=>{

    try {
      e.preventDefault();  // as link is there so on clicking on icon it not takes us to that route

      if(!window.confirm("Are you sure you want to delete this post?"))return;

      const data = await axios.delete(`http://localhost:5000//api/posts/${post._id}`);

      if(data.error){
        showToast("Error",data.error,"error");
        return;
      }

      showToast("Success","Post deleted","success");
      setPosts(posts.filter((p)=>p._id!==post._id));

    } 
    
    catch (error) {
      showToast("Error",error.message,"error");
    }
  }

  if(!user)return null;  // done to handle if we don;t want to write optionalal chaing operator i.e ?. this one

  return (
    
    <Link to={`/${user.username}/post/${post._id}`}>
     
      <Flex gap={"3"} mb={"4"} py={"5"}>  {/* this is for width */}

        <Flex flexDirection={"column"} alignItems={"center"}>

    {/* user?.profilePic written and not user.profilePic as  It allows you to safely access nested properties or
     methods without having to explicitly check each level for null or undefined. wheeas in simple we have to check for null or undefined */}

          <Avatar size="md" name={user.name} src={user.profilePic} 

            onClick={(e)=>{
              e.preventDefault();  // written this so as we will not go to the post page of user

              navigate(`/${user.username}`)
            }}
          
          />

          {/*  vertical line */}

          <Box w="1px" h={"full"} bg="gray.light" my={2}></Box>

          {/* avatrs if person who commented on post */}

          <Box position={"relative"} w={"full"}>

            {/* if not replies */}

            {post.replies.length===0 && <Text textAlign={"center"}>🥱</Text>}

            {/* if the post has first reply */}

            {post.replies[0] && (
              <Avatar
							  size='xs'
							  name='John doe'
							  src={post.replies[0].userProfilePic}
							  position={"absolute"}
							  top={"0px"}
							  left='15px'
							  padding={"2px"}
						  />
            )}
            
            {/* second reply */}

						{post.replies[1] && (
              <Avatar
							  size='xs'
							  name='John doe'
							  src={post.replies[1].userProfilePic}
							  position={"absolute"}
							  bottom={"0px"}
							  right='-5px'
							  padding={"2px"}
						  />
            )}
						
            {post.replies[2] && (
              <Avatar
							  size='xs'
							  name='John doe'
							  src={post.replies[2].userProfilePic}
							  position={"absolute"}
							  bottom={"0px"}
							  left='4px'
							  padding={"2px"}
						  />
            )}

          </Box>

        </Flex>

        

        <Flex flex={1} flexDirection={"column"} gap={2}>
          
          

          <Flex justifyContent={"space-between"} w={"full"}>

            {/* userhandle with blue tick */}

            <Flex w={"full"} alignItems={"center"}>

              <Text fontSize={"sm"} fontWeight={"bold"} 
                onClick={(e)=>{
                  e.preventDefault();  // written this so as we will not go to the post page of user
    
                  navigate(`/${user.username}`)
                }}
              >
                {user ?.username}
              </Text>

              <Image src="/verified.png" w={4} h={4} ml={1}></Image>
            </Flex>

            {/* right flex */}

            <Flex gap={4} alignItems={"center"}>
              <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
                {formatDistanceToNow(new Date(post.createdAt))} ago
              </Text>
              
              {currentUser?._id===user._id && <DeleteIcon size={20} onClick={handleDeletePost}/>}
            </Flex>
          </Flex>

          {/* post title */}

          <Text fontSize={"sm"}>{post.text}</Text>

{/* AGAR POST IMAGE H TBHI HUM SHOW KRENGE USKO NHI TO NAHI KRENGE */}

          {
            post.img && (

              <Box borderRadius={6} overflow={"hidden"} border={"1px solid "} borderColor={"gray.light"}>
                <Image src={post.img} w={"full"}/>
  
              </Box>
            )
          }

          {/* border color dene k lie use borderColor prop in chakra ui not like html */}

         

          {/* create a footer component i.e of all buttons  */}

          <Flex gap={3} my={1}>
            <Actions post={post}/>
          </Flex>

        </Flex>
      </Flex>
      
    
    </Link>
  )
}

export default Post