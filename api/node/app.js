const http = require("http");
const fs = require("fs");
const hostname = '0.0.0.0';
const port = 80;

const readNotes = (serverResponse) => {
  fs.readFile('test.txt', 'utf8', (error, fileContent) => {
    if (error) {
      throw error;
    }
    serverResponse.end(fileContent);
  });
};

const writeNotes = (notes) => {
  fs.writeFile('test.txt', notes, error => {
    if (error) {
      throw error;
    }
    console.log('Данные успешно записаны записать файл');
  });
};

http.createServer(async (request, response) => {
  readNotes(
    response
  );
}).listen(port, hostname, () => {
  console.log(`Сервер начал прослушивание запросов на порту ${port}`);
});
