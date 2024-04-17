import { useTheme } from "./ThemeContext";



function Contact() {
  const {isDark} = useTheme()
  
    return(
    <div>
      <h1>Our contacts</h1>
      <p>Welcome to the Contact Page</p>
    </div>
    )
}

export default Contact;