try {
	require('sugar');
	require('colors');
	require('websocket');
	
} catch (e) {
	console.log('No se encontraron las dependencias!... Instalalas y vuelve a ejecutar el comando');
	process.exit(-1);
}

var colors = require('colors');
var readline = require('readline');
var sys = require('sys');
var url = require('url');
var http = require('http');
var fs = require('fs');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

function searchData () {
	rl.question("Ingrese dirección de su servidor (ejemplo: server.psim.us): ", function (serverUrl) {
		if (serverUrl.indexOf('://') !== -1) {
			serverUrl = url.parse(serverUrl).host;
		}
		if (serverUrl.slice(-1) === '/') {
			serverUrl = serverUrl.slice(0, -1);
		}
		console.log('Obteniendo datos de ' + serverUrl + '...');
		console.log('Este proceso podria tardar unos segundos.');
		var received = false;
		var requestOptions = {
			hostname: 'play.pokemonshowdown.com',
			port: 80,
			path: '/crossdomain.php?host=' + serverUrl + '&path=',
			method: 'GET'
		};
		var req = http.request(requestOptions, function (res) {
			res.setEncoding('utf8');
			var str = '';
			res.on('data', function (chunk) {
				str += chunk;
			});
			res.on('end', function () {
				if (received) {
					return;
				}
				received = true;

				var search = 'var config = ';
				var index = str.indexOf(search);
				if (index !== -1) {
					var data = str.substr(index);
					data = data.substr(search.length, data.indexOf(';') - search.length);
					while (typeof data === "string") {
						try {
							data = JSON.parse(data);
						} catch (e) {
							console.log(e.message);
							console.log(e.stack);
							break;
						}
					}
					console.log(('---------------').grey);
					console.log('server: ' + data.host);
					console.log('port: ' + data.port);
					console.log('serverid: ' + data.id);
					console.log(('---------------').grey);
					console.log('Datos encontrados satisfactoriamente!...');
					console.log('Proceda a copiar los datos obtenidos en el archivo ' + ('config.js').red + '\n');
					rl.close();
					return process.exit();
				} else {
					console.log('ERROR: no se encontraron datos!');
					rl.close();
					process.exit(-1);
				}
			});
			res.on('error', function (err) {
				console.log('ERROR: ' + sys.inspect(err));
				rl.close();
				process.exit(-1);
			});
		});

		req.on('error', function (err) {
			console.log('ERROR: ' + sys.inspect(err));
			rl.close();
			process.exit(-1);
		});

		req.end();
	});
}


console.log('===---                         ---==='.grey);
console.log('     Iniciando busqueda de datos'.red);
console.log('===---                         ---==='.grey);
console.log('');

searchData();
