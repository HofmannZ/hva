import React from 'react';
import firebase from 'firebase';
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

const styles = {
	cardTitel: {
		color: '#fff',
		height: '200px',
		background: 'url(http://placehold.it/500/200) center / cover'
	}
}

export default class Login extends React.Component {
	constructor(props){
    super(props);
  }

	_signInWithGoogle() {
		let provider = new firebase.auth.GoogleAuthProvider();

		firebase.auth().signInWithPopup(provider)
			.then(result => {
			  let user = result.user;
				firebase.database().ref(`users/${user.uid}`)
					.update({
						displayName: user.displayName,
						email: user.email,
						photoURL: user.photoURL,
						uid: user.uid
					})
					.then(() => {
						this.props.history.push('/');
					});
			})
			.catch(error => {
				// [improvement] Could handle login error's in the UI.
				console.error(error);
			});
	}

	render() {
		return (
			<Card shadow={ 0 } className="main-card">
		    <CardTitle style={ styles.cardTitel }>Login to React Chat</CardTitle>
		    <CardText>
		      <p>To make use of this awesome chat app, you must login with Google.</p>
		    </CardText>
		    <CardActions border>
		      <Button colored className="btn-right" onClick={ this._signInWithGoogle.bind(this) }>Login with Google</Button>
		    </CardActions>
			</Card>
		)
	}
}
