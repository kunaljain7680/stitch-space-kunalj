// to preview user image in update form
// uploading the file in backend using cloudinary

import React from 'react'
import { useState } from 'react';
import useShowToast from './useShowToast';

const usePreviewImg = () => {

  const [imgUrl,setImageUrl]=useState(null); // image url can be empty or null intially
  const showToast=useShowToast();

  const handleImageChange=(e)=>{
    const file=e.target.files[0];  // array ka 0th index accessed
    console.log(file);

    // if file exists then if file type starts with image/

    if(file && file.type.startsWith("image/")){
      const reader=new FileReader(); // fileReader is javascript api

      reader.onloadend=()=>{
        setImageUrl(reader.result);
      }

      reader.readAsDataURL(file);  // tkaes our file which we select it and convert into base 64 string and we will be able to get that string and render that image

    }

    else{
      showToast("invalid file type","please select an image file","error")
      setImageUrl(null);
    }

    
  }

  // console.log(imgUrl);
  return {handleImageChange,imgUrl,setImageUrl};
}

export default usePreviewImg