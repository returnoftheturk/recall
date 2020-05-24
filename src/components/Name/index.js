import React, {Component} from 'react';
import {withAuthorization} from '../Session';
import * as ROUTES from '../../constants/routes';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import Spinner from 'react-bootstrap/Spinner';
import NameForm from '../custom_components/NameForm';
import NameCard from '../custom_components/NameCard';
import '../../css/contactCard.css';

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
export const getGenderProfileIcon = (fullName, id) => {
    const firstName = fullName.split(' ')[0];
    let profileIcon = "X";
    return fetch('https://api.genderize.io?name=' + firstName).then(
        response => response.json()
    ).then(response =>{
        if(response.probability > 0.6){
            const gender = response.gender;
            if(gender === "male"){
                profileIcon = "m_" + Math.floor(Math.random() * 7 + 1);
            }else if (gender === "female"){
                profileIcon = "f_" + Math.floor(Math.random() * 5 + 1);
            }
            return {profileIcon, id}
        }else throw new Error("Low probability");
    })
}
export const getDate = () => {
    const date = new Date();
    let profileIcon = 'X';
    const creationDate = date.toISOString().slice(0,10);
    return {
        profileIcon,
        creationDate
    };
}
export const renderNameCards = (names) => {
    return (
        <div className="contact-list">
            {names.map(name => {
                if(!name.hide){
                    return <NameCard
                        key={name.id}
                        fullName={name.fullName}
                        description={name.description}
                        socials={name.socials}
                        date={name.creationDate}
                        profileIcon={name.profileIcon}
                        meetingPlace={name.meetingPlace}
                    />
                }else return null;
            })}
        </div>
    )
}

class NamePageBase extends Component {
    constructor(props){
        super(props);
        this.state = {
            formShow : false,
            names: [],
            loading: false
        }
        this.groupId = this.props.location.gId;
        
    }
    handleFormShow = () => {
        this.setState({formShow: true})
    }
    handleFormHide = () => {
        this.setState({formShow: false})
    }
    handleFormSubmit = (fullName, meetingPlace, description, socials) => {
        this.setState({formShow: false})
        const {creationDate, profileIcon} = getDate();
        this.props.firebase.createNewName(fullName, meetingPlace, description, socials, creationDate, profileIcon, this.groupId).then(ref => {
            return {
                fullName: fullName,
                id: ref.id
            }
        }).then((ref) => {
            const {fullName, id} = ref;
            return getGenderProfileIcon(fullName, id);
        }).then((ref)=>{
            const {profileIcon, id} = ref;
            return this.props.firebase.updateName({profileIcon}, id);
        }).catch(err => console.log(err))
    }
    
    componentWillUnmount(){
        if(this.getNames){
            this.getNames();
        }
    }
    componentDidMount(){
        if(this.groupId === undefined){
            this.props.history.push(ROUTES.GROUP);
        }else{
            this.setState({loading:true})
            this.getNames = this.props.firebase.names(this.groupId).onSnapshot(snapshot => {
                const names = snapshot.docs.map(name => (
                    {
                        id: name.id,
                        ...name.data()
                    }
                ))
                this.setState({names: names, loading:false})
            })
        }
    }
    render(){
        const {classes} = this.props;
        const {names, loading} = this.state;
        return (
            <div className="nameContainer">
                <h1>
                    Names Page
                </h1>
                <NameForm 
                    show={this.state.formShow} 
                    handleFormHide={this.handleFormHide}
                    handleFormSubmit={this.handleFormSubmit} />
                {loading ? 
                    <Spinner animation="grow" className='spinner'/>:
                    names.length > 0 ? 
                        renderNameCards(names) : 
                        <p> This group looks empty!  Click Add below to create a new contact.</p>
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
