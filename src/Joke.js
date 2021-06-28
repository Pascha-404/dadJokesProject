import React, { Component } from 'react'
import "./Joke.css"

class Joke extends Component {
    render() {
        return (
            <li className="Joke">
                <div className="Joke-rating">
                    <button></button>
                    <p>Score: display</p>
                    <button></button>
                </div>
                Here Comes the Joke
            </li>
         )
    }
}

export default Joke;