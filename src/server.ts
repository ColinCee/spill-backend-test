import { buildFastify } from './app';

const start = async () => {
  const server = buildFastify();
  try {
    await server.listen(3000);
    const address = server.server.address();
    const port = typeof address === 'string' ? address : address?.port;
    console.log(port);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
