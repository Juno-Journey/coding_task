import React, { useState, useEffect } from "react";
import "./app.css";
import Notes from "./API/Notes";
import { NoteType } from "./API/Types/Note";
import Header from "./components/Header/Header";
import Note from "./components/Note/Note";
import Sidebar from "./components/Sidebar/Sidebar";

const CreateNote = () => {
  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) {
    return (
      <form className="noteForm">
        <input placeholder="Title"></input>
        <input multiple placeholder="Take a note..."></input>
      </form>
    );
  }
  return (
    <button onClick={() => setIsOpen(true)} className="createNoteButton">
      Take a note...
    </button>
  );
};

// Good luck!
function App() {
  const [notes, setNotes] = useState<NoteType[]>([]);

  const getNotes = async (search = "", limit = 10, skip = 1) => {
    const data = await Notes.search({ search, limit, skip });
    setNotes(data);
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <Sidebar />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            paddingTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "20px",
            }}
          >
            <CreateNote />
          </div>
          <div className="notes">
            {notes?.map((note) => (
              <Note {...note} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
