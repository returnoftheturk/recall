import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import {withRouter} from 'react-router-dom';
import GroupIcon from '@material-ui/icons/People';
import SearchIcon from '@material-ui/icons/Search';
import SignOutItem from '../SignOut'
import {AuthUserContext} from '../Session';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        }
    },
    sectionDesktop: {
        display: 'flex',
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -42,
        left: 0,
        right: 0,
        margin: '0 auto',
    }
}));

const Navigation = (props) => (
    <div>
        <AuthUserContext.Consumer>
            {authUser => authUser && <BottomNavigation {...props} />}
        </AuthUserContext.Consumer>
    </div>
);

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

function BottomNavigation(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleProfileClick = () => {
        handleMenuClose();
        props.history.push(ROUTES.ACCOUNT);
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
    <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
    >
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
        <SignOutItem/>
    </Menu>
);
    return (
        <div>
            <AppBar style={{ background: '#5878aa' }} position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                    Recall
                    </Typography>
                    
                    <div className={classes.grow} />
                    <Tabs 
                        value={value} 
                        onChange={handleChange}
                        aria-label="simple tabs example"
                        indicatorColor="secondary"
                    >
                        <Tab label="Groups" icon={<GroupIcon/>} component={Link} to={ROUTES.GROUP} {...a11yProps(0)} />
                        <Tab label="Contacts" icon={<SearchIcon/>} component={Link} to={ROUTES.SEARCH} {...a11yProps(1)} />
                    </Tabs>
                    <div className={classes.grow} />
                        
                    <div className={classes.sectionDesktop}>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
}

export default withRouter(Navigation);