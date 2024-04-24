import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import  {createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "./../../firebase-config";
import { useTheme } from "./ThemeContext";


interface SignUpFormData {
    email: string;
    password: string;
    confirmPassword: string;
  }
  
  function SignUpForm() {
    const {isDark} = useTheme()
    const navigate = useNavigate();
  
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors }
    } = useForm<SignUpFormData>();
  
    const formSubmit = (data: SignUpFormData) => {
      console.log("Form Submitted: ", data);

    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(() => {
        // Redirect to a new page after successful form submission
        console.log("user signed up")
        navigate("/signin");
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
    
    
  };

  return (
    <form className={`form ${isDark ? "dark" : "light"}`} onSubmit={handleSubmit(formSubmit)}>
      <div>
        <label htmlFor="email">Email:</label>
        <input className="input-form"
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address"
            }
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input className="input-form"
          id="password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters"
            }
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input className="input-form"
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match"
          })}
        />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}
      </div>

      <button type="submit">Register</button>
      <Link to="/signin"><p>Already have an account? Sign In</p></Link>

    </form>
  );
}

export default SignUpForm;