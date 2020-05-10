import React, {Component} from 'react';
import {withAuthorization} from '../Session'
import * as ROUTES from '../../constants/routes';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import Spinner from 'react-bootstrap/Spinner';
import NameForm from '../custom_components/NameForm';
import NameCard from '../custom_components/NameCard';
import '../../css/contactCard.css'

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
        this.props.firebase.createNewName(fullName, meetingPlace, description, socials, this.groupId).then(ref => {
            console.log(ref)
        }).catch(err => console.log(err))
    }
    renderNameCards(){
        const {names} = this.state;
        return (
            <div className="contact-list">
                {names.map(name => (
                    <NameCard
                        key={name.id}
                        fullName={name.fullName}
                        description={name.description}
                        socials={name.socials}
                        date={name.date}
                        meetingPlace={name.meetingPlace}
                    />
                ))}
            </div>
        )
    }
    componentWillUnmount(){
        if(this.getNames){
            this.getNames();
        }
    }
    componentDidMount(){
        if(this.groupId === undefined){
            // this.props.history.push(ROUTES.LANDING);
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
        console.log('names', names)
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
                        this.renderNameCards() : 
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
