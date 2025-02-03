import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore";

const SignupPage = () => {
  const [showPassword,setShowPassword] = useState(false);
  const [formData,setFormData] = useState({
    fullName : "",
    email : "",
    password : "",
  })

  const {signup,isSigningUp} = useAuthStore();

  const validateForm = () =>{}

  const handleSubmit = () =>{};

  
  return (
    <div>SignupPage</div>
  )
}

export default SignupPage