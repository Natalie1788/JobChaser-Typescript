
import { useTheme } from "./ThemeContext";



function Homepage() {
  const {isDark} = useTheme()
  
    return(
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the Home Page</p>
    </div>
    )
}

export default Homepage;