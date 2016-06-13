import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router';
import {
	Layout,
	Header,
	Navigation,
	Drawer,
	Content,
	Menu,
	MenuItem,
	Snackbar
} from 'react-mdl';

// Database init
// [note] This key is an client key, not a service-worker. With this key you still need to be authenticated to Update or Remove instances in the database.
firebase.initializeApp({
  apiKey: "AIzaSyBlNUg5o3Mynz8UFfltvvZt3cP61Y0tJ2U",
  authDomain: "react-chat-speedbuild.firebaseapp.com",
  databaseURL: "https://react-chat-speedbuild.firebaseio.com",
  storageBucket: "react-chat-speedbuild.appspot.com"
});

export default class App extends React.Component {
	constructor(props){
    super(props);
    this.state = {
			userDataIsLoading: true,
			isSnackbarActive: false,
			snackbarText: 'Set somthing',
			loggedIn: null,
			userData: {}
    };
  }

	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
		  if (user) {
		    this.setState({
					loggedIn: true,
					snackbarText: `You are logged in as ${user.displayName}`,
					isSnackbarActive: true
				});
				firebase.database().ref(`users/${user.uid}`).on('value', userData => {
					this.setState({
						userData: userData.val(),
						userDataIsLoading: false
					});
				});
		  } else {
				this.setState({
					loggedIn: false,
					snackbarText: 'You are succesfully logged out',
					isSnackbarActive: true
				});
				this.props.history.push('/login');
		  }
		}).bind(this);
	}

	_handleTimeoutSnackbar() {
    this.setState({ isSnackbarActive: false });
  }

	_logout() {
		firebase.auth().signOut()
			.then(() => {
				//
			})
			.catch(error => {
				this.setState({
					snackbarText: `Error! ${error}`,
					isSnackbarActive: true
				 });
			});
	}

	_goHome() {
		this.props.history.push('/');
	}

	render() {
		return (
			<Layout fixedHeader>
        <Header title={ <span className="clickable" onClick={ this._goHome.bind(this) }>My Photo Collection</span> }>
          <Navigation>
						<Link to="/photos" activeClassName="active-navigation__link">Photos</Link>
						<Link to="/upload" activeClassName="active-navigation__link">Upload</Link>
						{ this.state.loggedIn === true && this.state.userDataIsLoading === false ? (
							<div>
								<span id="user-menu" className="clickable">
									{ this.state.userData.displayName }
									<img src={ this.state.userData.photoURL } alt="avatar" className="avatar" />
								</span>
								<Menu target="user-menu" align="right">
									<MenuItem>My Profile</MenuItem>
									<MenuItem disabled>Other</MenuItem>
									<MenuItem onClick={ this._logout.bind(this) }>Logout</MenuItem>
								</Menu>
       				</div>
							) : false }
          </Navigation>
        </Header>
        <Drawer title="Notifications">
          <Navigation>
            <span>Notification</span>
						<span>Notification</span>
						<span>Notification</span>
          </Navigation>
        </Drawer>
        <Content>
					{ this.props.children && React.cloneElement(this.props.children, {
							currentUid: this.state.userData.uid
					}) }
				</Content>
				<Snackbar active={ this.state.isSnackbarActive } onTimeout={ this._handleTimeoutSnackbar.bind(this) }>
            { this.state.snackbarText }
				</Snackbar>
    	</Layout>
		)
	}
}
