import React, { Component } from 'react';
import axios from 'axios';
import './Board.css';
import Joke from './Joke';
import dad from './dad.png';
const API_URL = 'https://icanhazdadjoke.com/';

class Board extends Component {
	static defaultProps = { jokesToFetch: 10 };

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			jokes: JSON.parse(localStorage.getItem('dadJokes')) || [],
			isLoading: false,
		};
		this.seenJokes = new Set(this.state.jokes.map(j => j.id))
		this.changeRating = this.changeRating.bind(this);
	}

	addJokesAndRender(array) {
		const storage = JSON.parse(localStorage.getItem("dadJokes"));
		const newStorage = [...storage, ...array];
		localStorage.setItem('dadJokes', JSON.stringify(newStorage));
		this.setState(st => ({ jokes: this.getJokes() }));
	}

	async getNewJokes(evt) {
		const options = { headers: { Accept: 'application/json' } };
		let jokes = [];

		this.setState(st => ({ isLoading: true }));
		while (jokes.length < this.props.jokesToFetch) {
			const response = await axios.get(`${API_URL}`, options);
			const data = { ...response.data, rating: 0 };
			if (!this.seenJokes.has(data.id)) {
				jokes.push(data);
				this.seenJokes.add(data.id)
			} else {
				console.log('Joke Duplicate Found');
				console.log(data);
			}
		}
		this.addJokesAndRender(jokes);
		this.setState(st => ({ isLoading: false }));
	}

	getJokes(evt) {
		const storage = JSON.parse(localStorage.dadJokes);
		storage.sort((a, b) => b.rating - a.rating);
		return storage;
	}

	changeRating(id, count) {
		let storage = JSON.parse(localStorage.dadJokes);
		for (let i = 0; i < storage.length; i += 1) {
			if (storage[i].id === id) {
				if (count === +1) {
					storage[i].rating = storage[i].rating + 1;
				} else {
					storage[i].rating = storage[i].rating - 1;
				}
			}
		}
		localStorage.setItem('dadJokes', JSON.stringify(storage));
		this.setState(st => ({ jokes: this.getJokes() }));
	}

	handleClick(evt) {
		this.getNewJokes();
	}

	componentDidMount() {
		if (!localStorage.dadJokes) {
			localStorage.setItem('dadJokes', '[]');
			this.getNewJokes();
		}
		this.setState(st => ({ jokes: this.getJokes() }));
	}

	render() {
		const jokes = this.state.jokes.map(j => (
			<Joke
				text={j.joke}
				key={j.id}
				id={j.id}
				rating={j.rating}
				changeRating={this.changeRating}
			/>
		));
		let boardRightClass = 'Board-right ';
		if (this.state.isLoading) boardRightClass += 'loading';

		return (
			<div className='Board'>
				<div className='Board-left'>
					<h1 className='Board-title'>
						Dad <span className='calli-font'>Jokes</span>
					</h1>
					<img className='Board-bigIcon' src={dad} alt='' />
					<button className='Board-newBtn' onClick={this.handleClick}>
						New Jokes
					</button>
				</div>

				<div className={boardRightClass}>
					{this.state.isLoading ? (
						<div className='fas fa-circle-notch spinner'></div>
					) : (
						<section className='Board-jokeList'>{jokes}</section>
					)}
				</div>
			</div>
		);
	}
}

export default Board;
