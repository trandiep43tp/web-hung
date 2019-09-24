import React  from 'react';
import { compose }              from 'redux';
import { connect }              from 'react-redux';
import { Field, reduxForm }     from 'redux-form';
import { actChangeSearchRoomName } from '../../redux/action/rooms';
import renderFieldInPutFormHome from '../Helper/renderFieldInPutFormHome';
import validate from '../Helper/validateForm';

function FormSearchName(props) {   
    const {  handleSubmit } = props;   //do redux-fform cung cấp

    function submitForm(data){       
        props.onClickSubmit(data.name);        
        props.history.push("/rooms/1");
    }     

    return (
        <form action = "" onSubmit = {handleSubmit(submitForm)}>            
            <Field 
                name = 'name'
                component = {renderFieldInPutFormHome}
                label = 'Type a keyword and hit enter'                                                
                classInput = 'form-control'
                type = 'text'
            />               
        </form>
    );
}

const mapStatetoProps = state => {
    return {       
        initialValues: state.rooms.roomSearch          
    }
}
const mapDispatchtoProps = (dispatch) => {
    return {      
        onClickSubmit: (search) => {
            dispatch(actChangeSearchRoomName(search))
        }
    }
}
const ContactForm = reduxForm({ form: 'formSearchRoomName',enableReinitialize: true, validate }); //enableReinitialize khi prop thay đổi giá trị form cũng thay đổi 
const withConnect = connect(mapStatetoProps, mapDispatchtoProps);
export default compose( withConnect, ContactForm )(FormSearchName);

