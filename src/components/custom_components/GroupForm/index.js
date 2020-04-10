import React, {Component} from 'react';
import {Button, Modal} from 'react-bootstrap';

class GroupForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            groupName: '',
            description: ''
        }
    }
    
    render(){
        return(
            <Modal show = {this.props.show} onHide={this.props.handleFormHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleFormHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.props.handleFormHide}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default GroupForm;