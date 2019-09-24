import React from 'react';

function FormEvaluate(props) {

    function handleSubmit(e) {       
        alert("Cảm Ơn Bạn Đã Đánh Giá");
        e.preventDefault();       
        props.history.push("/rooms/1");         
    }
    
    return (
        <form method="post" className="star-rating" >
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange = {handleSubmit} />
                <label className="form-check-label" htmlFor="exampleCheck1">
                    <p className="rate"><span><i className="icon-star" /><i className="icon-star" /><i className="icon-star" /><i className="icon-star" /><i className="icon-star" /></span></p>
                </label>
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange = {handleSubmit} />
                <label className="form-check-label" htmlFor="exampleCheck1">
                    <p className="rate"><span><i className="icon-star" /><i className="icon-star" /><i className="icon-star" /><i className="icon-star" /><i className="icon-star-o" /></span></p>
                </label>
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange = {handleSubmit} />
                <label className="form-check-label" htmlFor="exampleCheck1">
                    <p className="rate"><span><i className="icon-star" /><i className="icon-star" /><i className="icon-star" /><i className="icon-star-o" /><i className="icon-star-o" /></span></p>
                </label>
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange = {handleSubmit} />
                <label className="form-check-label" htmlFor="exampleCheck1">
                    <p className="rate"><span><i className="icon-star" /><i className="icon-star" /><i className="icon-star-o" /><i className="icon-star-o" /><i className="icon-star-o" /></span></p>
                </label>
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange = {handleSubmit} />
                <label className="form-check-label" htmlFor="exampleCheck1">
                    <p className="rate"><span><i className="icon-star" /><i className="icon-star-o" /><i className="icon-star-o" /><i className="icon-star-o" /><i className="icon-star-o" /></span></p>
                </label>
            </div>
        </form>
    );
}

export default FormEvaluate;
