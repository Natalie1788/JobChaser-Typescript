import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../firebase-config";
import { useTheme } from "./ThemeContext";

interface SignInFormData {
  email: string;
  password: string;
}

function SignInForm() {
  const {isDark} = useTheme()
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormData>();

  const formSubmit = (data: SignInFormData) => {
    console.log("Form Submitted: ", data);
    const { email, password } = data;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User signed in: ", user);
        navigate("/joblist");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <>
      <form className={`form ${isDark ? "dark" : "light"}`} onSubmit={handleSubmit(formSubmit)}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            className="input-form"
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
          <input
            className="input-form"
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

        <button type="submit">Log in</button>
        <Link to="/signup">
          <p>Don't have an account? Sign Up</p>
        </Link>
      </form>
    </>
  );
}

export default SignInForm;