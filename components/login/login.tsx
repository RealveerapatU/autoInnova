"use client";
import axios from "axios";
import React from "react";
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
      const apiusernames = data.map((item: any) => {
        return item.usernames;
      });
      const apipasswords = data.map((item: any) => {
        return item.passwords;
      });
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

export default function App() {
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
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <a
                href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=2007619582&redirect_uri=YOUR_CALLBACK_URL&state=xyz&scope=profile%20openid%20email"
                className="flex items-center justify-center w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg"
                  alt="LINE"
                  className="w-5 h-5 mr-2"
                />
                Login with LINE
              </a>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Doesn&apos;t have an account yet?{" "}
                <a
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
