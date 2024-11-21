import Quote from "../components/Quote";
import AuthHeader from "../components/AuthHeader";
import { SignupInput } from "@aswin-04/medium-blog_common";
import { useState } from "react";
import { LabelledInput } from "../components/LabelledInput";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate()
  const [signupInputs, setSignupInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, signupInputs)
      const jwt = response.data.token
      localStorage.setItem("token", "Bearer " + jwt);
      navigate('/blogs')

    } catch (e) {
      alert("Unable to Signup")
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="h-screen flex justify-center items-center px-4">
        <div>
          <AuthHeader type={"signup"} />
          <div className="mt-6 space-y-4 ">
            <LabelledInput
              label={"Name"}
              placeholder="Enter your name"
              onChange={(e) => {
                setSignupInputs((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
            ></LabelledInput>
            <LabelledInput
              label={"Email"}
              placeholder="aswin@gmail.com"
              onChange={(e) => {
                setSignupInputs((prev) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
            ></LabelledInput>
            <LabelledInput
              label={"Password"}
              placeholder={"Enter your password"}
              type={"password"}
              onChange={(e) => {
                setSignupInputs((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
            ></LabelledInput>
          </div>
          <button
            type="button"
            onClick={sendRequest}
            className="w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg  px-5 py-2.5 me-2 mb-2"
          >
            {"Sign up"}
          </button>
        </div>
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
};

export default Signin;
