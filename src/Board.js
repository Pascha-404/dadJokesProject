import React, { Component } from 'react';
import axios from 'axios';
import './Board.css';
import Joke from './Joke';
const API_URL = 'https://icanhazdadjoke.com/';

class Board extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state = { jokes: [] };
		this.changeRating = this.changeRating.bind(this);
	}

	storeAndRerender(array) {
		localStorage.setItem('dadJokes', JSON.stringify(array));
		this.setState(st => ({ jokes: this.getJokes() }));
	}

	async getNewJokes(evt) {
		const options = { headers: { Accept: 'application/json' } };
		let jokes = JSON.parse(localStorage.dadJokes);

		for (let i = 10; i > 0; i -= 1) {
			const response = await axios.get(`${API_URL}`, options);
			const data = { ...response.data, rating: 0 };
			let jokeExists = 0;
			for (let j = 0; j < jokes.length; j += 1) {
				if (jokes[j].id === data.id) {
					jokeExists += 1;
				}
			}
			if (jokeExists > 0) {
				i += 1;
			} else {
				jokes.push(data);
			}
		}
		this.storeAndRerender(jokes);
	}

	getJokes(evt) {
		if (!localStorage.dadJokes) {
			localStorage.setItem('dadJokes', '[]');
			this.getNewJokes();
		}
		const storage = JSON.parse(localStorage.dadJokes);
		storage.sort((a,b) => b.rating - a.rating)
		return storage;
	}

	changeRating(id, count) {
		let storage = JSON.parse(localStorage.dadJokes);
		for (let i = 0; i < storage.length; i += 1) {
			if (storage[i].id === id) {
				if (count === +1 ) {
					storage[i].rating = storage[i].rating + 1;
				} else {
					storage[i].rating = storage[i].rating - 1;
				}
			}
		}
		this.storeAndRerender(storage);
	}

	handleClick(evt) {
		this.getNewJokes();
	}

	componentDidMount() {
		this.setState(st => ({ jokes: this.getJokes() }));
	}

	render() {
		return (
			<div className='Board'>
				<div className='Board-left'>
					<h1>Dad Jokes</h1>
					<i className='fas fa-poo Board-bigIcon'></i>
					<button className='Board-newBtn' onClick={this.handleClick}>
						New Jokes
					</button>
				</div>
				<div className='Board-right'>
					<ul className='Board-jokeList'>
						{this.state.jokes.map(j => (
							<Joke text={j.joke} key={j.id} id={j.id} rating={j.rating} changeRating={this.changeRating}/>
						))}
					</ul>
				</div>
			</div>
		);
	}
}

export default Board;
