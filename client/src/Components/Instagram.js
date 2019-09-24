import React         from 'react';
import InstagramItem from './InstagramItem';

function Instagram(props) {
    const title      = props.title.toUpperCase();
    const link       = props.link;
    const instagrams = props.instagrams;
    
    return (
        <section className="instagram">
            <div className="container-fluid">
                <div className="row no-gutters justify-content-center pb-5">
                    <div className="col-md-7 text-center heading-section ftco-animate">
                        <h2><span>{ title }</span></h2>
                    </div>
                </div>
                <div className="row no-gutters">
                   { showIstagram(instagrams, link)}                  
                </div>
            </div>
        </section>
    );
   
}

const showIstagram = (items, link) =>{
    let xhtml  = '';
    if(items.length > 0){
        xhtml = items.map((item, index) =>{
            if(index <= 4){
                return  <InstagramItem key = {index} instagram = { item } link = { link} />
            }else{
                return ''
            }           
        })
    }
    return xhtml;
}


export default Instagram;
