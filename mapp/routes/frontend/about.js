const express        = require('express');
const router         = express.Router();
const folderView     = __path_views_frontend + 'pages/about/';
const layoutFrontend = __path_views_frontend + 'frontend';

router.get('/', async (req, res, next)=> {       
	res.render(folderView +'index', { 
           layout: layoutFrontend,                            
    });
});

module.exports = router;