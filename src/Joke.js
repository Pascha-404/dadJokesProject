import React, { Component } from 'react';
import './Joke.css';

class Joke extends Component {
	constructor(props) {
		super(props);
		this.handleUpvote = this.handleUpvote.bind(this);
		this.handleDownvote = this.handleDownvote.bind(this);
	}

	handleUpvote(evt) {
		this.props.changeRating(this.props.id, +1);
	}
	handleDownvote(evt) {
		this.props.changeRating(this.props.id, -1);
	}

	render() {
		const { text, rating } = this.props;
		let scoreBorder = { borderColor: "grey" }
		let faceClass = "Joke-face far fa-meh-blank"
		if (rating < 0) {
			scoreBorder = { borderColor: "red" }
			faceClass = 'Joke-face far fa-meh-rolling-eyes';
		}
		if (rating > 0) {
			scoreBorder = { borderColor: "orange" }
			faceClass = 'Joke-face far fa-laugh';
		}
		if (rating > 4) {
			scoreBorder = { borderColor: "yellow" }
			faceClass = "Joke-face far fa-laugh-beam"
		}
		if (rating > 8) {
			scoreBorder = { borderColor: "lightgreen" }
			faceClass = "Joke-face far fa-grin-squint-tears"
		}
		return (
			<li className='Joke'>
				<div className='Joke-rating'>
					<button className='Joke-btn fas fa-arrow-up' onClick={this.handleUpvote}></button>
					<p className="Joke-score" style={scoreBorder}>{rating}</p>
					<button className='Joke-btn fas fa-arrow-down' onClick={this.handleDownvote}></button>
				</div>
				<div className="Joke-text"><p>{text}</p></div>
				<div className={faceClass}></div>
			</li>
		);
	}
}

export default Joke;
