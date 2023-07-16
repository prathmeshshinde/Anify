import React from "react";
import { loginURL } from "../../spotify";
import { getTokenFromUrl } from "../../spotify";
import AnifyLogo from "../../assets/anify.svg";

const Header = ({ user, handleLogin }) => {
  const accToken = getTokenFromUrl().access_token;

  return (
    <div className="flex bg-header-bg p-4 justify-between items-center w-11/12  sm:w-3/4">
      <div className="flex items-center">
        <img src={AnifyLogo} alt="anifyLogo" className=" w-16 mx-3" />
        <h1 className="text-3xl font-bold text-header-red text-center font-poppins">
          Anify
        </h1>
      </div>
      {handleLogin !== "" ? (
        <a
          href={loginURL}
          className=" py-2 px-5 rounded-lg bg-pink-500 text-white items-center text-center font-medium font-poppins hover:bg-pink-600 duration-500"
        >
          Log In
        </a>
      ) : (
        <div>
          {accToken ? (
            <div className="flex items-center bg-pink-300 rounded-3xl py-1">
              <p className="bg-header-red px-3 py-1 rounded-full text-white font-poppins font-semibold ml-2 text-sm">
                {user?.display_name?.split("")[0].toUpperCase()}
              </p>
              <p className="py-1 rounded-full  font-poppins font-semibold ml-2 mr-3">
                {user?.display_name}
              </p>
            </div>
          ) : (
            <a
              href={loginURL}
              className=" py-2 px-5 rounded-lg bg-pink-500 text-white items-center text-center font-medium font-poppins hover:bg-pink-600 duration-500"
            >
              Log In
            </a>
          )}
        </div>
      )}

      {/* <button>Login Again</button> */}
    </div>
  );
};

export default Header;
