// importar socket 

var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function () {
    console.log(`Conectado al servidor`);
});

socket.on('disconnect', function () {
    console.log(`se perdio la conexion con el servidor`);
});

//escuchar info
socket.on('estadoactual', function (estadoactual) {
    console.log(estadoactual.actual);
    
    label.text(estadoactual.actual);
})

$('button').on('click',function (){
    console.log('click');
    //enviar informacion
    socket.emit('siguienteTicket',null,function(siguienteTicket){
        label.text(siguienteTicket);
    });
})