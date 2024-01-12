import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	useColorModeValue,
	Avatar,
	Center,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import usePreviewImg from "../hooks/usePreviewImg.js";
import useShowToast from "../hooks/useShowToast";
import axios from "axios";

export default function UpdateProfilePage() {
	const [user, setUser] = useRecoilState(userAtom);
	const [updating, setUpdating] = useState(false);

	const [inputs, setInputs] = useState({
		name: user.name,
		username: user.username,  // user ki ye details hmare pass local storage me se a rhi h
		email: user.email,
		bio: user.bio,
		password: "",  // don't password for seurity purposes
	});

	const fileRef = useRef(null);


	// const [updating, setUpdating] = useState(false);

	const showToast = useShowToast();

	const { handleImageChange, imgUrl } = usePreviewImg();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (updating) return;
		setUpdating(true);

		try {

			// current user jo login h uski id
			const data = await axios.put(`http://localhost:5000/api/users/update/${user._id}`, {
				...inputs,
				profilePic: imgUrl,
			}, {
				headers: {
					'Content-Type': 'application/json',
				},
			});

			// const data = await res.json();  // updated user object
			// console.log(data);

			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}

			// if no error

			showToast("Success", "profile updated successfully", "success");

			// setUser(data.user);

			localStorage.setItem("user-threads", JSON.stringify(data.user));

		}

		catch (error) {
			showToast("Error", error, "error"); // pass title sedcription ans status
		}

		finally {
			setUpdating(false);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<Flex align={"center"} justify={"center"} my={6}>
				<Stack
					spacing={4}
					w={"full"}
					maxW={"md"}
					bg={useColorModeValue("white", "gray.dark")}
					rounded={"xl"}
					boxShadow={"lg"}
					p={6}
				>
					<Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
						User Profile Edit
					</Heading>
					<FormControl id='userName'>
						<Stack direction={["column", "row"]} spacing={6}>
							<Center>
								<Avatar size='xl' boxShadow={"md"} src={imgUrl || user.profilePic} />
								{/* <Avatar size="xl"src="https://bit.ly/sage-adebayo"/> */}
							</Center>
							<Center w='full'>
								{/* file ref.current is input itself  and when we click on this opens local files which is done with the help of useRef*/}

								<Button w='full' onClick={() => fileRef.current.click()}>
									Change Avatar
								</Button>

								{/* when we click on change avatar our local files will open */}
								{/*/ to hide choose file user hidden ref */}

								<Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
							</Center>
						</Stack>
					</FormControl>
					<FormControl>
						<FormLabel>Full name</FormLabel>
						<Input
							placeholder='John Doe'
							value={inputs.name}
							onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
							_placeholder={{ color: "gray.500" }}
							type='text'
						/>
					</FormControl>
					<FormControl>
						<FormLabel>User name</FormLabel>
						<Input
							placeholder='johndoe'
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}  // if we change here it will update in local storage 
							_placeholder={{ color: "gray.500" }}
							type='text'
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Email address</FormLabel>
						<Input
							placeholder='your-email@example.com'
							value={inputs.email}
							onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
							_placeholder={{ color: "gray.500" }}
							type='email'
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Bio</FormLabel>
						<Input
							placeholder='Your bio.'
							value={inputs.bio}
							onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
							_placeholder={{ color: "gray.500" }}
							type='text'
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Password</FormLabel>
						<Input
							placeholder='password'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
							_placeholder={{ color: "gray.500" }}
							type='password'
						/>
					</FormControl>
					<Stack spacing={6} direction={["column", "row"]}>
						<Button
							bg={"red.400"}
							color={"white"}
							w='full'
							_hover={{
								bg: "red.500",
							}}
						>
							Cancel
						</Button>
						<Button
							bg={"green.400"}
							color={"white"}
							w='full'
							_hover={{
								bg: "green.500",
							}}
							type='submit'
							isLoading={updating}
						>
							Submit
						</Button>
					</Stack>
				</Stack>
			</Flex>
		</form>
	);
}