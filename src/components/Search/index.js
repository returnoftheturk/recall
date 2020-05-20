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
import TextField from '@material-ui/core/TextField';

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
            loading: false,
            filter: ''
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

    componentDidUpdate(prevProps, prevState){
        const {filter, names} = this.state;
        if(filter !== prevState.filter){
            names.forEach(name => {
                if(name.fullName.toLowerCase().indexOf(filter.toLowerCase()) === -1){
                    name.hide = true
                }else{
                    name.hide = false
                } 
            });
            this.setState({names});
        }
    }
    componentDidMount(){
        this.setState({loading:true})
        this.props.firebase.allNames().get().then(snapshot => {
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
        const {names, loading, filter} = this.state;
        // console.log('search', names)
        // console.log('filter', filter);
        return (
            <div className="nameContainer">
                <h1>
                    Search Page
                </h1>
                <TextField 
                    id="outlined-basic" 
                    label="Outlined" 
                    variant="outlined"
                    onChange={e=>{this.setState({filter:e.target.value})}}    
                />
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
