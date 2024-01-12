import { atom } from "recoil";

const userAtom = atom({
	key: "userAtom",
	
	// JSON.parse is then used to convert the JSON-formatted string back into a JavaScript object.

	default: JSON.parse(localStorage.getItem("user-threads")),  // either null or object stored in local storage
});

export default userAtom;