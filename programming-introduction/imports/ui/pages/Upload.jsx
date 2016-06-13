import React from 'react';
import { Link } from 'react-router';
import {
	Card,
	CardTitle,
	CardText,
	List,
	ListItem,
	ListItemContent,
	ListItemAction,
	Icon,
	Spinner
} from 'react-mdl';

import UploadPhoto from '/imports/ui/components/UploadPhoto';

export default class Upload extends React.Component {
	render() {
		return (
			<Card shadow={ 0 } className="main-card">
		    <CardTitle>Upload your favorite photo</CardTitle>
		    <CardText>
					<UploadPhoto currentUid={ this.props.currentUid }/>
		    </CardText>
			</Card>
		)
	}
}
