import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { IoMenu } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <IoMenu size={40} color="#5f6368" />
        <IoIosDocument size={50} color="#fbbc04" />
        <div className="logoText">Keep</div>
        <SearchBar />
      </div>
      <div className=""></div>
    </header>
  );
};

export default Header;
