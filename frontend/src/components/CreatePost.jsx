import { AddIcon } from '@chakra-ui/icons'
import { Button, CloseButton, Flex, FormControl, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react';
import usePreviewImg from '../hooks/usePreviewImg';
import {BsFillImageFill} from "react-icons/bs"
import { useRef } from 'react';
import userAtom from "../atoms/userAtom";
import useShowToast from '../hooks/useShowToast';
import { useRecoilState, useRecoilValue } from 'recoil';
import postsAtom from '../atoms/postsAtom';
import { useParams } from 'react-router-dom';

const MAX_CHAR=500;

const CreatePost = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [postText,setPostText]=useState("");

  const {handleImageChange, imgUrl,setImageUrl} = usePreviewImg();

  const [remainingChar,setRemainingChar]=useState(MAX_CHAR);

  const imageRef=useRef(null);

  const showToast=useShowToast();

  const [loading,setLoading]=useState(false);
  
  const user=useRecoilValue(userAtom);

  const[posts,setPosts]=useRecoilState(postsAtom);

  const {username}=useParams();

  // handling text to be wriiten of post

  const handleTextChange=(e)=>{
    const inputText=e.target.value;

    if(inputText.length>MAX_CHAR){

      const truncatedText=inputText.slice(0,MAX_CHAR);  // TRUNCATE TEXT TO LIMIT OF 500 WORDS IF IT EXCEED LIMIT
      setPostText(truncatedText);
      setRemainingChar(0);

    }

    else{
      setPostText(inputText);
      setRemainingChar(MAX_CHAR-inputText.length);
    }
  }

  // handling post button

  const handleCreatePost=async()=>{

    setLoading(true);

    try {
      const data = await axios.post('/api/posts/create', {
        postedBy: user._id,
        text: postText,
        img: imgUrl,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
  
      // const data=await res.json();
  
      if(data.error){
  
        showToast("Error",data.error,"error");  // data.error is handled in backend
        return;
      }
  
      // if no error
  
      showToast("Success","Post created uccessfully","success");

      // if user is not in his own profile
      
      if(username===user.username){
        setPosts([data,...posts]);
      }
      
      
      onClose();
      setPostText("");  // if we refresh and open it should not show previously written thing
      setImageUrl("");
    } 
    
    catch (error) {
      showToast("Error",error,"error");
    }

    finally{
      setLoading(false);
    }

  }

  return (
    <div>
        <Button position={"fixed"} bottom={10} right={5}  bg={useColorModeValue("gray.300","gray.dark")} onClick={onOpen} size={{base:"sm" ,sm:"md"}}> 
          <AddIcon/>
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} >
           
           <FormControl>
            <Textarea placeholder="Post content goes here .." onChange={handleTextChange} value={postText} />

            {/* counts word count in text area */}
            <Text fontSize="xs" fontWeight="bold" textAlign={"right"} m={"1"} color={"gray.800"}>{remainingChar}/{MAX_CHAR}</Text>  

            <Input type="file" hidden ref={imageRef} onChange={handleImageChange}/>

            <BsFillImageFill style={{marginLeft:"5px" ,cursor:"pointer"}} size={16} onClick={()=>imageRef.current.click()}/> 
            {/* // when we click on this icon then it will refer to imageRef and it will open the fileselect tab */}
      
           </FormControl>

           {/* if any image is selected */}

           {imgUrl &&(

            <Flex mt={5} w={"full"} position={"relative"}>
              <Image src={imgUrl} alt="Selected img"/>

              {/* set image url to empty i.e unselect the image */}

              <CloseButton onClick={()=>{
                setImageUrl("")
              }}
              bg={"gray.800"}
              position={"absolute"}
              top={2}
              right={2}
              />
            </Flex>
           )}
          </ModalBody>

          <ModalFooter>

            <Button colorScheme="blue" mr={3} onClick={handleCreatePost} isLoading={loading}>Post</Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
    </div>


  )
}

export default CreatePost