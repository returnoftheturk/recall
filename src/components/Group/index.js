import React, {Component} from 'react';
import {withAuthorization} from '../Session';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import GroupForm from '../custom_components/GroupForm';
import GroupCard from '../custom_components/GroupCard';
import { withStyles } from '@material-ui/core/styles';
import {compose} from 'recompose';
import Spinner from 'react-bootstrap/Spinner';
import {withRouter} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import '../../css/groupCard.css';

const style = theme => ({
    fab: {
        margin: 0,
        marginBottom: '50px',
        top: 'auto',
        left: 'auto',
        bottom: '25px',
        right: '20px',
        position: 'fixed',
        [theme.breakpoints.up('md')]: {
            right: '40px',
        }
    }
});

export const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}
class GroupPageBase extends Component {    
    constructor(props){
        super(props);
        this.state = {
            formShow : false,
            groups: [],
            loading: false
        }
    }
    handleFormShow = () => {
        this.setState({formShow: true})
    }
    handleFormHide = () => {
        this.setState({formShow: false})
    }
    handleFormSubmit = (groupName, description) => {
        this.setState({formShow: false})
        this.props.firebase.createNewGroup(groupName, description).then(ref=>(
            ref.id
        )).then(id=> {
            const gColor = stringToColor(id);
            return this.props.firebase.updateGroup({gColor}, id)
        }).catch(err=>{
            console.log(err)
        })
    }
    handleGroupClick = (key) =>{
        this.props.history.push({pathname: ROUTES.NAME, gId: key});
    }
    
    componentDidMount() {
        this.setState({loading:true})
        this.getGroups = this.props.firebase.groups().onSnapshot(snapshot => {
                const groups = snapshot.docs.map(group =>
                    ({
                        id: group.id,
                        ...group.data()
                    })
                )
                this.setState({groups: groups, loading: false})
            })
    }
    componentWillUnmount(){
        if(this.getGroups){
            this.getGroups()
        }
    }
    renderGroupCards(){
        const {groups} = this.state;
        return (
            <div className="group-list">
                {groups.map(group => (
                    <GroupCard
                        onClick={this.handleGroupClick}
                        id={group.id}
                        key={group.id}
                        name={group.name}
                        description={group.description}
                        gColor={group.gColor}
                        nameCount={group.nameCount}
                    />
                ))}
            </div>
        )
    }
    render(){
        const {classes} = this.props;
        const {groups, loading} = this.state;
        return (
            <div className="groupContainer">
                <h1>Groups Page</h1>
                <GroupForm 
                    show={this.state.formShow} 
                    handleFormHide={this.handleFormHide}
                    handleFormSubmit={this.handleFormSubmit} />
                {loading ? 
                    <Spinner animation="grow" className='spinner'/>:
                    groups.length > 0 ? 
                        this.renderGroupCards() : 
                        <p> Looks like you don't have any groups yet.  Click Add below to create one.</p>
                }
                <Fab color="primary" aria-label="add" onClick={this.handleFormShow} className={classes.fab}>
                    <AddIcon />
                </Fab>
            </div>
        )
    }
}

const condition = authUser => authUser != null;
const GroupPage = compose(
    withRouter,
    withStyles(style),
    withAuthorization(condition)
)(GroupPageBase);

export default GroupPage;