import { useTheme } from "./ThemeContext";



function About() {
  const {isDark} = useTheme()
    return(
    <div>
      <h1>About</h1>
      <p className="centered">Welcome to the About Page</p>
    </div>
    )
}

export default About;