import React from 'react';
import {withAuthorization} from '../Session';
import Button from '@material-ui/core/Button';

const HomePage = () => (
    <div>
        <h1>Home Page</h1>
        <p> The Home Page is accessible by every signed in user.</p>
        <Button variant="contained" color="primary">
            Hello World
        </Button>
    </div>
);
const condition = authUser => authUser != null;

export default withAuthorization(condition)(HomePage);