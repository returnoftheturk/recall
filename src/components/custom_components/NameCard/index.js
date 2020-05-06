import React from 'react';
import PropTypes from 'prop-types';
import icon from '../../../css/icons/256_15.png'

const ContactCard = props => {
    const handleClick = () => {
        props.onClick(props.id);
    }

    return (
        <div className="contactCard">
            <div className="contactIcon">
                <img src={icon}/>
            </div>
            <div className="contactInfo">

            </div>            
        </div>
    )
}
ContactCard.propTypes = {
    fullName: PropTypes.string
}

export default ContactCard;