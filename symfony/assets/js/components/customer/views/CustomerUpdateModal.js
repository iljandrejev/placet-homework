import React, {Component} from "react";
import Modal from "reactstrap/es/Modal";
import ModalBody from "reactstrap/es/ModalBody";
import Form from "reactstrap/es/Form";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import {bindActionCreators} from "redux";
import {changeField, clearErrors} from "../../../global/actions/StandardActions";
import {createCustomer} from "../actions/CreateCustomerAction";
import {connect} from "react-redux";
import {CREATE_CUSTOMER_ACTION, EDIT_CUSTOMER_ACTION} from "../constants/ReducerConstants";
import Validate from "../../../global/utils/Validator";
import ValidationRules from "../utils/validation/ValidationRules";
import {cancelEditCustomer, editCustomer} from "../actions/EditCustomerAction";
import ModalFooter from "reactstrap/es/ModalFooter";
import FormFeedback from "reactstrap/es/FormFeedback";
import ModalHeader from "reactstrap/es/ModalHeader";
import {updateCustomer} from "../actions/UpdateCustomerAction";
import Button from "reactstrap/es/Button";

class CustomerUpdateModal extends Component {

    constructor(props){
        super(props);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.update = this.update.bind(this);

    }
    handleFieldChange(e){
        this.props.changeField(EDIT_CUSTOMER_ACTION, e.currentTarget.name, e.currentTarget.value);
    };
    handleCheckboxChange(e) {
        this.props.changeField(EDIT_CUSTOMER_ACTION, e.currentTarget.name, e.currentTarget.checked )
    };

    update(){
        const {editCustomerForm, changeField, clearErrors} = this.props;
        clearErrors(EDIT_CUSTOMER_ACTION);
        let validationFields = ['firstname', 'lastname', 'email', 'education'];
        let hasErrors = false;
        validationFields.forEach(field => {
            let error = Validate(ValidationRules, field, editCustomerForm[field]);
            if(error){
                hasErrors = true;
                changeField(EDIT_CUSTOMER_ACTION, field+'Error', error);
            }
            error = null;
        });

        if(hasErrors || editCustomerForm.isFetching) return;
        this.props.updateCustomer();
    }
    render() {
        const {editCustomerForm} = this.props;
        return (
            <React.Fragment>
                <Modal isOpen={editCustomerForm.isEditing} className="modal-lg">
                    <ModalHeader toggle={this.props.cancelEditCustomer}>Update customer</ModalHeader>
                    <ModalBody>
                        <Form>
                            <div className="row">
                                <FormGroup className="col-6">
                                    <Label for="firstname">Firstname</Label>
                                    <Input type="text" name="firstname" id="firstname" invalid={editCustomerForm.firstnameError !== null} value={editCustomerForm.firstname} onChange={this.handleFieldChange}/>
                                    {editCustomerForm.firstnameError && <FormFeedback >{editCustomerForm.firstnameError}</FormFeedback>}
                                </FormGroup>
                                <FormGroup className="col-6">
                                    <Label for="lastname">Lastname</Label>
                                    <Input type="text" name="lastname" id="lastname" invalid={editCustomerForm.lastnameError !== null} value={editCustomerForm.lastname} onChange={this.handleFieldChange} />
                                    {editCustomerForm.lastnameError && <FormFeedback >{editCustomerForm.lastnameError}</FormFeedback>}
                                </FormGroup>
                            </div>
                            <div className="row">
                                <FormGroup className="col-6">
                                    <Label for="email">Email</Label>
                                    <Input type="email" name="email" id="email" invalid={editCustomerForm.emailError !== null} value={editCustomerForm.email} onChange={this.handleFieldChange} />
                                    {editCustomerForm.emailError && <FormFeedback >{editCustomerForm.emailError}</FormFeedback>}
                                </FormGroup>
                                <FormGroup className="col-6">
                                    <Label for="education">Education</Label>
                                    <Input type="select" name="education" id="education" defaultValue={editCustomerForm.education} invalid={editCustomerForm.educationError !== null} onChange={this.handleFieldChange}>
                                        <option/>
                                        <option value="high">High</option>
                                        <option value="prof">Professional</option>
                                        <option value="middle">Middle</option>
                                    </Input>
                                    {editCustomerForm.educationError && <FormFeedback>{editCustomerForm.educationError}</FormFeedback>}
                                </FormGroup>
                            </div>
                            <div className="row">
                                <FormGroup check className="col-12 ">
                                    <Label check>
                                        <input type="checkbox" name="agreement" checked={editCustomerForm.agreement}  onChange={this.handleCheckboxChange}  />{' '}
                                        Allow to process personal information
                                    </Label>
                                </FormGroup>
                            </div>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.update()}>Update</Button>{' '}
                        <Button color="secondary" onClick={() => this.props.cancelEditCustomer()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        editCustomerForm: state.editCustomerForm

    }
}

const mapDispatchToProps = (dispatch) => (bindActionCreators({
    changeField,
    clearErrors,
    cancelEditCustomer,
    updateCustomer

}, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(CustomerUpdateModal);
