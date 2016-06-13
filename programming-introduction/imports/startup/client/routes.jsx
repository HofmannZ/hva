import React from 'react';
import { render } from 'react-dom';
import {
	Router,
	Route,
	IndexRoute,
	browserHistory
} from 'react-router';

import App from '/imports/ui/layouts/App';
import Landing from '/imports/ui/pages/Landing';
import Login from '/imports/ui/pages/Login';
import Upload from '/imports/ui/pages/Upload';
import Photos from '/imports/ui/pages/Photos';

render(
	<Router history={ browserHistory }>
		<Route path="/" component={ App }>
			<IndexRoute component={ Landing } />
			<Route path="/login" component={ Login } />
			<Route path="/upload" component={ Upload } />
			<Route path="/photos" component={ Photos } />
		</Route>
	</Router>,
	document.getElementById('react-root')
);
