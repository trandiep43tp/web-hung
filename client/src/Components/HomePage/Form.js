import React       from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm }     from 'redux-form';
import { actChangeSearchRoom }  from '../../redux/action/rooms';
import renderFieldInPutFormHome from '../Helper/renderFieldInPutFormHome';
import validate from '../Helper/validateForm';
function Form(props) {   
    //console.log(props) để xem các props do form cung cấp
    const {  handleSubmit, invalid, submitting } = props;
   
    function submitForm(data){
        props.onClickSubmit(data);        
        props.history.push("/rooms/1");
    }
   
    return (      
        <section className="ftco-booking">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <form className="booking-form" method = "POST" onSubmit = {handleSubmit(submitForm)} >
                            <div className="row">
                                <div className="col-md d-flex">
                                    <div className="form-group p-4 align-self-stretch d-flex align-items-end">
                                        <div className="wrap">
                                            <label >Price Min</label>
                                            <Field 
                                                name = 'price_min'
                                                component = { renderFieldInPutFormHome}
                                                label = 'Price Min'                                            
                                                classInput = 'form-control'
                                                type = 'text'                                                
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md d-flex">
                                    <div className="form-group p-4 align-self-stretch d-flex align-items-end">
                                        <div className="wrap">
                                            <label >Price Max</label>
                                            <Field 
                                                name = 'price_max'
                                                component = {renderFieldInPutFormHome}
                                                label = 'Price Max'                                                
                                                classInput = 'form-control'
                                                type = 'text'
                                               
                                            />
                                       </div>
                                    </div>
                                </div>
                                <div className="col-md-3 d-flex">
                                    <div className="form-group p-4 align-self-stretch d-flex align-items-end">
                                        <div className="wrap">
                                            <label >Sort</label>
                                            <div className="form-field">
                                                <div className="select-wrap">
                                                    <div className="icon"><span className="ion-ios-arrow-down" /></div>
                                                    <Field name="sort" component="select" className="form-control">
                                                        {/* <option /> */}
                                                        <option value="novlue">Choose Sort</option>
                                                        <option value="asc">From Min to Max</option>
                                                        <option value="desc">From Max to Min</option>
                                                    </Field>                                                   
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md d-flex">
                                    <div className="form-group p-4 align-self-stretch d-flex align-items-end">
                                        <div className="wrap">
                                            <label>Districts</label>
                                            <div className="form-field">
                                                <div className="select-wrap">
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
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md d-flex">                                    
                                    <div className="form-group d-flex align-self-stretch">                                     
                                        <input type="submit" disabled ={invalid || submitting } value="Check Availability" className="btn btn-primary py-3 px-4 align-self-stretch" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
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

const ContactForm = reduxForm({ form: 'formSearchHome', validate }); //phải đúng tên validate
const withConnect = connect(mapStatetoProps, mapDispatchtoProps);
export default compose( withConnect, ContactForm )(Form)



