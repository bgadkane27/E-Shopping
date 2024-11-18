import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config/index";
import { useState } from "react";
import { Link } from "react-router-dom";

let initialState = {
    username : '',
    email : '',
    password : ''
}
function AuthRegister(){

    const [formData, setFormData] = useState(initialState);
    function onSubmit(event){
        event.preventDefault();
    }
    return(
        <div className="mx-auto max-w-md space-y-6">
            <div className="">
                <h1 className="text-4xl font-bold tracking-normal text-black">Create new account<span className="text-blue-800 text-5xl">.</span></h1>
                <p className="text-gray-600 mt-2">Already have an account? <Link to="/auth/login" className="text-blue-800 ml-0.5 hover:underline">Login</Link></p>
            </div>
            <CommonForm 
            formControls={registerFormControls}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            buttonText={"Sign Up"}
            />            
        </div>
    )
}

export default AuthRegister;