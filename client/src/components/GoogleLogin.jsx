import React from "react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/halpers/firebase";
import { getEnv } from "@/halpers/getenv";
import { showToast } from "@/halpers/showToast";
import { RouteIndex } from "@/halpers/RouteName";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";

const GoogleLogin = () => {
  const dispatch = useDispatch();
    const Navigate = useNavigate();
  const handleLogin = async () => {
      try {
        const googleResponse = await signInWithPopup(auth, provider);
        const user = googleResponse.user;
        const bodyData = {
          name: user.displayName,
          email: user.email,
          avtar: user.photoURL,
        };

        const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/auth/google-login`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(bodyData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }

      dispatch(setUser(data.user));

      Navigate(RouteIndex);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
      console.error("Error during registration:", error);
    }
  };

  return (
    <Button variant="outline" className="w-full" onClick={handleLogin}>
      <FcGoogle className="mr-2" />
      Continue with Google.
    </Button>
  );
};

export default GoogleLogin;
