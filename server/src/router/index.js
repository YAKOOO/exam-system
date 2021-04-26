const fs = require('fs');

// 统一对路由导出
const useRoutes = (app) => {
  fs.readdirSync(__dirname).forEach(file => {
    console.log(file)
    if(file === 'index.js') return;
    const router = require(`./${file}`);
    app.use(router.routes());
    app.use(router.allowedMethods());

  })
}

module.exports = useRoutes;