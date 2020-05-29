import React, {Component} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';

const INITIAL_STATE = {
    groupName: '',
    description: '',
    touched: false
}
class GroupForm extends Component {
    constructor(props){
        super(props);
        this.state = {...INITIAL_STATE}
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const {groupName, description} = this.state;
        if (groupName !== '') {
            this.props.handleFormSubmit(groupName, description);
            this.setState({...INITIAL_STATE})
        }else{
            this.setState({touched: true})
        }
    }
    handleClose = () => {
        this.props.handleFormHide();
        this.setState({...INITIAL_STATE})
    }
    
    render(){
        const {groupName, touched} = this.state;
        const isInvalid = groupName === '';
        return(
            <Modal show = {this.props.show} onHide={this.props.handleFormHide}>
                <Modal.Header onHide={this.handleClose}>
                    <Modal.Title>New Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="groupName">
                            <Form.Label>Group Name</Form.Label>
                            <Form.Control
                                isInvalid={isInvalid && touched}
                                type="text"
                                // placeholder="French Meetup"
                                value={this.state.groupName}
                                onChange={e=>{this.setState({groupName:e.target.value, touched: true})}} />
                            <Form.Control.Feedback type="invalid">Group name is required</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="groupDesc">
                            <Form.Label>Group Description</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows="3"
                                // placeholder="Joe's MWF Conversational Meetup"
                                value={this.state.description}
                                onChange={e=>{this.setState({description:e.target.value})}}
                                />
                        </Form.Group>
                    </Form>                
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={this.handleSubmit}>
                        Create Group
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default GroupForm;