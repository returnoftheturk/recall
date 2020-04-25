import React from 'react';
import PropTypes from 'prop-types';

const GroupCard = props => {
    return (
        <div className="groupCard">
            {/* <div className="card_image">
                <img src="https://media.giphy.com/media/LwIyvaNcnzsD6/giphy.gif" />
            </div> */}
            <div className="group_name title-black">
                <p>{props.name}</p>
            </div>
            <div className="group_desc title-black">
                <p>ASDASD</p>
            </div>
        </div>
    )
}
GroupCard.propTypes = {
    name: PropTypes.string
}

export default GroupCard;