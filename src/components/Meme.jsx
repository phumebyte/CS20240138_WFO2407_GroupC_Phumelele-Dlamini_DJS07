import React from "react"

export default function Meme() {
    // State variable to manage the current meme's text and selected image
    const [meme, setMeme] = React.useState({
        topText: "",                           // Text to be displayed at the top of the meme
        bottomText: "",                        // Text to be displayed at the bottom of the meme
        randomImage: "http://i.imgflip.com/1bij.jpg" // Default image URL for the meme
    })
    
    // State variable to hold the array of all available meme templates fetched from the API
    const [allMemes, setAllMemes] = React.useState([]) 

    // useEffect hook to fetch meme templates from the Imgflip API when the component mounts
    React.useEffect(() => {
        async function getMeme() {  // Asynchronous function to handle API fetch
            const res = await fetch("https://api.imgflip.com/get_memes") // Fetching meme templates from the Imgflip API
            const data = await res.json() // Parsing the response data to JSON format
            setAllMemes(data.data.memes) // Updating the state with the fetched meme templates
        }
        getMeme() // Calling the function to initiate the fetch
    }, [])
    
    // Function to select a random meme image from the available templates
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length) // Generating a random index based on the number of available memes
        const url = allMemes[randomNumber].url // Retrieving the URL of the randomly selected meme
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url // Updating the meme state with the new random image URL
        }))
    }
    
    // Function to handle changes in the text input fields for top and bottom text
    function handleChange(event) {  
        const {name, value} = event.target  // Destructuring to get the input's name and value
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value // Updating the corresponding text property in the meme state based on the input's name
        }))
    }
    
    // Rendering the main UI of the Meme component
    return (
        <main>
            <div className="form">  { /* Renders a form with two controlled inputs for top and bottom text */}
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button  
                    className="form--button" //  Button generates new random meme 
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}