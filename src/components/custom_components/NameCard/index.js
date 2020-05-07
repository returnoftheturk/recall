import React, {Component} from 'react';
import PropTypes from 'prop-types';
import icon from '../../../css/icons/256_15.png'
import atIcon from '../../../css/icons/atIcon.png'

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
    render(){
        const styles = {
            frontCard: {
                opacity: this.state.isHovering? '0.6': '1',
                backgroundColor: this.state.isHovering? '#ffffff !important' : ''
            }
        }
        return (
            <div className="cardContainer" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <div className="contactCard" style={styles.frontCard}>
                    <div className="contactIcon">
                        <img src={icon} alt="profileIcon"/>
                        <div className="logo"><span className="fat">E</span><span className="skinny">K</span></div>		
                    </div>
                </div>

                <div className={`${this.state.isHovering&&'contactCardHover'} contactInfo`}>
                    <div className="infoTopRow">
                        <div className="contactDate">
                            May 18, 2020
                        </div>
                        <div className="contactName"> 
                            Ahmet AKgul
                        </div>
                    </div>
                    <div className="infoDescription">
                        This is an example description of what 
                        the person might have written maybe some onMouseE
    
                    </div>
                    <div className={`${true&&'title-white'} infoSocials`}>
                        <img src={atIcon} alt="atIcon" className="atIcon"/>
                         something
                    </div>
                </div>            

            </div>
            
        )
    }


}
ContactCard.propTypes = {
    fullName: PropTypes.string
}

export default ContactCard;