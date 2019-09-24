import React  from 'react';
import { compose }             from 'redux';
import { connect }             from 'react-redux';
import { Field, reduxForm }    from 'redux-form';
import { actChangeSearchRoom } from '../../redux/action/rooms';
import renderFieldInPutFormHome from '../Helper/renderFieldInPutFormHome';
import validate from '../Helper/validateForm';

function FormSearch(props) {   
    const {  handleSubmit, invalid, submitting } = props;   //do redux-fform cung cấp

    function submitForm(data){
        props.onClickSubmit(data);        
        props.history.push("/rooms/1");
    }

    function handleClear(){
        let search = {
            price_min: '',
            price_max: '',
            name: '',
            districtId: 'novalue',
            sort: 'novalue'
        };
        props.onClickSubmit(search);   
        props.history.push("/rooms/1"); 
    } 

    return (
        <form action = "/rooms" onSubmit = {handleSubmit(submitForm)}>
            <div className="fields">
                <div className="form-group">
                    <Field 
                        name = 'price_min'
                        component = {renderFieldInPutFormHome}
                        label = 'Price Min'                                                
                        classInput = 'form-control'
                        type = 'text'
                    />
                </div>
                <div className="form-group">
                    <Field 
                        name = 'price_max'
                        component = {renderFieldInPutFormHome}
                        label = 'Price Max'                                                
                        classInput = 'form-control'
                        type = 'text'
                    />                    
                </div>
                <div className="form-group">
                    <div className="select-wrap one-third">
                        <div className="icon"><span className="ion-ios-arrow-down" /></div>
                        <Field name="sort" component="select" className="form-control">                           
                            <option value="novlue">Choose Sort</option>
                            <option value="asc">From Min to Max</option>
                            <option value="desc">From Max to Min</option>
                        </Field>                          
                    </div>
                </div>
                <div className="form-group">
                    <div className="select-wrap one-third">
                        <div className="icon"><span className="ion-ios-arrow-down" /></div>
                        <Field name="districtId" component="select" className="form-control">
                            <option value = "novlue">Choose Districts</option>
                            <option value = "1">Districts 1</option>
                            <option value = "2">Districts 2</option>
                            <option value = "3">Districts 3</option>
                            <option value = "4">Districts 4</option>
                            <option value = "5">Districts 5</option>
                        </Field>                        
                    </div>
                </div>                
                <div className="form-group">                  
                    <input type="submit" disabled ={invalid || submitting } value="Search" className="btn btn-primary py-3 px-5" />                   
                </div>
                <div className="form-group">                                     
                    <input type="button" onClick = {handleClear} value="Clear" className="btn btn-success py-3 px-5" />
                </div>
            </div>
        </form>
    );
}

const mapStatetoProps = state => {
    return {       
        initialValues: state.rooms.roomSearch  //initialValues là props của redux-form
        //nó sẽ tự input giá trị vào các trường( phải cùng tên với nhau)
    }
}
const mapDispatchtoProps = (dispatch, ownProps) => {
    return {      
        onClickSubmit: (search) => {
            dispatch(actChangeSearchRoom(search))
        }
    }
}
const ContactForm = reduxForm({ form: 'formSearchRoom', validate });
const withConnect = connect(mapStatetoProps, mapDispatchtoProps);
export default compose( withConnect, ContactForm )(FormSearch);

