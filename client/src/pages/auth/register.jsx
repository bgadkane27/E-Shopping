import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config/index";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

let initialState = {
  username: "",
  email: "",
  password: "",
};
function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {toast} = useToast();
  function onSubmit(event) {
    event.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      toast({
        title: "Please fill all the fields : username, email and password.",
        variant: "error",
        duration: 2000,
      });
      return;
    }

    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.sucess){
        toast({
          title: data?.payload?.message,
          variant: "success",
          duration: 2000,
        })
        navigate("/auth/login");  
      }else {
        toast({
          title: data?.payload?.message,
          variant: "warning",
          duration: 2000,
        })
      }
                
    });
  }

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="flex flex-col justify-center items-center">
        <img src="/logo.webp" alt="Bruno Logo" className="w-24" />
        <h1 className="text-4xl font-bold tracking-normal text-black">
          Create new account<span className="text-blue-800 text-5xl">.</span>
        </h1>
        <p className="text-gray-600 mt-2">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-blue-800 ml-0.5 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText={"Sign Up"}
      />
    </div>
  );
}

export default AuthRegister;
