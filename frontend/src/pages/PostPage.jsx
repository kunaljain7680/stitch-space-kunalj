import React, { useEffect, useState } from 'react'
import { Avatar, Flex,Text,Image,Box,Divider,Button, Spinner} from '@chakra-ui/react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from "../components/Actions";
import Comment from '../components/Comment';
import useGetUserProfile from '../hooks/useGetUserProfile';
import useShowToast from '../hooks/useShowToast';
import { useNavigate, useParams } from 'react-router-dom';
import {formatDistanceToNow} from "date-fns";  // for created at date fetching 
import userAtom from "../atoms/userAtom"
import { useRecoilState, useRecoilValue } from 'recoil';
import { DeleteIcon } from '@chakra-ui/icons';
import postsAtom from '../atoms/postsAtom';
import axios from 'axios';

// all posts

const PostPage = () => {

  const{user,loading}=useGetUserProfile();
  // const[post,setPost]=useState(null);

  const[posts,setPosts]=useRecoilState(postsAtom);

  const showToast=useShowToast();
  const{pid}=useParams();
  const currentUser=useRecoilValue(userAtom);
  const navigate=useNavigate();

  const currentPost=posts[0];
  
  useEffect(()=>{
    const getPost=async()=>{

      try {
        const res=await axios.get(`http://localhost:5000/api/posts/${pid}`);
        const data=await res.json();

        if(data.error){
          showToast("Error",data.error,"error");
          return;
        }

        console.log(data);
        setPosts([data]);  // we are adding it is as array as postsAtom is in form of array of objects and here it iis only one object i.e data and we still have  to add it in array

      } 
      
      catch (error) {
        showToast("Error",error.message,"error");

      }
    }

    getPost();

  },[pid,setPosts]);

  const handleDeletePost=async()=>{

    try {

      if(!window.confirm("Are you sure you want to delete this post?"))return;

      const res=await axios.delete(`http://localhost:5000/api/posts/${currentPost._id}`);

      const data=res.json();

      if(data.error){
        showToast("Error",data.error,"error");
        return;
      }

      showToast("Success","Post deleted","success");
      navigate(`/${user.username}`);
    } 
    
    catch (error) {
      showToast("Error",error.message,"error");
    }
  }

  if(!user && loading){
    return (

      <Flex justifyContent={"center"}>
        <Spinner size={"xl"}/>
      </Flex>
    )
  }

  if(!currentPost)return null;

  return (
    <div>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src={user?.profilePic} size={"md"} name={user.name}/>  {/* if image src is not correct it shows the name with two letters */}
        
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>{user.username}</Text>
            <Image src="/verified.png" w={4} h={4} ml="4"/>
          </Flex>
        </Flex>

        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
            {formatDistanceToNow(new Date(currentPost.createdAt))} ago
          </Text>
          
          {currentUser?._id===user._id && <DeleteIcon size={20} onClick={handleDeletePost} cursor={"pointer"} />}
        </Flex>

      </Flex>

      <Text my={3}>{currentPost.text}</Text>

      {currentPost.img &&
        <Box borderRadius={6} overflow={"hidden"} border={"1px solid "} borderColor={"gray.light"}>

        <Image src={currentPost.img} w={"full"}/>

        </Box>
      }

      <Flex gap={3} my={3}>
        <Actions post={currentPost}/>
      </Flex>


      {/* divider gives a line */}

      <Divider my={4} />  

      
      <Flex justifyContent={"space-between"}>

        <Flex gap={2} alignItems={"center"}>

          <Text fontSize={"2xl"}>👏</Text>
          <Text color={"gray.light"}>Get the app to like, reply and post</Text>

        </Flex>

        <Button>
          Get
        </Button>

      </Flex>

      <Divider my={4} />  
      
      {currentPost.replies.map(reply=>(
        <Comment

          key={reply._id}
          reply={reply}

          lastReply={reply._id===currentPost.replies[currentPost.replies.length-1]._id}
        />

      ))}

      
      
      
    </div>
  )
}

export default PostPage