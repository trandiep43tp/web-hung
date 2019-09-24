import React     from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routers   from '../routerConfig';
import Menu      from './Menu';
import Footer    from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalLoading from '../Components/Helper/Loadding';

function App() {
          
    return (
        <Router onUpdate={'main.js'}> 
            <React.Fragment >
                <Menu />
                < Switch>
					{ showRouter(routers)}
				</Switch>	
                <Footer />       
                <ToastContainer />  
                <GlobalLoading />
            </React.Fragment>           
        </Router>
    ); 
}

function showRouter(routers){
	let xhtml = null;
	if(routers.length >0){
		xhtml = routers.map((router, index) =>{
			return <Route key={index} exact={router.exact} path={router.path} component={router.main}  />
		})
	}
	return xhtml;
}

export default App;
