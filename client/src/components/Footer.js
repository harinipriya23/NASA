import React from "react";

function Footer() {
  return (
    <footer className="w-full text-center py-4 text-sm">
      <p>
        &copy; {new Date().getFullYear()} NASA Kepler Project. All rights
        reserved.
      </p>
    </footer>
  );
}

export default Footer;
