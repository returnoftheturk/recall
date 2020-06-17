import React, { Component } from 'react';
import {withAuthorization, AuthUserContext} from '../Session';
import '../../css/profileCard.css';
import n_1 from '../../css/icons/n_1.png';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';

class AccountPage extends Component {
    constructor(props){
        super(props);
        this.handleForgotEmail = this.handleForgotEmail.bind(this);
        this.state = {
            emailSent: false,
            closed: false,
            error: false
        }
    }

    handleForgotEmail(){
        const authUser = this.context;
        const email = authUser.email;
        this.props.firebase.doPasswordReset(email).then(()=>{
            this.setState({emailSent: true, closed: false});
        }).catch(err=>{
            this.setState({error:true, closed:false});
            console.log(err);
        })
    }
    render(){
        const authUser = this.context;
        const {emailSent, closed, error} = this.state;
        return(
            <div className="profileContainer" >
                {emailSent && !closed && 
                    <Alert severity="success"
                        onClose={()=>{this.setState({closed: true})}}
                    >
                            Password reset email successfully sent to: {authUser.email}
                    </Alert>
                }
                {error && !closed && 
                    <Alert 
                        severity="error"
                        onClose={()=>{this.setState({closed: true})}}
                    >
                        Could not send password reset email                    
                    </Alert>}
                <div className="profileCard" >
                    <div className="profileTopRow">
                        <img src={n_1} alt="profileIcon" className="icon"/>
                        <div 
                            className="profileName" 
                            style={{background:'#6acd79'}}
                        >
                            AHMET
                            AKGUL
                        </div>		
                    </div>
                    <div className="profileDescription">
                        <div>
                            {authUser.email}
                        </div>
                        
                        <Button color="secondary" onClick={this.handleForgotEmail}>
                            Forgot Password?
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

}
AccountPage.contextType = AuthUserContext;
const condition = authUser => authUser != null;

export default withAuthorization(condition)(AccountPage);