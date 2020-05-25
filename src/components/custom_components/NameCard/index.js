import React, {Component} from 'react';
import PropTypes from 'prop-types';
import n_1 from '../../../css/icons/n_1.png';
import m_1 from '../../../css/icons/m_1.png';
import m_2 from '../../../css/icons/m_2.png';
import m_3 from '../../../css/icons/m_3.png';
import m_4 from '../../../css/icons/m_4.png';
import m_5 from '../../../css/icons/m_5.png';
import m_6 from '../../../css/icons/m_6.png';
import m_7 from '../../../css/icons/m_7.png';
import f_1 from '../../../css/icons/f_1.png';
import f_2 from '../../../css/icons/f_2.png';
import f_3 from '../../../css/icons/f_3.png';
import f_4 from '../../../css/icons/f_4.png';
import f_5 from '../../../css/icons/f_5.png';
import mapIcon from '../../../css/icons/map.png'
import nameIcon from '../../../css/icons/name_tag.png'
import dateIcon from '../../../css/icons/date.png'

export const shortenString = (toShorten,maxLen) => {
    return toShorten.length > maxLen ? 
        toShorten.substring(0,maxLen) + '...' : toShorten;
}

class ContactCard extends Component {
    constructor(props){
        super(props);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.iconsMap = {
            'X': n_1,
            'm_1': m_1,
            'm_2': m_2,
            'm_3': m_3,
            'm_4': m_4,
            'm_5': m_5,
            'm_6': m_6,
            'm_7': m_7,
            'f_1': f_1,
            'f_2': f_2,
            'f_3': f_3,
            'f_4': f_4,
            'f_5': f_5
        }
        this.state={
            isHovering: false
        };
    };
    handleMouseEnter(){
        this.setState({
            isHovering:true
        });
    };
    handleMouseLeave(){
        this.setState({
            isHovering:false
        });
    };
    getInitials(){
        const names = this.props.fullName.toUpperCase().split(' ');
        return [names[0][0], names[1] ? names[1][0] : '']
    }
    
    render(){
        const styles = {
            frontCard: {
                opacity: this.state.isHovering? '0.6': '1',
                backgroundColor: this.state.isHovering? '#ffffff !important' : ''
            }
        }
        const [firstInitial, secondInitial] = this.getInitials();

        return (
            <div className="cardContainer" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <div className="contactCard" style={styles.frontCard}>
                    <div className="contactIcon">
                        <img src={this.iconsMap[this.props.profileIcon]} alt="profileIcon"/>
                        <div className="logo"><span className="fat">{firstInitial}</span><span className="skinny">{secondInitial}</span></div>		
                    </div>
                </div>

                <div className={`${this.state.isHovering&&'contactCardHover'} contactInfo`}>
                    <div className="infoTopRow">
                        <div className="contactDate">
                            <img src={dateIcon} alt="dateIcon" className="dateIcon"/>
                            {this.props.date}
                        </div>
                        <div className="contactName">
                            <img src={nameIcon} alt="nameIcon" className="nameIcon"/>
                            {shortenString(this.props.fullName,12)}
                        </div>
                    </div>
                    {this.props.description && 
                        <div className="infoDescription">
                            {/* <img src={descIcon} alt="descIcon" className="descIcon"/> */}
                            {shortenString(this.props.description, 120)}
                        </div>
                    }
                    <div className='infoBottomRow'>
                        {this.props.meetingPlace && 
                            <div className='infoLocation'>
                                <img src={mapIcon} alt="mapIcon" className="mapIcon"/>
                                {this.props.meetingPlace}
                            </div>
                        }
                        {this.props.socials && 
                            <div className='title-white infoSocials'>
                                @{shortenString(this.props.socials,15)}
                            </div>
                        }
                    </div>
                    
                </div>            
            </div>
        )
    }
}
ContactCard.propTypes = {
    fullName: PropTypes.string,
    description: PropTypes.string,
    socials: PropTypes.string,
    date: PropTypes.string,
    meetingPlace: PropTypes.string
}

export default ContactCard;