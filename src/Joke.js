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
		return (
			<li className='Joke'>
				<div className='Joke-rating'>
					<button className='Joke-btn fas fa-arrow-up' onClick={this.handleUpvote}></button>
					<p className="Joke-score">{rating}</p>
					<button className='Joke-btn fas fa-arrow-down' onClick={this.handleDownvote}></button>
				</div>
				<div className="Joke-text"><p>{text}</p></div>
			</li>
		);
	}
}

export default Joke;
