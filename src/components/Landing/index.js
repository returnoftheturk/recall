import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import searchImage from '../../css/icons/landing.jpg';
import Button from '@material-ui/core/Button';

class Landing extends Component{
    handleLoginClick = () =>{
        this.props.history.push(ROUTES.SIGN_IN);
    }
    render(){
        return (
            <div className="emptyContainer">
                <div className="logoTitle">RECALL</div>
                <img className="emptyBackground" src={searchImage} alt="zero"/>
                <div className="emptyMessage">
                    Never forget a name again.
                </div>
                <Button color="primary" onClick={this.handleLoginClick}>
                    GET STARTED
                </Button>
            </div>
        )
    }
}

export default withRouter(Landing);