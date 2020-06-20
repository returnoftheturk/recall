import React from 'react';
import PropTypes from 'prop-types';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { SvgIcon } from '@material-ui/core';
import {shortenString} from '../NameCard';

const GroupCard = props => {
    const handleClick = () => {
        props.onClick(props.id, props.name);
    }

    return (
        <div className="groupCard" onClick = {handleClick}>
            <div className="titleRow">
                <div className="group_name title-black">
                    {shortenString(props.name, 11)}
                </div>
                <div className="nameCount title-black">
                    {props.nameCount}
                    <SvgIcon component={EmojiPeopleIcon} fontSize='large'/>
                </div>
                <div className="dot" style={{backgroundColor:props.gColor}}>
                </div>
            </div>
            <div className="descRow">
                {shortenString(props.description, 120)}
            </div>
            
        </div>
    )
}
GroupCard.propTypes = {
    name: PropTypes.string
}

export default GroupCard;