const http = require("http");
const fs = require("fs").promises;
const hostname = '0.0.0.0';
const port = 80;

const readNotes = async () => {
  return await fs.readFile('notes.txt', 'utf8');
};

const writeNotes = async notes => {
  await fs.writeFile('notes.txt', notes);
};

const handlerServerRequest = async request => {
  if (request.method === 'GET') {
    return await readNotes()
  }

  if (request.method === 'POST') {
    let body = '';
    request.on('data', chunk => {
      body += chunk.toString();
    });
    request.on('end', async () => {
      await writeNotes(body);
      return 'successfully saved'
    });
  }
}

http.createServer(async (request, response) => {
  try {
    const result = await handlerServerRequest(request);
    response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(result);
  } catch (error) {
    response.statusCode = 500;
    response.end(error);
  }
}).listen(port, hostname, () => {
  console.log(`Сервер начал прослушивание запросов на порту ${port}`);
});