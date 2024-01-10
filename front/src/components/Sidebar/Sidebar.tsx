import React from "react";
import "./sidebar.styles.css";

const SIDEBAR_OPTIONS = ["Notes", "Reminders", "Edit labels", "Archive", "Bin"];

const Sidebar = () => {
  return (
    <div className="sidebarContainer">
      <ul>
        {SIDEBAR_OPTIONS.map((option) => (
          <li>{option}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
