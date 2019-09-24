import React from 'react';
import { Link, Route } from 'react-router-dom';

const menus = [
	{to: '/'	  ,   exact: true,  name: 'Home',  title: ''},
    {to: '/rooms/1' , exact: false, name: 'Rooms', title: 'rooms'}, 
    {to: '/about' ,   exact: true,  name: 'About', title: 'about'}, 
    {to: '/blogs/1' , exact: false, name: 'Blog',  title: 'blogs'}, 
    {to: '/contact',  exact: true,  name: 'Contact', title: 'contact'}	
];

function Menu() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
            <div className="container">
                <a className="navbar-brand" href="index.html">Deluxe</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="oi oi-menu" /> Menu
                </button>
                <div className="collapse navbar-collapse" id="ftco-nav">                   
                    {showMenus(menus)}                                          
                </div>
            </div>
        </nav>
    );
}

const showMenus = (menus) => {
    let xhtml = null;
    if (menus.length === 0) return null;
        xhtml = menus.map((menu, index) => {
            return <MenuLink 
                        title = {menu.title}                       
						key = {index} 
						label = {menu.name}
						to = {menu.to} 
						activeOnlyWhenExact = {menu.exact} 
					/>  
        })
    
    return  <ul className="navbar-nav ml-auto">{xhtml}</ul> ;
}

const MenuLink = ({title, label, to, activeOnlyWhenExact }) =>{
	return (
		<Route
            title = {title}
			path = { to} 
			exact = { activeOnlyWhenExact}
			children = {({ match, location }) =>{               
				let active = match ? "active" : '';
				return(
					<li className={`nav-item ${active} ` }>
						{/* khi custom link thì hay dùng Link */}
						<Link className="nav-link" to={ to} title = {title} >{ label}</Link> 
					</li>	
				)
			}}
		/>
	)
}

export default Menu;
