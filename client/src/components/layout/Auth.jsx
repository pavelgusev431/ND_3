import { useForm } from "react-hook-form";
import { useContext, useState, useEffect } from "react";
import createUser from "../../helpers/createUser.js";
import loginUser from "../../helpers/loginUser.js";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/home";
  if (from === "/logout") from = "/home";

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm();
  const { setAuth } = useContext(AuthContext);

  const [authType, setAuthType] = useState("signup");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setValue("username", "");
    setValue("email", "");
    setValue("password", "");
    setValue("repeatPassword", "");
    setShowPassword(false);
    setError("");
  }, [authType, setValue]);

  const onSubmit = async (data) => {
    try {
      if (authType === "signup") {
        const response = await createUser({
          ...data,
          repeatPassword: undefined,
        });
        if (response?.status === 201) {
          setValue("username", "");
          setValue("email", "");
          setValue("password", "");
          setValue("repeatPassword", "");
          setError("");
          setAuthType("login");
        } else {
          throw new Error(response?.data?.message || "Failed to create user");
        }
      } else {
        const user = await loginUser(data);
        if (!user) throw new Error("Invalid login crenedtials");
        setAuth(user);
        navigate(from, { replace: true });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full h-[90dvh] flex flex-col items-center justify-center">
      <h1 className="text-5xl italic font-bold">{(authType === "signup") ? "Registration" : "Login"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 flex flex-col gap-5 items-center">
        <div className="w-full">
          <input
            type="name"
            placeholder="Username"
            className="w-full placeholder:text-black px-4 py-3 border-0 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-[#DB0045] peer"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 4,
                message: "Username must be at least 4 symbols long",
              },
              pattern: {
                value: /^[A-Za-z]\w+$/,
                message:
                  "Username must contain only letters and/or numbers and start with a letter",
              },
            })}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-2 text-center dark:text-red-600">
              {errors.username.message}
            </p>
          )}
        </div>
        {authType === "signup" && (
          <div className="w-full">
            <input
              type="email"
              placeholder="Email"
              className="w-full placeholder:text-black px-4 py-3 border-0 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-[#DB0045] peer"
              {...register("email", {
                required: "Email is required",
                validate: (value) => {
                  return authType === "signup"
                    ? (/^[A-Za-z0-9.-]{1,64}@[A-Za-z0-9.-]{1,255}$/.test(
                        value
                      ) &&
                        /^[A-Za-z0-9]([A-Za-z0-9]+[.-]*)*[A-Za-z0-9]@.*$/.test(
                          value
                        ) &&
                        /^.*@([A-Za-z0-9]{2,63}[.-])+[A-Za-z]{2,}$/.test(
                          value
                        )) ||
                        "Invalid email address format"
                    : true;
                },
                onChange: () => {
                  setError("");
                  clearErrors("email");
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2 text-center dark:text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
        )}
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full placeholder:text-black px-4 py-3 border-0 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-[#DB0045] peer"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 7,
                message: "Password is too short",
              },
              pattern: {
                value: /^[A-Za-z0-9$&+,:;=?@#|'<>.^*()%!-]{7,}$/,
                message:
                  "Password must only contain letters, numbers and these special characters: $&+,:;=?@#|'<>.^*()%!-",
              },
              onChange: () => {
                setError("");
                clearErrors("password");
              },
              validate: (value) => {
                return (
                  (authType === "signup" &&
                    /^.*[A-Z].*$/.test(value) &&
                    /^.*\d.*$/.test(value) &&
                    /^.*[$&+,:;=?@#|'<>.^*()%!-].*$/.test(value)) ||
                  (authType === "signup"
                    ? "Password must contain at least 1 capital letter, 1 number and 1 special character"
                    : true)
                );
              },
            })}
          />
          <button
            type="button"
            className="absolute right-5 top-4 text-gray-600"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-2 text-center dark:text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>
        {authType === "signup" && (
          <div className="w-full">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full placeholder:text-black px-4 py-3 border-0 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-[#DB0045] peer"
              placeholder="Repeat Password"
              {...register("repeatPassword", {
                required: {
                  value: true,
                  message: "This field is required",
                },
                validate: (value) =>
                  value === watch("password") || "Passwords must match",
              })}
            />
            {errors.repeatPassword && (
              <p className="text-red-500 text-sm mt-2 text-center dark:text-red-600">
                {errors.repeatPassword.message}
              </p>
            )}
          </div>
        )}

        <button
          type="submit"
          className="w-1/3 bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          {authType === "login" ? "Login" : "Sign Up"}
        </button>

        {error && (
          <p className="text-red-500 text-sm mt-2 text-center dark:text-red-600">
            {error}
          </p>
        )}
      </form>
      <div>
        {authType === "signup" && (
          <p className="mt-2">
            Already have an account?{" "}
            <button
              className="text-blue-400 hover:cursor-pointer"
              onClick={() => setAuthType("login")}
            >
              Login
            </button>
          </p>
        )}

        {authType === "login" && (
          <p className="mt-2">
            Don&apos;t have an account?{" "}
            <button
              className="text-blue-400 hover:cursor-pointer"
              onClick={() => setAuthType("signup")}
            >
              Sign Up
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;
