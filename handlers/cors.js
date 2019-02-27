
async function middleware(ctx, next) {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (ctx.method === 'OPTIONS') {
    ctx.status = 204;
  }

  await next();
};

exports.init = app => app.use(middleware);
