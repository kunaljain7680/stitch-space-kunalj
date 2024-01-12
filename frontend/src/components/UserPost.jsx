import React from 'react'
import { Link } from 'react-router-dom'
import {Flex,Box,Avatar,Text,Image} from "@chakra-ui/react"
import { BsThreeDots } from 'react-icons/bs'
import Actions from './Actions'
import { useState } from 'react'

// user post is complete link

const UserPost = ({postImg,postTitle,likes,replies}) => {

  // in order to change color of liked

  const [liked,setLiked]=useState(false);

  return (
    
    <Link to="/markzuckerberg/post/1">
     
      <Flex gap={"3"} mb={"4"} py={"5"}>  {/* this is for width */}

        <Flex flexDirection={"column"} alignItems={"center"}>

          <Avatar size="md" name="Mark Zuckerberg" src="/zuck-avatar.png"/>

          {/*  vertical line */}

          <Box w="1px" h={"full"} bg="gray.light" my={2}></Box>

          {/* avatrs if person who commented on post */}

          <Box position={"relative"} w={"full"}>

          <Avatar
							size='xs'
							name='John doe'
							src='https://bit.ly/dan-abramov'
							position={"absolute"}
							top={"0px"}
							left='15px'
							padding={"2px"}
						/>
						<Avatar
							size='xs'
							name='John doe'
							src='https://bit.ly/sage-adebayo'
							position={"absolute"}
							bottom={"0px"}
							right='-5px'
							padding={"2px"}
						/>
						<Avatar
							size='xs'
							name='John doe'
							src='https://bit.ly/prosper-baba'
							position={"absolute"}
							bottom={"0px"}
							left='4px'
							padding={"2px"}
						/>

          </Box>

        </Flex>

        

        <Flex flex={1} flexDirection={"column"} gap={2}>
          
          

          <Flex justifyContent={"space-between"} w={"full"}>

            {/* userhandle with blue tick */}

            <Flex w={"full"} alignItems={"center"}>

              <Text fontSize={"sm"} fontWeight={"bold"}>markzuckerberg</Text>

              <Image src="/verified.png" w={4} h={4} ml={1}></Image>
            </Flex>

            {/* right flex */}

            <Flex gap={4} alignItems={"center"}>
              <Text fontStyle={"sm"} color={"gray.light"}>1d</Text>
              <BsThreeDots/>
            </Flex>
          </Flex>

          {/* post title */}

          <Text fontSize={"sm"}>{postTitle}</Text>

{/* AGAR POST IMAGE H TBHI HUM SHOW KRENGE USKO NHI TO NAHI KRENGE */}

          {
            postImg && (

              <Box borderRadius={6} overflow={"hidden"} border={"1px solid "} borderColor={"gray.light"}>
                <Image src={postImg} w={"full"}/>
  
              </Box>
            )
          }

          {/* border color dene k lie use borderColor prop in chakra ui not like html */}

         

          {/* create a footer component i.e of all buttons  */}

          <Flex gap={3} my={1}>
            <Actions liked={liked} setLiked={setLiked}/>
          </Flex>

          <Flex gap={2} alignItems={"center"}>

            {/* no of replies */}

            <Text color={"gray.light"} fontSize={"sm"}>{replies} replies</Text>

            {/* for dot */}

            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>

            {/* no of likes */}

            <Text color={"gray.light"} fontSize="sm">{likes} likes</Text>
          </Flex>
        </Flex>
      </Flex>
      
    
    </Link>
  )
}

export default UserPost