import React, {Component} from 'react';
import {withAuthorization} from '../Session';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import GroupForm from '../custom_components/GroupForm'

class HomePage extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            formShow : false
        }
    }
    handleFormShow = () => {
        this.setState({formShow: true})
    }
    handleFormHide = () => {
        this.setState({formShow: false})
    }
    handleFormSubmit = (groupName, description) => {
        // TODO, CREATE NEW GROUP COMPONENT AND RENDER ON SCREEN
        this.setState({formShow: false})
        console.log(groupName, description);
    }
    render(){
        return (
            <div>
                <h1>Home Page</h1>
                <p> The Home Page is accessible by every signed in user.</p>
                <Fab color="primary" aria-label="add" onClick={this.handleFormShow}>
                    <AddIcon />
                </Fab>
                <GroupForm 
                    show={this.state.formShow} 
                    handleFormHide={this.handleFormHide}
                    handleFormSubmit={this.handleFormSubmit} />
            </div>

        )
    }
}
const condition = authUser => authUser != null;

export default withAuthorization(condition)(HomePage);