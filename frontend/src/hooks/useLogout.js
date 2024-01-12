import React from "react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "./useShowToast";
import axios from "axios";

const useLogout = () => {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();

  const logout = async (req, res) => {
    try {
      // fetch (see endpoints in backend k andar userRoutes)

      const data = await axios.post(
        "http://localhost:5000/api/users/logout",
        {
          // You can include request payload here if needed
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);

      if (data.error) {
        // custom hook se lena h toase insted of creating it here

        showToast("Error", data.error, "error");
        return; // so that correct wala na chle
      }

      // if no error

      localStorage.removeItem("user-threads"); //removes user-details which we hav stored in local storage while we were signing up the user
      setUser(null); // remove from local storage
    } catch (error) {
      console.log(error);
      showToast("Error", error, "error"); // title,desc,status
    }
  };

  return logout;
};

export default useLogout;
