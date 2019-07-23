import React from 'react';
import { Field, reduxForm } from 'redux-form';


class StreamForm extends React.Component {

    renderError({ error, touched }) {
        if (error && touched)
            return (
                <div className=" error message">{error}</div>
            );
    };
    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    };

    render() { 
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
};

const validate = formValues => {
    const errors = {};

    if (!formValues.title)
        errors.title = "Title can't be empty!"

    if (!formValues.description)
        errors.description = "Description can't be empty!"

    return errors;
};

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);
