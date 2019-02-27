const app = require('./app.js');
const config = require('config');

function showMessage() {
  console.log('App is running on ' + config.get('port') + ' port');
}

app.listen(config.get('port'), showMessage);
