import React, { useEffect } from 'react';
import Panel from '../Components/Panel';

function NotFoundPage() {

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
            <Panel name = 'Not found page' />
			<div className="bg-faded p-4 my-4">	
				<p className="text-center">
					<img src="images/notfound.jpg" alt="true" />
				</p>
			</div>		
    	</div>
	);
}


export default NotFoundPage;
