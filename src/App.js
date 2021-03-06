import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";

class App extends Component {
	state = {
		friends,
		score: 0,
		topScore: 0,
		message: "Click on a character to earn points, but don't select a character more than once!",
	};


	handleClick = (id, clicked) => {

		const imageOrder = this.state.friends;

		if (clicked) {
			imageOrder.forEach((image, index) => {
				imageOrder[index].clicked = false;
			});
			return this.setState({
				image: imageOrder.sort(() => Math.random() - 0.5),
				message: "You Underestimate the Power of the Dark Side, you've guessed incorrectly!",
				score: 0
			})
		}
		else {
			imageOrder.forEach((image, index) => {
				if (id === image.id) {
					imageOrder[index].clicked = true;
				}
			});

			const { topScore, score } = this.state;
			const newScore = score + 1;
			const newTopScore = newScore > topScore ? newScore : topScore;

			return this.setState({
				image: imageOrder.sort(() => Math.random() - 0.5),
				message: "The Force is strong with you! You Guessed Correctly!",
				score: newScore,
				topScore: newTopScore,
			})
		}
	};


	// Map over this.state.friends and render a FriendCard component for each friend object
	render() {
		return (
			<div>
				<Nav></Nav>
				<Wrapper>


					<Title>
						<div className="text-center">
							<h1 id="message-title">{this.state.message}</h1>
						</div>
						<div className="gameScores text-center">
							<p><strong>Score:</strong> {this.state.score} | <strong>Top Score:</strong> {this.state.topScore}</p>
						</div>
					</Title>

					{this.state.friends.map(friends => (
						<FriendCard
							id={friends.id}
							key={friends.id}
							name={friends.name}
							image={friends.image}
							clicked={friends.clicked}
							handleClick={this.handleClick}
						/>
					))}
				</Wrapper>
			</div>
		);
	}
}

export default App;
