import React from 'react';
import PropTypes from 'prop-types';
import icon from '../../../css/icons/256_15.png'

const ContactCard = props => {
    return (
        <div className="contactCard">
            <div className="contactIcon">
                <img src={icon}/>
                <div className="logo"><span className="fat">E</span><span className="skinny">K</span></div>		
            </div>
            <div className="contactInfo">
                <div className="infoTopRow">
                    <div className="contactDate">
                        May 18, 2020
                    </div>
                    <div className="contactName"> 
                        Ahmet AKgul
                    </div>
                </div>
                <div className="infoMiddleRow">
                    This is an example description of what 
                    the person might have written

                </div>
                <div className="infoBottomRow">

                </div>
            </div>            
        </div>
    )
}
ContactCard.propTypes = {
    fullName: PropTypes.string
}

export default ContactCard;