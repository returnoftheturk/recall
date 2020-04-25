import React, {Component} from 'react';
import {withAuthorization} from '../Session';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import GroupForm from '../custom_components/GroupForm';
import GroupCard from '../custom_components/GroupCard';
import { withStyles } from '@material-ui/styles';
import {compose} from 'recompose';

const style = theme => ({
    fab: {
      margin: 0,
      top: 'auto',
      left: 'auto',
      bottom: '20px',
      right: '40px',
      position: 'fixed',
    }
});
class GroupPageBase extends Component {    
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
        this.props.firebase.createNewGroup(groupName, description).then(ref=>{
            // TODO: Possibly update state to refresh with new groups?
            console.log(ref)
        }).catch(err=>{
            console.log(err)
        })
    }
    render(){
        const {classes} = this.props;
        return (
            <div>
                <h1>Group Page</h1>
                <p> The Group Page is accessible by every signed in user.</p>
                <GroupForm 
                    show={this.state.formShow} 
                    handleFormHide={this.handleFormHide}
                    handleFormSubmit={this.handleFormSubmit} />
                <div className="group-list">
                    <GroupCard
                        name="Card 1"
                    />
                    <GroupCard
                        name="Card 2"
                    />
                    <GroupCard
                        name="Card 1"
                    />
                    <GroupCard
                        name="Card 2"
                    />
                    <GroupCard
                        name="Card 1"
                    />
                    
                </div>
                <Fab color="primary" aria-label="add" onClick={this.handleFormShow} className={classes.fab}>

                    <AddIcon />
                </Fab>
            </div>

        )
    }
}
const condition = authUser => authUser != null;
const GroupPage = compose(
    withStyles(style),
    withAuthorization(condition)
)(GroupPageBase);

export default GroupPage;