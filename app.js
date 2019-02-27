const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router({prefix: '/api'});

require('./handlers/logger').init(app);
require('./handlers/errors').init(app);
require('./handlers/session').init(app);
require('./handlers/bodyParser').init(app);
require('./handlers/cors').init(app);

let clients = [];

async function subscribe(ctx, next) {
  ctx.set('Cache-Control', 'no-cache,must-revalidate');

  const message = await new Promise(resolve => {
    clients.push(resolve);

    ctx.res.on('close', () => {
      clients = clients.filter(_resolve => _resolve !== resolve);
      resolve();
    });
  });

  ctx.body = {message};
};

async function publish(ctx, next) {
  const message = ctx.request.body.message;

  if (!message) {
    ctx.throw(404);
  }

  clients.forEach(resolve => resolve(message));

  clients = [];

  ctx.body = 'ok'
};

router.get('/subscribe', subscribe);
router.post('/publish', publish);

app.use(router.routes())

module.exports = app;
