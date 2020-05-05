import React from 'react';
import PropTypes from 'prop-types';

const ContactCard = props => {
    const handleClick = () => {
        props.onClick(props.id);
    }

    return (
        <div className="contactCard" onClick = {handleClick}>
            <div className="contact_name title-black">
                <p>{props.name}</p>
            </div>
            <div className="contact_desc title-black">
                <p>{props.description}</p>
            </div>
        </div>
    )
}
ContactCard.propTypes = {
    fullName: PropTypes.string
}

export default ContactCard;