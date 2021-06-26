import React, { Component } from 'react';
import axios from 'axios';
import './Board.css';
const API_URL = 'https://icanhazdadjoke.com/';

class Board extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state = { jokes: [] };
	}

	async getNewJokes(evt) {
		const options = { headers: { Accept: 'application/json' } };
		let jokes = JSON.parse(localStorage.getItem('dadJokes'));
		function checkDuplicate(id) {
			const fetchedJokes = Object.values(jokes);
			const checkJokes = fetchedJokes.includes(id);
			return checkJokes;
		}
		for (let i = 10; i > 0; i -= 1) {
			const response = await axios.get(`${API_URL}`, options);
			const data = response.data;
			if (!checkDuplicate(data.id)) {
				jokes.push(data);
            } else {
                i += 1;
                console.log("added one")
            }
            console.log(i)
		}
		localStorage.setItem('dadJokes', JSON.stringify(jokes));
		this.setState(st => ({ jokes: this.getJokes() }));
	}

	getJokes(evt) {
		if (!localStorage.dadJokes) {
			localStorage.setItem('dadJokes', '[]');
			this.getNewJokes();
		}
		const storage = JSON.parse(localStorage.getItem('dadJokes'));
		console.log(storage);
		return storage;
	}

	// checkStorage(id) {
	// 	const storage = JSON.parse(localStorage.get('dadJokes'));
	// }

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
					<h2>Here comes the jokes</h2>
				</div>
			</div>
		);
	}
}

export default Board;
