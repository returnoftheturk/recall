import React, {Component} from 'react';
import PropTypes from 'prop-types';
import icon from '../../../css/icons/256_15.png'
import mapIcon from '../../../css/icons/map.png'
import nameIcon from '../../../css/icons/name_tag.png'
import dateIcon from '../../../css/icons/date.png'
import descIcon from '../../../css/icons/description.png'

class ContactCard extends Component {
    constructor(props){
        super(props);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);

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
    shortenString(toShorten,maxLen){
        return toShorten.length > maxLen ? 
            toShorten.substring(0,maxLen) + '...' : toShorten;
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
                        <img src={icon} alt="profileIcon"/>
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
                            {this.shortenString(this.props.fullName,12)}
                        </div>
                    </div>
                    {this.props.description && 
                        <div className="infoDescription">
                            <img src={descIcon} alt="descIcon" className="descIcon"/>
                            {this.shortenString(this.props.description, 120)}
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
                                @{this.shortenString(this.props.socials,15)}
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