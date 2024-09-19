import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const { data } = await api.get("/api/notes/");
            setNotes(data);
        } catch (error) {
            alert("Failed to fetch notes.");
        }
    };

    const deleteNote = async (id) => {
        try {
            const response = await api.delete(`/api/notes/delete/${id}/`);
            if (response.status === 204) {
                alert("Note deleted!");
                fetchNotes();
            } else {
                alert("Failed to delete note.");
            }
        } catch (error) {
            alert("Failed to delete note.");
        }
    };

    const createNote = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/api/notes/", { content, title });
            if (response.status === 201) {
                alert("Note created!");
                setTitle("");
                setContent("");
                fetchNotes();
            } else {
                alert("Failed to create note.");
            }
        } catch (error) {
            alert("Failed to create note.");
        }
    };

    return (
        <div className="home-container">
            <div className="notes-list">
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note key={note.id} note={note} onDelete={deleteNote} />
                ))}
            </div>
            <div className="create-note">
                <h2>Create a Note</h2>
                <form onSubmit={createNote}>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Home;
