var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile(path.join(process.cwd(), CONFIG.PATH.dest.all, 'index.html'));
});

module.exports = router;
