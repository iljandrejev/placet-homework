import React, {Component} from "react";
import Modal from "reactstrap/es/Modal";
import ModalHeader from "reactstrap/es/ModalHeader";
import ModalBody from "reactstrap/es/ModalBody";
import ModalFooter from "reactstrap/es/ModalFooter";
import Button from "reactstrap/es/Button";
import Form from "reactstrap/es/Form";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import Validate from "../../../global/utils/Validator";
import {connect} from "react-redux";
import {CREATE_CUSTOMER_ACTION} from "../constants/ReducerConstants";
import {bindActionCreators} from "redux";
import {changeField, clearErrors} from "../../../global/actions/StandardActions";
import ValidationRules from "../utils/validation/ValidationRules";
import {createCustomer} from "../actions/CreateCustomerAction";
import FormFeedback from "reactstrap/es/FormFeedback";


class ClientRegistrationModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.create = this.create.bind(this);
    }

    handleShow() {
        this.setState({
            showModal:true
        })
    };

    handleClose() {
        this.setState({
            showModal: false
        })
    };

    handleFieldChange(e){
      this.props.changeField(CREATE_CUSTOMER_ACTION, e.currentTarget.name, e.currentTarget.value);
    };
    handleCheckboxChange(e) {
        this.props.changeField(CREATE_CUSTOMER_ACTION, e.currentTarget.name, e.currentTarget.checked )
    };

    create(){
        const {createCustomerForm, changeField, clearErrors} = this.props;
        clearErrors(CREATE_CUSTOMER_ACTION);
        let validationFields = ['firstname', 'lastname', 'email', 'education'];
        let hasErrors = false;
        validationFields.forEach(field => {
            let error = Validate(ValidationRules, field, createCustomerForm[field]);
            if(error){
                hasErrors = true;
                changeField(CREATE_CUSTOMER_ACTION, field+'Error', error);
            }
            error = null;
        });

        if(hasErrors || createCustomerForm.isFetching) return;
        this.props.createCustomer();
    }
    render() {
        const {createCustomerForm} = this.props;
        return (
            <React.Fragment>
                <Button variant="primary" onClick={() => this.handleShow()}>
                    Add new customer
                </Button>

                <Modal isOpen={this.state.showModal} toggle={this.handleShow} className="modal-lg">
                    <ModalHeader toggle={this.handleClose}>Create customer</ModalHeader>
                    <ModalBody>
                        <Form>
                            <div className="row">
                                <FormGroup className="col-6">
                                    <Label for="firstname">Firstname</Label>
                                    <Input type="text" name="firstname" id="firstname" invalid={createCustomerForm.firstnameError !== null} value={createCustomerForm.firstname} onChange={this.handleFieldChange}/>
                                    {createCustomerForm.firstnameError && <FormFeedback >{createCustomerForm.firstnameError}</FormFeedback>}
                                </FormGroup>
                                <FormGroup className="col-6">
                                    <Label for="lastname">Lastname</Label>
                                    <Input type="text" name="lastname" id="lastname" invalid={createCustomerForm.lastnameError !== null} value={createCustomerForm.lastname} onChange={this.handleFieldChange} />
                                    {createCustomerForm.lastnameError && <FormFeedback >{createCustomerForm.lastnameError}</FormFeedback>}
                                </FormGroup>
                            </div>
                            <div className="row">
                                <FormGroup className="col-6">
                                    <Label for="email">Email</Label>
                                    <Input type="email" name="email" id="email" invalid={createCustomerForm.emailError !== null} value={createCustomerForm.email} onChange={this.handleFieldChange} />
                                    {createCustomerForm.emailError && <FormFeedback >{createCustomerForm.emailError}</FormFeedback>}
                                </FormGroup>
                                <FormGroup className="col-6">
                                    <Label for="education">Education</Label>
                                    <Input type="select" name="education" id="education" invalid={createCustomerForm.educationError !== null} onChange={this.handleFieldChange}>
                                        <option/>
                                        <option value="high">High</option>
                                        <option value="prof">Professional</option>
                                        <option value="middle">Middle</option>
                                    </Input>
                                    {createCustomerForm.educationError && <FormFeedback>{createCustomerForm.educationError}</FormFeedback>}
                                </FormGroup>
                            </div>
                            <div className="row">
                                <FormGroup check className="col-12 pl-5">
                                    <Label check>
                                        <Input type="checkbox" name="agreement"  onChange={this.handleCheckboxChange} />{' '}
                                        Allow to process personal information
                                    </Label>
                                </FormGroup>
                            </div>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.create()}>Create</Button>{' '}
                        <Button color="secondary" onClick={() => this.handleClose()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}
function mapStateToProps(state) {
    return {
        createCustomerForm: state.createCustomerForm

    }
}

const mapDispatchToProps = (dispatch) => (bindActionCreators({
    changeField,
    createCustomer,
    clearErrors
}, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(ClientRegistrationModal);