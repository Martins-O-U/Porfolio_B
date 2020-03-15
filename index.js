const server = require('./Api/server');

const PORT = process.env.PORT

server.listen(PORT, () => {
    console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
