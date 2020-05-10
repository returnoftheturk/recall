import React, {useState} from 'react';
import {withRouter, Link} from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import * as ROUTES from '../../constants/routes';
import GroupIcon from '@material-ui/icons/Group';

function BottomNavBar(props){
    const [value, setValue] = useState(0);

    return (
        <BottomNavigation
            value={value}
            onChange={e=>{setValue(e.target.value)}}
            showLabels
            className="classes.root stickToBottom"
        >
            <BottomNavigationAction 
                label="groups" 
                value="groups"
                component={Link}
                to={ROUTES.GROUP}
                icon={<GroupIcon/>}
                />
        </BottomNavigation>
    )
}



export default withRouter(BottomNavBar);