
import React, { useState, useEffect } from 'react';
import { connect }                  from 'react-redux';
import EmployeesItem                from './EmployeesItem';
import { actFecthUsersHomeRequest } from '../../redux/action/users';

function Employees(props) {
    const [isShow, setIshow] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        props.fecthUsersHomeRequest();
    },[]) //eslint-disable-line

    useEffect(() => {
        setUsers(props.usersHome);
    },[props.usersHome]);

    useEffect(() => {
        if (users.length > 0)
            setIshow(true);
    },[users.length])

    const showUser = (users) => {
        let xhtml = '';
        if (users.length > 0) {           
            xhtml = users.map((user, index) => { 
                return <EmployeesItem key={index} user={user} />
            })
        }
        return <div className="carousel-testimony owl-carousel ftco-owl" id="diep"> {xhtml} </div>;
    }

    return (
        <section className="ftco-section testimony-section bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 ftco-animate">
                        <div className="row ftco-animate">
                            <div className="col-md-12">
                                {isShow ? showUser(users) : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const mapStatetoProps = state => {
    return {
        usersHome: state.usersHome
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        fecthUsersHomeRequest: () => {
            dispatch(actFecthUsersHomeRequest())
        }
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Employees);

