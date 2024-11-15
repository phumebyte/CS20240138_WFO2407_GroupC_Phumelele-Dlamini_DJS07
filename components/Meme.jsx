import React from "react"
import memesData from "../memesData.js"

export default function Meme() {
    const [memeImage, setMemeImage] = React.useState("") // Initial state for memeImage is fine

    function getMemeImage() {
        const memesArray = memesData.data.memes
        if (memesArray.length > 0) { // Check if memesArray is not empty
            const randomNumber = Math.floor(Math.random() * memesArray.length)
            setMemeImage(memesArray[randomNumber].url)
        } else {
            console.error("No memes available") // Log an error if no memes are available
        }
    }

    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            {memeImage && <img src={memeImage} className="meme--image" alt="Meme" />} {/* Add alt text for accessibility */}
        </main>
    )
}