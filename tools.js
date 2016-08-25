// Datos de consola
global.info = function(text) {
	if (config.debuglevel > 3) return;
	if (!colors) global.colors = require('colors');
	console.log('info'.cyan + '  ' + text);
};

global.debug = function(text) {
	if (config.debuglevel > 2) return;
	if (!colors) global.colors = require('colors');
	console.log('debug'.blue + ' ' + text);
};

global.recv = function(text) {
	if (config.debuglevel > 0) return;
	if (!colors) global.colors = require('colors');
	console.log('recv'.grey + '  ' + text);
};

global.cmdr = function(text) { // receiving commands
	if (config.debuglevel !== 1) return;
	if (!colors) global.colors = require('colors');
	console.log('cmdr'.grey + '  ' + text);
};

global.dsend = function(text) {
	if (config.debuglevel > 1) return;
	if (!colors) global.colors = require('colors');
	console.log('send'.grey + '  ' + text);
};

global.error = function(text) {
	if (!colors) global.colors = require('colors');
	console.log('error'.red + ' ' + text);
};

global.ok = function(text) {
	if (config.debuglevel > 4) return;
	if (!colors) global.colors = require('colors');
	console.log('ok'.green + '    ' + text);
};

global.toId = function(text) {
	return text.toLowerCase().replace(/[^a-z0-9]/g, '');
};

global.stripCommands = function(text) {
	return ((text.trim().charAt(0) === '/') ? '/' : ((text.trim().charAt(0) === '!') ? ' ':'')) + text.trim();
};

global.send = function(connection, data) {
	if (connection.connected) {
		if (!(data instanceof Array)) {
			data = [data.toString()];
		}
		data = JSON.stringify(data);
		dsend(data);
		connection.send(data);
	}
};
