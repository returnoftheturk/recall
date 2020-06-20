import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

import {Link, withRouter} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import {compose} from 'recompose';

const SignUpPage = () => (
    <div>
        <SignUpForm/>
    </div>
);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link to={ROUTES.LANDING}>
            Recall
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignUpFormBase(props) {
    const classes = useStyles();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const emailError = error && (error.code==='auth/invalid-email' || error.code==='auth/email-already-in-use')
    const isInvalid = password === '' || email === '' || firstName === '' || lastName === '';
    const onSubmit = (event) => {
        props.firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then(authUser =>{
                return props.firebase
                    .user(authUser.user.uid)
                    .set({
                        firstName,
                        lastName,
                        email
                    });
            }).then(()=>{
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                setError(null);
                props.history.push(ROUTES.GROUP);
            })
            .catch(error =>{
                setError(error)
            })
            event.preventDefault();
    }
    return (
    <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Sign up
        </Typography>
        {error && <Alert severity="error">{error.message}</Alert>}

        <form className={classes.form} onSubmit={onSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        onChange={e=>{setFirstName(e.target.value)}}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                        onChange={e=>{setLastName(e.target.value)}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={emailError}
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={e=>{setEmail(e.target.value)}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={error && error.code === 'auth/weak-password'}
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={e=>{setPassword(e.target.value)}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        disabled
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email. JK :p"
                    />
            </Grid>
            </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={isInvalid}
                >
                    Sign Up
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link to={ROUTES.SIGN_IN} variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
            </Grid>
        </form>
        </div>
        <Box mt={5}>
            <Copyright />
        </Box>
    </Container>
    );
}
const SignUpForm = compose(
    withRouter,
    withFirebase
)(SignUpFormBase);

export default SignUpPage;
export {SignUpForm};