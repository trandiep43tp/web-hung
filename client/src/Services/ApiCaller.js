import axios        from 'axios';
//import * as configs from '../redux/constrants/config';

function CallApi(endpoint, method = "GET", data = null){      
    return(    
         axios({
            method: method,
            url: `api/${endpoint}`,
            params: data            
        })
        .catch( err =>{
            console.log(err)
        })
    );
}

export default CallApi; 



