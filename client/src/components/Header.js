import React from "react";
import { Link } from "react-router-dom";
import { MdRocketLaunch } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { GrSchedules } from "react-icons/gr";
function Header() {
  return (
    <header className="shadow-lg border-b border-cyan-700">
      <section className="flex flex-row items-center justify-between px-4 py-3 flex-wrap gap-4 md:flex-nowrap">
        <div className="flex items-center gap-4">
          <img
            src="/favicon.png"
            alt="logo"
            className=" h-[50px] sm:h-[60px] w-auto "
          />
          <h1 className="text-2xl font-bold hidden sm:block">
            NASA Mission Control
          </h1>
        </div>
        <nav className="flex space-x-4 md:space-x-10 text-sm tracking-wide md:text-base">
          <div className="flex gap-2 items-center transition-all duration-300 hover:text-white hover:scale-95">
            <MdRocketLaunch /> <Link to="/">Launch</Link>
          </div>
          <div className="flex gap-2 items-center transition-all duration-300 hover:text-white hover:scale-95">
            <GrSchedules /> <Link to="/upcoming">Upcoming</Link>
          </div>
          <div className="flex gap-2 items-center transition-all duration-300 hover:text-white hover:scale-95">
            <FaHistory />
            <Link to="/history">History</Link>
          </div>
        </nav>
      </section>
    </header>
  );
}

export default Header;
