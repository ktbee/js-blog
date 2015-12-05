var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', 'config'));

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE IF NOT EXISTS posts(id SERIAL PRIMARY KEY, title TEXT not null, draft TEXT not null, content TEXT, author VARCHAR(255), published TIMESTAMP, updated TIMESTAMP)');

// add test data to table
query = client.query("INSERT INTO posts(title, author, draft) values($1, $2, $3)", ['Test post title 1','Test McTester','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor neque sed dolor laoreet, et semper justo dignissim. Nunc mi metus, elementum non venenatis id, eleifend ac est. Sed auctor, dolor eu gravida efficitur, odio nulla pharetra sem, a ullamcorper neque eros eget ipsum. Praesent maximus arcu lorem, non dapibus magna aliquet sed. Vestibulum volutpat metus non nisi ornare rhoncus. Curabitur sed aliquet justo. Quisque aliquam sem massa, non venenatis lectus hendrerit a.']);
query = client.query("INSERT INTO posts(title, author, draft) values($1, $2, $3)", ['Test post title 2','Test McTester','Etiam eget ligula blandit nulla feugiat pharetra vel pulvinar urna. Ut interdum lacus nec elit consectetur semper. Praesent ullamcorper, mi sit amet semper feugiat, eros augue venenatis justo, a dapibus velit quam et magna. Nulla feugiat, diam ut porttitor tempus, purus tortor venenatis turpis, egestas convallis metus ipsum et urna. Vivamus cursus consequat nisl, sed facilisis turpis ornare quis. Donec in justo sit amet felis sodales elementum. In convallis lectus augue, ac tristique risus viverra at. Cras aliquet suscipit sollicitudin. Donec sit amet laoreet enim, a congue nulla. Ut cursus ante sit amet sodales consequat. Mauris dignissim eros vel tempor convallis. Integer lorem dui, posuere ac finibus et, bibendum in enim.']);
query = client.query("INSERT INTO posts(title, author, draft) values($1, $2, $3)", ['Test post title 3','Test McTester','Nulla sodales dignissim nisi eu elementum. Duis eleifend mollis velit elementum commodo. Sed tempus sagittis sapien quis facilisis. Vestibulum eu est vitae erat finibus efficitur. Pellentesque gravida, ex a auctor sodales, ligula nisl ultricies nunc, at porttitor ex eros eget augue. Donec a purus turpis. Cras mollis lacinia leo, sit amet lacinia mi iaculis sit amet. Pellentesque a luctus massa, vel tincidunt nisl. In lacinia felis eu varius volutpat. Cras lectus tellus, tempus in nibh et, congue hendrerit massa. Nam ut laoreet arcu. Nam varius, arcu quis elementum suscipit, justo justo eleifend justo, a molestie leo odio in nulla.'])

query.on('end', function() { client.end(); });

