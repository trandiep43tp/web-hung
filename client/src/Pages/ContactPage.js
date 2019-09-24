import React, { useEffect } from 'react';
import Panel       from '../Components/Panel';
import Contact     from '../Components/ContactPage/Contact';


function ContactPage() { 
    
    useEffect( () =>{
        const list = document.querySelectorAll('script[src = "js/main.js"]');       
        if(list.length > 0){
            document.body.removeChild(list[0])
        }
        const script = document.createElement('script');
        script.src = 'js/main.js';
        document.body.appendChild(script);
    },[]);
    

	return (
        <div >
            <Panel name = 'contact us' />              
            <Contact  />
        </div>	
	);
}
export default ContactPage;


