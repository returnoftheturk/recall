import React, { Component } from 'react';
import {withAuthorization, AuthUserContext} from '../Session';
import '../../css/profileCard.css';
import Alert from '@material-ui/lab/Alert';
import ProfileCard from '../custom_components/ProfileCard'
import {getGenderProfileIcon} from '../Name';

const INITIAL_STATE = {
    emailSent: false,
    closed: false,
    error: false,
    email: '',
    firstName: '',
    lastName: '',
    profileIcon: ''
}

class AccountPage extends Component {
    constructor(props){
        super(props);
        this.handleForgotEmail = this.handleForgotEmail.bind(this);
        this.state = {...INITIAL_STATE}
    }
    componentDidMount(){
        const userData = this.props.firebase.getUser();

        userData.get().then(snapshot=>{
            this.setState({
                ...snapshot.data()
            })
            
            return snapshot;
        }).then(snapshot=>{
            const {firstName, profileIcon} = snapshot.data();
            const {id} = snapshot;
            if(!profileIcon){
                return getGenderProfileIcon(firstName,id);
            }else return
        }).then(ref=>{
            if (!ref) return
            else{
                const {profileIcon, id} = ref;
                this.setState({profileIcon});
                return this.props.firebase.user(id).set({
                    profileIcon
                }, { merge: true })
            }
        }).catch(err=>{
            console.log(err);
        });
    }
    handleForgotEmail(){        
        const {email} = this.state;
        this.props.firebase.doPasswordReset(email).then(()=>{
            this.setState({emailSent: true, closed: false});
        }).catch(err=>{
            this.setState({error:true, closed:false});
            console.log(err);
        })
    }
    render(){
        const {email, firstName, lastName, emailSent, closed, error, profileIcon} = this.state
        return(
            <div>
                {emailSent && !closed && 
                    <Alert severity="success"
                        onClose={()=>{this.setState({closed: true})}}
                    >
                            Password reset email successfully sent to: {email}
                    </Alert>
                }
                {error && !closed && 
                    <Alert 
                        severity="error"
                        onClose={()=>{this.setState({closed: true})}}
                    >
                        Could not send password reset email                    
                    </Alert>}
                <ProfileCard
                    handleForgotEmail={this.handleForgotEmail}
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    profileIcon={profileIcon}
                />
            </div>
        )
    }
}
AccountPage.contextType = AuthUserContext;
const condition = authUser => authUser != null;

export default withAuthorization(condition)(AccountPage);