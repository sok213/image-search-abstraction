const http = require('http'),
      url  = require('url'),
      request = require('request'),
      APIKey = '4329057-32f29fac6b16aaa05d4f4322f',
      port = process.env.PORT || 3000;

let searchQuery = 'cats';
      
function onRequest(req, res) {
  console.log(`Listening on PORT: ${ port }`);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hello, World!');
  res.end();
}

request(`https://pixabay.com/api/?key=${ APIKey }` + 
  `&q=${ searchQuery }&pretty=true&per_page=3`, 
  function(err, response, data) {
    if (!err && response.statusCode == 200) {
      console.log(data);
    }
  });
      
//http.createServer(onRequest).listen(port);