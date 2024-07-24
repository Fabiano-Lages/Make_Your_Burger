const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router('db/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === 'POST') {
    const db = router.db; 
    const collectionName = req.originalUrl.split('/').filter(x => x)[0]; 
  
    if (db.has(collectionName).value()) {
      const table = db.get(collectionName);
      const maxId = table.size().value() && !isNaN(Number(table.maxBy('id').value().id)) ? table.maxBy('id').value().id : 0;
      req.body.id = maxId + 1;
    }
  }
  next();
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});
