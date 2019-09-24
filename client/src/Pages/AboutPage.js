import React, { useEffect } from 'react';
import Panel      from '../Components/Panel';
import Couters    from '../Components/HomePage/Couters';
import Introduce  from '../Components/HomePage/Introduce';
import Procedure  from '../Components/HomePage/Procedure';
//import Instagram  from '../Components/Instagram';

function AboutPage() {

    useEffect( () =>{
        const list = document.querySelectorAll('script[src = "js/main.js"]');       
        if(list.length > 0){
            document.body.removeChild(list[0])
        }
        const script = document.createElement('script');
        script.src = 'js/main.js';
        document.body.appendChild(script);
    },[])

	return (
        <div >
            <Panel name = 'about us' />
            <Couters />
            <Introduce />
            <Procedure />
            {/* <Instagram /> */}
        </div>	
	);
}


export default AboutPage;
