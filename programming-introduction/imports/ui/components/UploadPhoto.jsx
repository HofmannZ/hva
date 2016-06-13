import React from 'react';
import firebase from 'firebase';
import {
	Button,
	Icon,
	ProgressBar,
	Textfield,
	CardText,
	CardActions
} from 'react-mdl';

const styles = {
	textfield: {
		width: '20vw'
	}
}

export default class UploadPhoto extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
			fileUploadPercent: 0,
			fileUploadError: null,
			photoLabel: ""
		};
	}

	_selectFile() {
		document.querySelector('#fileInput').click();
	}

	_uploadFile() {
		const random = Math.floor((Math.random() * 999999) + 1);
		let userRef = `users/${this.props.currentUid}/photos/${random}`;
		let file = document.querySelector('#fileInput').files[0];
		let uploadTask = firebase.storage().ref(userRef).put(file);

		// [improvement] Could first make a instance in the database and then upload the files with that UID and update the download URL afterwards.
		uploadTask.on('state_changed', snap => {
			this.setState({
	      fileUploadPercent: Math.round((snap.bytesTransferred / snap.totalBytes) * 100) || 1
	    });
		}, error => {
			this.setState({
				fileUploadError: error
			});
		}, () => {
			firebase.database().ref(userRef)
				.update({
					downloadURL: uploadTask.snapshot.downloadURL,
					uid: random,
					photoLabel: this.state.photoLabel
				}).then(() => {
					this.setState({
						fileUploadPercent: 100
					});
			});
		}).bind(this);
	}

	_photoLabelHandeler() {
		this.setState({ photoLabel: event.target.value });
	}

	render() {
		return (
			<div>
				<CardText>
					{ this.state.fileUploadError ? <h6 className="text-error text-center"><strong>Error!</strong> { this.state.fileUploadError}</h6> : false }
					{ this.state.fileUploadPercent > 0 && this.state.fileUploadPercent < 100 ? <ProgressBar progress={ this.state.fileUploadPercent } className="center-progress" /> : (
						<Textfield onChange={ this._photoLabelHandeler.bind(this) } label="Photo label" floatingLabel style={ styles.textfield } />
					) }
					{ this.state.fileUploadPercent === 100 ? <h6 className="text-succes text-center"><strong>Upload done!</strong></h6> : false }
					<input type="file" id="fileInput" className="hide" onChange={ this._uploadFile.bind(this) } />
				</CardText>
				<CardActions>
    			{ this.state.fileUploadPercent == 0 || this.state.fileUploadPercent == 100 ? (
						<Button raised accent ripple className="btn-right" onClick={ this._selectFile }><Icon name="cloud_upload" /> Upload Photo</Button>
					) : false }
    		</CardActions>
			</div>
		)
	}
}
