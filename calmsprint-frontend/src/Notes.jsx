import React from "react";
import './Styles/Notes.css'

export default function Notes() {
    return (
        <div className="notes-container">
           <h2>Notes</h2>
           <textarea className="notes" cols={50} rows={30}></textarea> 
        </div>
    )
}