import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router';
import {
	Card,
	CardTitle,
	CardText,
	CardActions,
	Icon,
	Spinner,
	CardMenu,
	IconButton,
	Menu,
	MenuItem,
	Grid,
	Cell
} from 'react-mdl';

const styles = {
	photoCard: {
		width: '23vw',
		height: '23vw',
		margin: '0 1vw'
	},
	photoCards: {},
	cardActions: {
		height: '52px',
		padding: '16px',
		background: 'rgba(0,0,0,0.2)'
	},
	label: {
		color: '#fff',
		fontSize: '14px',
		fontWeight: '500'
	}
}

export default class Photos extends React.Component {
	constructor(props) {
		super(props);
		this.photos = [];
		this.state = {
			photosAreLoading: true
		}
	}

	componentDidMount() {
		let interval = setInterval(() => {
			if (this.props.currentUid) {
				clearInterval(interval);
				firebase.database()
					.ref(`users/${this.props.currentUid}/photos`)
					.on('child_added', photo => {
						this.photos.push(photo.val());
						this.setState({
							photos: this.photos,
							photosAreLoading: false
						});
					})
					.bind(this);
			}
		}, 250);
	}

	_deletePhoto(uid) {
		// [todo] delete the photo based on the UID without calling the method when the component renders.
	}

	render() {
		return (
			<div className="grid">
   			{ this.state.photosAreLoading === true || !this.props.currentUid ? <Spinner singleColor className="center-spinner" /> : this.state.photos.map(photo => {
					styles.photoCards[photo.uid] = Object.assign({}, styles.photoCard);
					styles.photoCards[photo.uid].background = `url(${photo.downloadURL}) center / cover`;
					return (
						<div className="photo">
							<Card shadow={ 0 } style={ styles.photoCards[photo.uid] }>
						    <CardTitle expand />
						    <CardActions style={ styles.cardActions }>
					        <span style={ styles.label }>
					          { photo.photoLabel }
					        </span>
						    </CardActions>
								<CardMenu>
									<IconButton name="more_vert" id={ `photo${photo.uid}` } />
									<Menu target={ `photo${photo.uid}` } align="right">
										<MenuItem onClick={ this._deletePhoto }>Delete</MenuItem>
									</Menu>
						    </CardMenu>
							</Card>
						</div>
					)
				}) }
   		</div>
		)
	}
}
