import React, {Component} from 'react';
import {Button, Modal, Form, Col} from 'react-bootstrap';

const INITIAL_STATE = {
    fullName: '',
    meetingPlace: '',
    description: '',
    socials: '',
    touched: false,
    groupID: ''
}
class NameForm extends Component{
    constructor(props){
        super(props);
        this.state = {...INITIAL_STATE};
    }
    handleSubmit = () => {
        const {fullName, meetingPlace, description, socials, groupID} = this.state;
        
        if(this.props.groupOptions && fullName !== '' && groupID !== ''){
            this.props.handleFormSubmit(fullName, meetingPlace, description, socials, groupID);
            this.setState({...INITIAL_STATE});    
        }else if(!this.props.groupOptions && fullName !== ''){
            this.props.handleFormSubmit(fullName, meetingPlace, description, socials, groupID);
            this.setState({...INITIAL_STATE});
        }else{
            this.setState({touched: true});
        }
    }
    handleClose = () => {
        this.props.handleFormHide();
        this.setState({...INITIAL_STATE});
    }
    render(){
        const{fullName, touched, groupID} = this.state;
        const invalidName = fullName === '';
        const invalidGroup = groupID === '';
        return (
            <Modal 
                show = {this.props.show} 
                onHide = {this.props.handleFormHide}>
                <Modal.Header onHide={this.handleClose}>
                    <Modal.Title>New Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Col>
                                <Form.Group controlId="fullName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control 
                                        isInvalid={invalidName && touched}
                                        type="text"
                                        value={this.state.fullName}
                                        onChange={e=>{this.setState({fullName:e.target.value})}}/>

                                    <Form.Control.Feedback type="invalid"> Contact Name is required</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            {this.props.groupOptions && 
                                <Col>
                                    <Form.Group controlId="formGridState">
                                        <Form.Label>Group</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            value={this.state.group}
                                            onChange={e=>{this.setState({groupID: e.target.value})}}
                                            isInvalid={invalidGroup && touched}
                                            >
                                            <option hidden></option>
                                            {this.props.groupOptions}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid"> Group is required</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            }
                        </Form.Row>
                        
                        
                        <Form.Group controlId="nameDesc">
                            <Form.Label>Contact Description</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows="2"
                                value={this.state.description}
                                onChange={e=>{this.setState({description:e.target.value})}}
                                />
                        </Form.Group>
                        <Form.Row>
                            <Col>
                                <Form.Group controlId="meetingPlace">
                                    <Form.Label>Meeting Place</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        value={this.state.meetingPlace}
                                        onChange={e=>{this.setState({meetingPlace:e.target.value})}}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="socials">
                                    <Form.Label>Social</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        value={this.state.socials}
                                        onChange={e=>{this.setState({socials:e.target.value})}}/>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={this.handleSubmit}>
                        Add Contact
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default NameForm;