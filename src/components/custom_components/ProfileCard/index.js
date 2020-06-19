import React, { Component } from 'react';
import '../../../css/profileCard.css';
import n_1 from '../../../css/icons/n_1.png';
import Button from '@material-ui/core/Button';
import {shortenString} from '../../custom_components/NameCard';
import pf_1 from '../../../css/icons/pf_1.png';
import pm_1 from '../../../css/icons/pm_1.png';

class ProfileCard extends Component {
    getProfileIcon(profileIconName){
        if(profileIconName[0] === 'm') return pm_1;
        else if (profileIconName[0] === 'f') return pf_1;
        else return n_1;
    }
    render(){
        return(
            <div className="profileContainer" >
                
                <div className="profileCard" >
                    <div className="profileTopRow">
                        <img src={this.getProfileIcon(this.props.profileIcon)} alt="profileIcon" className="icon"/>
                        <div 
                            className="profileName" 
                            
                        >
                            <div className="firstName">
                                {this.props.firstName.toUpperCase()}
                            </div>
                            <div className="lastName">
                                {this.props.lastName.toUpperCase()}
                            </div>
                            
                        </div>		
                    </div>
                    <div className="profileDescription">
                        <div className="userEmail">
                            {shortenString(this.props.email,60)}
                        </div>
                        <Button color="secondary" onClick={this.props.handleForgotEmail}>
                            Forgot Password?
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileCard;