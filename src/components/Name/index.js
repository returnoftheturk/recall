import React, {Component} from 'react';
import {withAuthorization} from '../Session'
import * as ROUTES from '../../constants/routes';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/styles';
import Spinner from 'react-bootstrap/Spinner';
import NameForm from '../custom_components/NameForm';

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

class NamePageBase extends Component {
    constructor(props){
        super(props);
        this.state = {
            formShow : false,
            names: [],
            loading: false
        }
        
    }
    handleFormShow = () => {
        this.setState({formShow: true})
    }
    handleFormHide = () => {
        this.setState({formShow: false})
    }
    handleFormSubmit = (fullName, meetingPlace, description, socials) => {
        this.setState({formShow: false})
        console.log(fullName, meetingPlace, description, socials)
        // this.props.firebase.createNewGroup(groupName, description).then(ref=>{
        //     // TODO: Possibly update state to refresh with new groups?
        //     console.log(ref)
        // }).catch(err=>{
        //     console.log(err)
        // })
    }
    renderNameCards(){
        const {names} = this.state;
        return (
            <div className="group-list">
                {names.map(name => (
                    0
                    // <GroupCard
                    //     onClick={this.handleGroupClick}
                    //     id={group.id}
                    //     key={group.id}
                    //     name={group.name}
                    //     description={group.description}
                    // />
                ))}
            </div>
        )
    }
    componentDidMount(){
        if(this.props.location.gId === undefined){
            this.props.history.push(ROUTES.LANDING);
        }else{
            this.setState({loading:true})
            // this.getGroups = this.props.firebase.groups().onSnapshot(snapshot => {
            //         const groups = snapshot.docs.map(group =>
            //             ({
            //                 id: group.id,
            //                 ...group.data()
            //             })
            //         )
            //         this.setState({groups: groups, loading: false})
            //     })
        }
    }
    render(){
        const {classes} = this.props;
        const {names, loading} = this.state;
        return (
            <div>
                <h1>
                    Names Page {this.props.location.gId}
                </h1>
                <NameForm 
                    show={this.state.formShow} 
                    handleFormHide={this.handleFormHide}
                    handleFormSubmit={this.handleFormSubmit} />
                {loading ? 
                    <Spinner animation="grow" className='spinner'/>:
                    names.length > 0 ? 
                        this.renderNameCards() : 
                        <p> Looks like you don't have any names yet.  Click Add below to create one.</p>
                }
                <Fab color="primary" aria-label="add" onClick={this.handleFormShow} className={classes.fab}>
                    <AddIcon />
                </Fab>
            </div>
            
        )
    }
}
const condition = authUser => authUser != null;
const NamePage = compose(
    withRouter,
    withStyles(style),
    withAuthorization(condition)
)(NamePageBase);
export default NamePage;
