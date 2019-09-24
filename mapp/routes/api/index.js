const express           = require('express');
const router            = express.Router(); 


router.use('/rooms', require('./rooms')); 
router.use('/blogs', require('./blogs')); 
router.use('/users', require('./users')); 
router.use('/carousels', require('./carousels')); 
router.use('/contact', require('./contact')); 

module.exports = router;
 
      