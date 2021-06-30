import React, { Component } from 'react'
import "./Joke.css"

class Joke extends Component {
    render() {
        const {text, id, rating} = this.props
        return (
            <li className="Joke">
                <div className="Joke-rating">
                    <button></button>
                    <p>{rating}</p>
                    <button></button>
                </div>
                {text}
            </li>
         )
    }
}

export default Joke;