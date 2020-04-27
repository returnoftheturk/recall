import React from 'react';
import PropTypes from 'prop-types';

const GroupCard = props => {
    const handleClick = () => {
        props.onClick(props.id);
    }

    return (
        <div className="groupCard" onClick = {handleClick}>
            <div className="group_name title-black">
                <p>{props.name}</p>
            </div>
            <div className="group_desc title-black">
                <p>{props.description}</p>
            </div>
        </div>
    )
}
GroupCard.propTypes = {
    name: PropTypes.string
}

export default GroupCard;