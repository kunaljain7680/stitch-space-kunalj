import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link,
	useToast,
} from "@chakra-ui/react";

import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";
import axios from "axios";

export default function SignupCard() {
	const [showPassword, setShowPassword] = useState(false);
	const setAuthScreen = useSetRecoilState(authScreenAtom);
	const [inputs, setInputs] = useState({
		name: "",
		username: "",
		email: "",
		password: "",
	});

	const showToast=useShowToast();
	const setUser = useSetRecoilState(userAtom);

	const handleSignup = async () => {
		
        try {
            // in order to send a fetch request we need to add proxy (if we don't do that a cors error will be there)
            // writing ehere /api as it is going tp prefix with http://localhost:5000
// 			The fetch function is a modern API for making network requests (HTTP requests).
// It takes two parameters: the URL to which the request is made ("/api/users/signup") and an options object.
// The method is set to "POST," indicating that it's a POST request.
// The headers specify that the content type of the request body is JSON.
// The body is the data that will be sent with the request. It's the JSON-serialized string of the inputs object.

			const data = await axios.post('http://localhost:5000//api/users/signup', inputs, {
			    headers: {
			      'Content-Type': 'application/json',
			    },
			});

			// const data=await res.json(); //res.json() is a promise
			
			if(data.error){
				showToast("Error",data.error,"error");  // title,desc,status

				// if success
				return;
			}
// The second parameter is the value you want to store. Here, JSON.stringify(data) is used to convert the data object into a JSON-formatted string before storing it.
// The purpose of using JSON.stringify is to convert the data object into a string because localStorage can only store string key-value pairs. The data object is typically 
// a JavaScript object or an array that you want to persistently store on the user's browser.

			localStorage.setItem("user-threads",JSON.stringify(data));  // data is user

			setUser(data);
        } 
        
        catch (error) {
            console.log(error);
			showToast("Error",error,"error");  // title,desc,status
        }
	};

	return (
		<Flex align={"center"} justify={"center"}>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Sign up
					</Heading>
				</Stack>
				<Box rounded={"lg"} bg={useColorModeValue("white", "gray.dark")} boxShadow={"lg"} p={8}>
					<Stack spacing={4}>
						<HStack>
							<Box>
								<FormControl isRequired>
									<FormLabel>Full name</FormLabel>
									<Input
										type='text'
										onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
										value={inputs.name}
									/>
								</FormControl>
							</Box>
							<Box>
								<FormControl isRequired>
									<FormLabel>Username</FormLabel>
									<Input
										type='text'
										onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
										value={inputs.username}
									/>
								</FormControl>
							</Box>
						</HStack>
						<FormControl isRequired>
							<FormLabel>Email address</FormLabel>
							<Input
								type='email'
								onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
								value={inputs.email}
							/>
						</FormControl>
						<FormControl isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									type={showPassword ? "text" : "password"}
									onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
									value={inputs.password}
								/>
								<InputRightElement h={"full"}>
									<Button
										variant={"ghost"}
										onClick={() => setShowPassword((showPassword) => !showPassword)}
									>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<Stack spacing={10} pt={2}>
							<Button
								loadingText='Submitting'
								size='lg'

                                // dependong on light mode or dark mode change color here

								bg={useColorModeValue("gray.600", "gray.700")}
								color={"white"}
								_hover={{
									bg: useColorModeValue("gray.700", "gray.800"),
								}}
								onClick={handleSignup}
							>
								Sign up
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={"center"}>
								Already a user?{" "}

                                {/* when wee are going to click on login it will change our state to login */}
								<Link color={"blue.400"} onClick={() => setAuthScreen("login")}>
									Login
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}