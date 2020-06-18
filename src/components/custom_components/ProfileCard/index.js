import React, { Component } from 'react';
import '../../css/profileCard.css';
import n_1 from '../../css/icons/n_1.png';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import {shortenString} from '../custom_components/NameCard';

class ProfileCard extends Component {
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
        const email = this.props.email;
        this.props.firebase.doPasswordReset(email).then(()=>{
            this.setState({emailSent: true, closed: false});
        }).catch(err=>{
            this.setState({error:true, closed:false});
            console.log(err);
        })
    }
    render(){
        const {emailSent, closed, error} = this.state;
        return(
            <div className="profileContainer" >
                {emailSent && !closed && 
                    <Alert severity="success"
                        onClose={()=>{this.setState({closed: true})}}
                    >
                            Password reset email successfully sent to: {this.props.email}
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
                            
                        >
                            <div className="firstName">
                                {'aasashm'.toUpperCase()}
                            </div>
                            <div className="lastName">
                                {'akguasl'.toUpperCase()}
                            </div>
                            
                        </div>		
                    </div>
                    <div className="profileDescription">
                        <div className="userEmail">
                            {/* {shortenString(authUser.email,60)} */}
                            asldajsdlaksjdlkajsdlkajsdlkaj
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

export default ProfileCard;