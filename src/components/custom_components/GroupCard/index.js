import React from 'react';
import PropTypes from 'prop-types';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { SvgIcon } from '@material-ui/core';
import {shortenString} from '../NameCard';

const GroupCard = props => {
    const handleClick = () => {
        props.onClick(props.id);
    }

    return (
        <div className="groupCard" onClick = {handleClick}>
            <div className="titleRow">
                <div className="group_name title-black">
                    {props.name}
                </div>
                <div className="nameCount title-black">
                    8
                    <SvgIcon component={EmojiPeopleIcon} fontSize='large'/>
                </div>
                <div className="dot" style={{backgroundColor:props.gColor}}>
                </div>
            </div>
            <div className="descRow">
                {shortenString('This is oging ot be some super long descpriotn and wer are onkaslna tying to see how long we can go and if were going to verlwlwo, its a real possibliyt man i mean i dunno', 120)}
            </div>
            
        </div>
    )
}
GroupCard.propTypes = {
    name: PropTypes.string
}

export default GroupCard;