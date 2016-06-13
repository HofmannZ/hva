import React from 'react';
import {
	Card,
	CardTitle,
	CardText,
	CardActions,
	CardMenu,
	Button,
	IconButton,
	Menu,
	MenuItem
} from 'react-mdl';

export default class Landing extends React.Component {
	_goUpload() {
		this.props.history.push('/upload');
	}

	render() {
		return (
			<Card shadow={ 0 } className="main-card">
		    <CardTitle>Welcome to React Photo Storage</CardTitle>
		    <CardText>
		      <p>This is a small project for the course Introduction to Programming at the Amsterdam University of Applied Sciences. This project is slightly more advanced what is required by the course. Becouse I already had quite some experiance with Javascript basics, I was suggested to use some more advanced Javascript Frameworks. With this this project I honed my skills in React.js and learned the basics of Meteor.js</p>
					<p>DISCLAIMER: This is my first Meteor project and my tird React project, althought I tried to use best practises there might be some parts that will be depreciated. I would happily take any feedback on this project, eighter through an issue on my Github page or and email to <a href="mailto:zizotje@gmail.com">zizotje@gmail.com</a>.</p>
		    </CardText>
		    <CardActions border>
		      <Button colored className="btn-right" onClick={ this._goUpload.bind(this) }>Get Started</Button>
		    </CardActions>
			</Card>
		)
	}
}
