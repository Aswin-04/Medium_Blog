import { Link } from "react-router-dom";

const AuthHeader = ({type}: {type : "signup" | "signin"}) => {

  return (
      <div>
        <div className="text-center font-extrabold text-4xl max-sm:text-2xl px-10">
          {type === "signup" ? "Create an account" : "Sign in to your account"}
        </div>
        <div className="text-center text-slate-500 text-lg max-sm:text-base">
          {type === "signup" ? "Already have an account?" : "Don't have an account?"}
          <Link to={type === "signup" ? "/signin" : "/signup"} className="underline pl-2">
            {type === "signup" ? "Sign in" : "Signup"}
          </Link>
        </div>
      </div>
  );
};

export default AuthHeader;
