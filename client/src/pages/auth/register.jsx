import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config/index";
import { useState } from "react";

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
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-normal text-white">Create new account <span className="text-blue-800 text-5xl">.</span></h1>
                <p className="text-gray-400 m-2">Already have an account? <a href="/auth/login" className="text-blue-800">Login</a></p>
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