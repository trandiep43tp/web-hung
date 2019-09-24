import React from 'react';

import  HomePage    from './Pages/HomePage';
import  RoomPage    from './Pages/RoomPage';
import RoomPageDetail   from './Pages/RoomPageDetail';
import  AboutPage   from './Pages/AboutPage';
import  BlogPage    from './Pages/BlogPage';
import BlogPageDetail from './Pages/BlogPageDetail';
import  ContactPage from './Pages/ContactPage';
import NotFoundPage from './Pages/NotFoundPage';

const Routers = [
    {
        path: '/',
        exact: true,
        main: ({match, history})=> <HomePage match = { match} history = {history} />
    },
    // {
    //     path: '/rooms',
    //     exact: true,
    //     main: ({match, history })=> <RoomPage match = { match} history = {history} />
    // }, 
    {
        path: '/rooms/:page',
        exact: true,
        main: ({match, history})=> <RoomPage match = { match} history = {history}  />
    }, 
    {
        path: '/rooms/detail/:slug',
        exact: false,
        main: ({match, history, location})=> <RoomPageDetail match = { match} history = {history} location ={location} />
        //nếu k truyền history khi nhấn trở lại nó bị lỗi do nó k nhớ 
    },
    {
        path: '/about',
        exact: false,
        main: ()=> <AboutPage  />
    },
    // {
    //     path: '/blogs',
    //     exact: true,
    //     main: ({match, history})=> <BlogPage match = { match} history = {history}  />
    // },
    {
        path: '/blogs/:page',
        exact: true,
        main: ({match, history})=> <BlogPage match = { match} history = {history}  />
    },
    {
        path: '/blogs/detail/:slug',
        exact: true,
        main: ({match, history})=> <BlogPageDetail match = { match} history = {history} />
        //nếu k truyền history khi nhấn trở lại nó bị lỗi do nó k nhớ 
    },
    {
        path: '/contact',
        exact: false,
        main: ({history})=> <ContactPage history = {history}  />
    },          
    {
        path: '', 
        exact: false,
        main: ()=> <NotFoundPage  />
    }
]


export default Routers;