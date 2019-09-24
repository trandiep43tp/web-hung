import React                    from 'react';
import { compose }              from 'redux';
import { connect }              from 'react-redux';
import { Field, reduxForm }     from 'redux-form';
import { actFecthContact }      from '../../redux/action/contact';
import renderFieldInPutFormHome from '../Helper/renderFieldInPutFormHome';
import validate                 from '../Helper/validateForm';

function FormContact(props) {   
    const {  handleSubmit, invalid, submitting,onClickSubmit } = props;   //do redux-fform cung cấp

    function submitForm(data){       
        onClickSubmit(data);   
    }    

    return (
        <form action = "" onSubmit = {handleSubmit(submitForm)} className="bg-white p-5 contact-form">            
            <div className="form-group">
                <Field 
                    name = 'name'
                    component = {renderFieldInPutFormHome}
                    label = 'Your Name'                                                
                    classInput = 'form-control'
                    type = 'text'
                />               
            </div>
            <div className="form-group">
                <Field 
                    name = 'email'
                    component = {renderFieldInPutFormHome}
                    label = 'Email'                                                
                    classInput = 'form-control'
                    type = 'text'                 
                    
                />               
            </div>
            <div className="form-group">
                <Field 
                    name = 'subject'
                    component = {renderFieldInPutFormHome}
                    label = 'Subject'                                                
                    classInput = 'form-control'
                    type = 'text'
                />               
            </div>
            <div className="form-group">
                <Field 
                    name = 'content'
                    component={renderFieldTextArea}
                    label = 'Content'                                                
                    classInput = 'form-control'
                    type = 'text'
                    multiline="true"
                    
                />               
            </div>
            <div className = "form-group">
                <button type="submit" disabled ={invalid || submitting } className = "btn btn-primary py-3 px-5">Send Message</button>
            </div>                          
        </form>
    );
}
const renderFieldTextArea = ({
        input,
        label,
        type,
        classInput,
        meta: { touched, error, warning }
    }) => (  
        <div>
            <textarea {...input} cols={30} rows={7} placeholder={label} type={type} className={classInput} />
            {touched &&
            ((error && <span style = {{color: 'red', fontWeight: "bold"}}>{error}</span>) ||
                (warning && <span style = {{color: 'red', fontWeight: "bold",}}>{warning}</span>))}
        </div>   
)

const warn = values => {   
    const warnings = {}
    if (values.name === '') {
        warnings.name = 'Vui lòng nhập tên....'
    }
    if (values.email === '') {
        warnings.email = 'Vui lòng nhập email....'
      }
    if (values.subject === '') {
      warnings.subject = 'Vui lòng nhập tiêu đề....'
    }
    if (values.content === '') {
        warnings.content = 'Vui lòng nhập nội dung....'
      }
    return warnings
}

const mapStatetoProps = state => {
    return {       
        initialValues: state.contact         
    }
}
const mapDispatchtoProps = (dispatch) => {
    return {      
        onClickSubmit: (data) => {
            dispatch(actFecthContact(data))
        }
    }
}
const ContactForm = reduxForm({ 
    form: 'formContact',
    enableReinitialize: true, 
    validate,
    warn                      
}); //enableReinitialize khi prop thay đổi giá trị form cũng thay đổi 
const withConnect = connect(mapStatetoProps, mapDispatchtoProps);
export default compose( withConnect, ContactForm )(FormContact);

