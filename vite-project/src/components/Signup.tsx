
import SignUpForm from "./SignUpForm";
import { useTheme } from "./ThemeContext";


function Signup() {
  const {isDark} = useTheme()
  
    return(
    <div>
      <h1>Sign Up</h1>
      <p>Welcome to the Sign Up Page</p>
      <SignUpForm/>
    </div>
    )
}

export default Signup;