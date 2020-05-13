import React from 'react';
import {withFirebase} from '../Firebase';
import MenuItem from '@material-ui/core/MenuItem';

const SignOutButton = ({firebase}) => (
    <MenuItem onClick={firebase.doSignOut}>
        Sign Out
    </MenuItem>
)

export default withFirebase(SignOutButton);