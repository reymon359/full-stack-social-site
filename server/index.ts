import http from 'http';
import { app } from './app';
import { origin, port } from './env';
import { server } from './server';
import { resetDb as envResetDb } from './env';
import { resetDb } from './db';

server.applyMiddleware({
  app,
  path: '/graphql',
  cors: { credentials: true, origin },
});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);



(function start() {
  envResetDb && resetDb();

  httpServer.listen(port, () => {
    console.log(`Server is listening on port ${port}`);

    // To solve some development issues
    setTimeout(() => {
      httpServer.close();
      start();
    }, 60000);

  });

})();

