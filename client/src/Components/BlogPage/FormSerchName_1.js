import React                    from 'react';
import { compose }              from 'redux';
import { connect }              from 'react-redux';
import { Field, reduxForm }     from 'redux-form';
import { actChangeSearchBlog }  from '../../redux/action/blogs';
import renderFieldInPutFormHome from '../Helper/renderFieldInPutFormHome';
import validate                 from '../Helper/validateForm';

function FormSearchName(props) {   
    const {  handleSubmit, history, onClickSubmit } = props;   //do redux-fform cung cấp
    function submitForm(data){          
        onClickSubmit(data.name);        
        history.push("/blogs/1");
    }     

    return (
        <form action="/" className="search-form" onSubmit = {handleSubmit(submitForm)}>
            <div className="form-group">
                <span className="icon fa fa-search" />
                <Field 
                    name = 'name'
                    component = {renderFieldInPutFormHome}
                    label = 'Type a keyword and hit enter'                                                
                    classInput = 'form-control'
                    type = 'text'
                />                
            </div>
        </form>
    );
}

const mapStatetoProps = state => {
    return {       
        initialValues: state.blogs.blogSearch          
    }
}
const mapDispatchtoProps = (dispatch) => {
    return {      
        onClickSubmit: (search) => {
            dispatch(actChangeSearchBlog(search))
        }
    }
}
const ContactForm = reduxForm({ form: 'formSearchBlogNameDetail',enableReinitialize: true, validate }); //enableReinitialize khi prop thay đổi giá trị form cũng thay đổi 
const withConnect = connect(mapStatetoProps, mapDispatchtoProps);
export default compose( withConnect, ContactForm )(FormSearchName);

