import React from 'react';
import PasswordChangeForm from '../PasswordChange';
import {withAuthorization, AuthUserContext} from '../Session';
import '../../css/profileCard.css';
import n_1 from '../../css/icons/n_1.png';

const AccountPage = (props) => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div className="profileContainer" >
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
                    <div className="profileDescription"/>
                    <div className="profileBottomRow"/>
                </div>
            </div>
            // <div className="profile">
            //     <h1>Account: {authUser.email}</h1>

            //     <PasswordChangeForm/>
            // </div>
        )}
    </AuthUserContext.Consumer>

);
const condition = authUser => authUser != null;

export default withAuthorization(condition)(AccountPage);