import ValidateJS from 'validate.js';

export default function validate(constraints, fieldName, value) {
    if (!value) {value = null;}

    let formValues = {};
    formValues[fieldName] = value;

    let rules = {};
    rules[fieldName] =  constraints[fieldName];

    const result =  ValidateJS.validate(formValues, rules, {fullMessages: false});

    if (result) {
        return result[fieldName][0]
    }

    return null
}