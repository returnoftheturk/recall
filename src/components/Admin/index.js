import React, {Component} from 'react';
import {withFirebase} from '../Firebase';
import Spinner from 'react-bootstrap/Spinner'

class AdminPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            users: [],
        };
    }

    componentDidMount() {
        this.setState({loading: true});
        this.getUsers = this.props.firebase.users().onSnapshot(snapshot=>{
            const users = snapshot.docs.map(user=>{
                return {
                    uid: user.id,
                    ...user.data()   
                }
            });
            this.setState({
                users:users,
                loading: false
            })
        })
    }
    componentWillUnmount(){
        if(this.getUsers){
            this.getUsers();
        }
    }
    render(){
        const {users,loading} = this.state;
        return (
            <div>
                <h1>ADMIN</h1>
                {loading && <Spinner animation="grow" className='spinner'/>}
                <UserList users={users}/>
            </div>
        )
    }
}
const UserList = ({ users }) => (
    <ul>
      {users.map(user => (
        <li key={user.uid}>
          <span>
            <strong>ID:</strong> {user.uid}
          </span>
          <span>
            <strong>E-Mail:</strong> {user.email}
          </span>
          <span>
            <strong>Username:</strong> {user.username}
          </span>
        </li>
      ))}
    </ul>
  );


export default withFirebase(AdminPage);