import React, { Component } from 'react'
import "./Board.css"

class Board extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Board">
                <div className="Board-left">
                    <h2>Here comes the New Joke Btn and the Title</h2>
                </div>
                <div className="Board-right">
                    <h2>Here comes the jokes</h2>
                </div>
            </div>
        )
    }
}

export default Board;