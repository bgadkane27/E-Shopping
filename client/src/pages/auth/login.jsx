import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config/index";
import { useState } from "react";
import { Link } from "react-router-dom";

let initialState = {
    email : '',
    password : ''
}
function AuthLogin(){

    const [formData, setFormData] = useState(initialState);
    function onSubmit(event){
        event.preventDefault();
    }
    return(
        <div className="mx-auto max-w-md space-y-6">
            <div>
                <h1 className="text-4xl font-bold tracking-normal text-black">Login into an account<span className="text-blue-800 text-5xl">.</span></h1>
                <p className="text-gray-600 mt-2">Doesn't have an account? <Link to="/auth/register" className="text-blue-800 ml-0.5 hover:underline">Register</Link></p>
            </div>
            <CommonForm 
            formControls={loginFormControls}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            buttonText={"Sign In"}
            />            
        </div>
    )
}

export default AuthLogin;