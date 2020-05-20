import React, {Component} from 'react';
import {withAuthorization} from '../Session';
import {compose} from 'recompose';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import Spinner from 'react-bootstrap/Spinner';
import NameForm from '../custom_components/NameForm';
import '../../css/contactCard.css';
import {getGenderProfileIcon, getDate, renderNameCards} from '../Name';

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

class SearchPageBase extends Component {
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
    // TODO
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
        if(this.getAllNames){
            this.getAllNames();
        }
    }
    componentDidMount(){
        this.setState({loading:true})
        this.getAllNames = this.props.firebase.allNames().onSnapshot(snapshot => {
            const names = snapshot.docs.map(name => (
                {
                    id: name.id,
                    ...name.data()
                }
            ))
            this.setState({names: names, loading:false})
        })
    }
    render(){
        const {classes} = this.props;
        const {names, loading} = this.state;
        console.log('search', names)
        return (
            <div className="nameContainer">
                <h1>
                    Search Page
                </h1>
                <NameForm 
                    show={this.state.formShow} 
                    handleFormHide={this.handleFormHide}
                    handleFormSubmit={this.handleFormSubmit} />
                {loading ? 
                    <Spinner animation="grow" className='spinner'/>:
                    names.length > 0 ? 
                        renderNameCards(names) : 
                        <p> Looks like you have no new contacts yet!  Click Add below to create one.</p>
                }
                <Fab color="primary" aria-label="add" onClick={this.handleFormShow} className={classes.fab}>
                    <AddIcon />
                </Fab>                
            </div>
        )
    }
}
const condition = authUser => authUser != null;
const SearchPage = compose(
    withStyles(style),
    withAuthorization(condition)
)(SearchPageBase);
export default SearchPage;
