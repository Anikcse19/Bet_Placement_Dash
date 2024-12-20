import { useState } from "react";
import { baseUrl } from "../../config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";

const SetNewPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfrimPassword] = useState("");
  // const [error, setError] = useState("");
  const navigate = useNavigate();
  // const location = useLocation();

  const handleLogin = async () => {
    if (password === confirmPassword) {
      const loginData = {
        new_password: password,
        new_confirm_password: confirmPassword,
      };
      const reponse = await fetch(
        `${baseUrl}/api/admin/password-set/bbVvAznSLXUqOEhR`,
        {
          method: "POST",
          body: JSON.stringify(loginData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await reponse.json();
      if (data.status) {
        navigate("/login");
      }
    } else {
      toast.error("Password doesnt match");
    }
  };
  return (
    <>
      <div className="login-bg w-ful min-h-screen bg-gray-200 flex items-center justify-center py-20">
        <div
          // style={{
          //   boxShadow:
          //     "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          // }}
          className="login-div w-[90vw] lg:w-[40vw] bg-white p-10 shadow-2xl"
        >
          {/* logo */}
          {/* <div className="flex justify-center mb-5">
            <img className="w-40 h-14" src="/logo.png" alt="" />
          </div> */}
          <div className="flex items-center justify-center">
            <p className="font-bold text-black">Set New Password </p>
          </div>

          <div className="mt-5">
            <div className="flex flex-col gap-2 text-sm">
              {/* password */}
              <div className="flex flex-col gap-1">
                <label htmlFor="password">New Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="********"
                  className="px-5 py-2 outline-none rounded bg-gray-200 focus:border-2 focus:border-primary"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>

              {/*confirm password */}
              <div className="flex flex-col gap-1">
                <label htmlFor="password">Confirm Password</label>
                <input
                  onChange={(e) => setConfrimPassword(e.target.value)}
                  value={confirmPassword}
                  placeholder="********"
                  className="px-5 py-2 outline-none rounded bg-gray-200 focus:border-2 focus:border-primary"
                  type="password"
                  name="password"
                  id="con-password"
                />
              </div>

              {/* <div>
                <p className="text-xs text-red-700 font-bold">{error}</p>
              </div> */}
            </div>
          </div>

          {/* button */}
          <div className="mt-3 flex justify-center">
            <button
              // disabled={mutation.isLoading}
              onClick={handleLogin}
              className="bg-primary hover:bg-purple-900  transition-all duration-500 ease-in px-6 py-1 rounded text-black hover:text-white font-bold border border-black"
            >
              {/* {mutation.isLoading ? (
                <ThreeDots
                  visible={true}
                  height="20"
                  width="40"
                  color="#fff"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                "Log in"
              )} */}
              Set
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetNewPasswordPage;
