const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router({prefix: '/api'});

require('./handlers/logger').init(app);
require('./handlers/errors').init(app);
require('./handlers/session').init(app);
require('./handlers/bodyParser').init(app);

async function mock(ctx, next) {
  ctx.body = 'Simple chat default';
};

router.get('*', mock);

app.use(router.routes());

module.exports = app;
