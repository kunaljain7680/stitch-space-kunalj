import { Container } from "@chakra-ui/react"
import { Routes,Route, Navigate } from "react-router-dom"
import UserPage from "./pages/UserPage"
import PostPage from "./pages/PostPage"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import AuthPage from "./pages/AuthPage"
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom"
// import LogoutButton from "./components/LogoutButton"
import UpdateProfilePage from "./pages/UpdateProfilePage"
import User from "../../backend/models/userModel"
import CreatePost from "./components/CreatePost"

function App() {
  
  const user=useRecoilValue(userAtom);
  console.log(user);
  return (
    <Container maxW="620px">
      
      <Header/>

      <Routes>

        {/* this is ehen we go to home page , there is a button which takes us to profile page*/}

{/* if user deatils is there in local storage then usko homepage pe kleke jao nahi to usko auth page */}
        <Route path="/" element={user ? <HomePage/> :<Navigate to="/auth"/>}/> 

        {/* go to authentication page */}

        {/* agar user h in local storage then auth route par jane [re bhi we aill go to homepage] */}
        <Route path="/auth" element={!user ? <AuthPage/> : <Navigate to="/"/>}/>   

        {/* update profile page */}

        <Route path="/update" element={user ? <UpdateProfilePage/> : <Navigate to="/auth"/>}/>   

        {/* if we go to any username return this element */}

        {/* if we go to any username/post/postid  we will be shown a post*/}

        {/* if we have user then show user page and create post button */}
        
        <Route path="/:username" element={user?
        (
          <>
            <UserPage/>
            <CreatePost/>
          </>

        ):(
          <UserPage/>
        )

        } />
        <Route path="/:username/post/:pid" element={<PostPage/>} />
      </Routes> 

      {/* is user exist then show logout button*/}

      {/* {user && <LogoutButton/>} */}
      
    </Container>
  )
}

export default App
