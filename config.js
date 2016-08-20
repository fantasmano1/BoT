/* Configuraciones del bot */

/*
* Datos del server, procura que el port este en 8000 (mayoria) 
*/

exports.server = 'lalalaal-tuhost.rhcloud.com';

exports.port = 8000;

exports.serverid = 'lalalaal-tuhost.rhcloud.com:80';

/*
Pon el nombre de tu bot y su contraseña
*/

exports.nick = ''; // Nick del bot;
exports.pass = ''; // Contraseña para el bot;

/* Salas a las que loggeara el bot */

exports.rooms = ['lobby'];

/* Con que simbolo quieres que funcione tu bot, puedes usar todos menos el "/" */

exports.commandcharacter = '.';

/* Pon aqui tu nick */

exports.excepts = // 'userid';

/* * 
Rango limite de moderacion
*/ 

exports.defaultrank = '~';

/* Inserte guia para el bot*/
exports.botguide = '';

/*
* Moderacion
*/

exports.debuglevel = 3;
exports.watchconfig = false;
exports.secprotocols = [];
exports.whitelist = [];
exports.allowmute = false;
exports.punishvals = {
	1: 'warn',
	2: 'mute',
	3: 'hourmute',
	4: 'daymute',
	5: 'roomban',
};
