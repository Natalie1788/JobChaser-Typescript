
import SignInForm from "./SingInForm";
import { useTheme } from "./ThemeContext";



function Signin() {
  const {isDark} = useTheme()
  
    return(
    <div>
      <h1>Sign In</h1>
      <p>Welcome to the Sign In Page</p>
      <SignInForm/>
    </div>
    )
}

export default Signin;