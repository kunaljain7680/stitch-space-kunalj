import React, { useEffect, useState } from 'react'
import { Button,Flex, Spinner } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import userAtom from "../atoms/userAtom"
import { useRecoilState, useRecoilValue } from 'recoil';
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import postsAtom from '../atoms/postsAtom';
import axios from 'axios';

const HomePage = () => {

  const [posts,setPosts]=useRecoilState(postsAtom); // initally empty array

  const[loading,setLoading]=useState(true);

 
  const user=useRecoilValue(userAtom);
  
  const showToast= useShowToast();

  useEffect(()=>{
    const getFeedPosts=async()=>{

      setLoading(true);

      setPosts([]);  // as when we shift from user page homepage we see user's post for first second and then other post is shown
      try {
        const data=await axios.get("http://localhost:5000/api/posts/feed");

        // const data=await res.json();
        console.log(data);
        if(data.error){
          showToast("Error",error.message,"error");
          return;
        }
        setPosts(data);
      } 
      
      catch (error) {
        showToast("Error",error.message,"error");
      }

      finally{
        setLoading(false);
      }
    }

    getFeedPosts();

  },[setPosts])

  return (

    <>

      {/* posts.length ==0 means not follow anyone */}
      
      {!loading && posts.length===0 && <h1>Follow some users to see the feed</h1>}
            
      {loading && (

        <Flex justify={"center"}>
          <Spinner size="xl"/>
        </Flex>
      )}


      {/* now show posts */}
       
      {/* posts is an array and we are iterating on each element of array */}

      {posts.map((post)=>(
        <Post key={post._id} post={post} postedBy={post.postedBy}/>
      ) )}

    </>
  )
}

export default HomePage