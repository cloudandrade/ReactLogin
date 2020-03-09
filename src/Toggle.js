import React, { Component } from 'react';

// import { Container } from './styles';

export default class Toggle extends Component {
	state = {
		on: false,
	};

	toggle = () => {
		this.setState({
			on: !this.state.on,
		});
	};

	render() {
		return (
			<div>
				<button onClick={this.toggle}>Show/Hide</button>
				{this.state.on && this.props.children}
			</div>
		);
	}
}
