import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../config";
import Layout from "../../components/Layout/Layout";
import useStore from "../../zustand/useStore";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { AiFillEdit } from "react-icons/ai";

const UsersList = () => {
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { mode } = useStore();

  // get cookies value
  const token = Cookies.get("token");

  const fetchUsersList = async () => {
    try {
      axios
        .get(`${baseUrl}/api/admin/user-list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res?.data?.status) {
            setUsersList(res?.data?.data);
          }
        });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersList();
  }, []);

  console.log(usersList, "users");

  const formateDate = (marketDate) => {
    const localDate = new Date(marketDate).toLocaleString(undefined, {
      timeZoneName: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return localDate;
  };
  return (
    <Layout>
      <div className="mt-16">
        <h1
          className={`text-xl  font-bold tracking-widest ${
            mode === "light" ? "text-black" : "text-white"
          }`}
        >
          All Users List
        </h1>
      </div>
      {/* search box */}
      {/* <div className="mt-5 flex items-center gap-x-2">
        <p className={mode === "light" ? "text-black" : "text-white"}>
          Search:
        </p>
        <div className="flex items-center gap-x-4">
          <input
            // onChange={(e) => setSearchEventName(e.target.value)}
            // value={searchEventName}
            type="text"
            placeholder="Search Client"
            className="w-52 px-3 py-2 text-sm rounded-sm bg-transparent outline-none border-2 border-slate-600 focus:border-teal-500"
          />
        </div>
      </div> */}

      {/* users table */}
      <div className="relative overflow-x-auto max-h-screen overflow-y-auto my-5">
        <table className="w-full text-sm text-left rtl:text-right text-white  border-l-2 border-r-2 border-black">
          <thead
            className={`sticky top-0 text-xs  uppercase ${
              mode === "light"
                ? "bg-blue-300 text-black"
                : "bg-black text-white"
            }  border-b-2 border-t-2 border-black rounded-md`}
          >
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                SL No
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                User Type
              </th>

              <th scope="col" className="px-6 py-3 text-left">
                Created Date
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Update
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr className="text-center text-sm">
                <td colSpan={7} align="center">
                  <div className="my-5 flex flex-col justify-center items-center">
                    <Circles
                      height="50"
                      width="50"
                      color="#4fa94d"
                      ariaLabel="circles-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  </div>
                </td>
              </tr>
            ) : (
              usersList &&
              usersList?.length > 0 &&
              usersList?.map((user, i) => (
                <tr
                  key={user.id}
                  className={`${
                    i % 2 == 0
                      ? mode === "light"
                        ? "bg-white text-black"
                        : "bg-transparent text-white"
                      : mode === "light"
                      ? "bg-blue-100 text-black"
                      : "bg-black text-white"
                  }  text-sm cursor-pointer transition-all duration-500 ease-in  border-b-2 border-slate-700`}
                >
                  <td className="px-6 py-4 text-left text-xs">{i + 1}</td>
                  <td className="px-6 py-4 text-left text-xs">{user?.name}</td>
                  <td className="px-6 py-4 text-left text-xs">{user?.email}</td>
                  <td className="px-6 py-4 text-left text-xs">
                    {user?.user_type === 1 ? "Administrator" : "Editor"}
                  </td>

                  <td className="px-6 py-4 text-left text-xs">
                    {formateDate(user?.created_at)}
                  </td>

                  <td className="px-6 py-4 text-left text-xl">
                    <AiFillEdit
                      onClick={() => {
                        navigate(`/dashboard/user/${user?.id}`);
                      }}
                      className=""
                    />
                  </td>
                  <td className="px-6 py-4 text-center text-xl">
                    {user?.status === 1 ? (
                      <div
                        onClick={() => {
                          try {
                            axios
                              .post(
                                `${baseUrl}/api/admin/get-user-data/${user?.id}`,
                                {
                                  status: 0,
                                },
                                {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                    Accept: "application/json",
                                  },
                                }
                              )
                              .then((res) => {
                                if (res?.data?.status) {
                                  fetchUsersList();
                                  toast.success("User Status Updated");
                                }
                              });
                          } catch (error) {
                            toast.error(error?.response?.data?.message);
                          }
                        }}
                        className="w-8 h-4 bg-green-500 rounded-full relative"
                      >
                        <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-[50%] -translate-y-1/2"></div>
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          axios
                            .post(
                              `${baseUrl}/api/admin/get-user-data/${user?.id}`,
                              {
                                status: 1,
                              },
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                  Accept: "application/json",
                                },
                              }
                            )
                            .then((res) => {
                              if (res?.data?.status) {
                                fetchUsersList();
                                toast.success("User Status Updated");
                              }
                            });
                        }}
                        className="w-8 h-4 bg-gray-500 rounded-full relative"
                      >
                        <div className="w-3 h-3 bg-white rounded-full absolute left-0.5 top-[50%] -translate-y-1/2"></div>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default UsersList;