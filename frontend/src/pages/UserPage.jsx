import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader';
import UserPost from '../components/UserPost';
import { useParams } from 'react-router-dom';
import useShowToast from "../hooks/useShowToast"
import { Flex, Spinner } from '@chakra-ui/react';
import Post from "../components/Post";
import useGetUserProfile from '../hooks/useGetUserProfile';
import { useRecoilState } from 'recoil';
import postsAtom from '../atoms/postsAtom';
import axios from 'axios';

const UserPage = () => {

  // as we have hardcoded the user so we are getting same data for every user so make it dynamic i.e different data for different user
  // so fetch the user here and pass it inside user header component

  const{user,loading}=useGetUserProfile();

  const showToast=useShowToast();
  const {username}=useParams(); // username as in its route of going to user page it is written as username


  const [posts,setPosts]=useRecoilState(postsAtom);

  const[fetchingPosts,setFetchingPosts]=useState(true); // initially true as we have to fetch posts as soon as compoent mounts

  console.log(username);
  // since we are fetching data so useEffect (it will run when username changes)

  useEffect(()=>{

    // call function to execute code

    const getPosts=async()=>{

      try {
        const res=await axios.get(`http://localhost:5000/api/posts/user/${username}`);

        const data=await res.json();
        console.log(data);

        setPosts(data);
      } 
      
      catch (error) {
        showToast("Error",error.message,"error");
      }

      finally{
        setFetchingPosts(false);
      }
    }

    getPosts();
    
  },[username,setPosts])

  console.log("posts is here an it is recoil state",posts);
  if(!user && loading){
    return (

      <Flex justifyContent={"center"}>
        <Spinner size="xl"/>
      </Flex>
      
    )
  }

  if(!user && !loading)return <h1>User not found</h1>;

  return (
    
    <div>

{/* This change ensures that the UserHeader component is only rendered when user is not null. */}

      {user && <UserHeader user={user}/>} 
      
      {/* if not fetching posts and no posts of user  */}

      {!fetchingPosts && posts.length===0 && <h1>User has no posts</h1>}

      {fetchingPosts &&(
        <Flex justifyContent={"center"} my={12}>
          <Spinner size={"xl"}/>
        </Flex>
      )}

      {/* posts already fetched */}

      {posts.map((post)=>(
        <Post key={post._id} post={post} postedBy={post.postedBy}/>
      ))}
    </div>
  )
}

export default UserPage