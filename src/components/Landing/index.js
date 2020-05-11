import React from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const Landing = () => (
    <div>
        <h1>App</h1>
        <ul>
            <li>
                <Link to = {ROUTES.SIGN_IN}> Sign In</Link>
            </li>        
        </ul>
    </div>
);

export default Landing;