"use client";
import axios from "axios";
import React, { useEffect } from "react";
import liff from "@line/liff";
require("dotenv").config();

async function signin(e: React.FormEvent<HTMLFormElement>) {
  let authen = false;
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const username = formData.get("email")?.toString();
  const inpassword = formData.get("password")?.toString();

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/autoinnova/user`
    );
    if (response.status === 200) {
      const data = response.data;
      const apiusernames = data.map((item: any) => item.usernames);
      const apipasswords = data.map((item: any) => item.passwords);
      for (let i = 0; i < data.length; i++) {
        if (apiusernames[i] === username && inpassword === apipasswords[i]) {
          authen = true;
          break;
        }
      }
      if (authen) {
        alert("Access Granted");
        return;
      }
      alert("402 Access Denied");
    }
    return;
  } catch (error) {
    console.log(error);
  }
}
async function Registeruid(userid: any) {
  let repeat = false;
  const responserepeat = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/autoinnova/user`
  );
  if (responserepeat.status == 200) {
    const data = responserepeat.data;
    const alluser = data.map((item: any) => {
      return item.line_uid;
    });
    for (let i = 0; i < alluser.length; i++) {
      if (alluser[i] === userid) {
        repeat = true;
        break;
      }
    }
    if (repeat) {
      return;
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/autoinnova/registra`,
      {
        uid: userid,
      }
    );
    if (response.status === 200) {
      alert("Registered Successful");
      return;
    }
    alert("500 Internal Server Error. Try again");
    return;
  }
}
export default function App() {
  const [username, setUsername] = React.useState<string | string>("");
  const [profile, setprofile] = React.useState<string | string>("");
  const [displayname, setdisplayname] = React.useState<string | string>("");

  useEffect(() => {
    const init = async () => {
      try {
        const liffId = process.env.NEXT_PUBLIC_liffId;
        if (!liffId) {
          throw new Error("NEXT_PUBLIC_liffId environment variable is not set");
        }
        await liff.init({ liffId });
        if (!liff.isLoggedIn()) {
          liff.login({
            redirectUri: `${process.env.NEXT_PUBLIC_redirectURL}/signin`,
          });

          return;
        }

        const profile = await liff.getProfile();
        const userId = profile.userId;
        const userprofile = profile.pictureUrl;
        const displayName = profile.displayName;
        Registeruid(userId);

        localStorage.setItem("petfeederusername", userId);
        localStorage.setItem("petfeederuserprofile", userprofile!);
        localStorage.setItem("petfeederdisplayname", displayName);
        setUsername(userId);
        setprofile(userprofile!);
        setdisplayname(displayName);
        window.location.href = `/`;
      } catch (err) {
        console.error("LIFF Error:", err);
      }
    };
    init();
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign In
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={signin}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  disabled
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="DonalTrump"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  disabled
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <button
                disabled
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
            </form>
            <button
              onClick={() =>
                liff.login({
                  redirectUri: `${process.env.NEXT_PUBLIC_redirectURL}/signin`,
                })
              }
              className="flex items-center justify-center w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg"
                alt="LINE"
                className="w-5 h-5 mr-2"
              />
              Login with LINE
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Doesn&apos;t have an account yet?{" "}
              <a
                href="/signup"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
