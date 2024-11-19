import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config/index";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

let initialState = {
  email: "",
  password: "",
};
function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();
  function onSubmit(event) {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      toast({
        title: "Please provide the email and password to Sign In.",
        variant: "error",
        duration: 2000,
      });
      return;
    }

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.sucess) {
        toast({
          title: data?.payload?.message,
          variant: "success",
          duration: 2000,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "warning",
          duration: 2000,
        });
      }
    });

  }
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="flex flex-col justify-center items-center">
        <img src="/logo1.png" alt="Vite logo" className="w-24" />
        <h1 className="text-4xl font-bold tracking-normal text-black">
          Sign in to an account<span className="text-blue-800 text-5xl">.</span>
        </h1>
        <p className="text-gray-600 mt-2">
          Doesn't have an account?{" "}
          <Link
            to="/auth/register"
            className="text-blue-800 ml-0.5 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText={"Sign In"}
      />
    </div>
  );
}

export default AuthLogin;
