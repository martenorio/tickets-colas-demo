var socket = io();
var lblTicket1 = $('#lblTicket1');
var lblEscritorio1 = $('#lblEscritorio1');
var lblTicket2 = $('#lblTicket2');
var lblEscritorio2 = $('#lblEscritorio2');
var lblTicket3 = $('#lblTicket3');
var lblEscritorio3 = $('#lblEscritorio3');
var lblTicket4 = $('#lblTicket4');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1,lblTicket2,lblTicket3,lblTicket4];
var lblEscritorios = [lblEscritorio1,lblEscritorio2,lblEscritorio3,lblEscritorio4];
//opcional se puede notificar si se perdio la conexion 
socket.on('connect', function () {
    console.log(`Conectado al servidor`);
});

socket.on('disconnect', function () {
    console.log(`se perdio la conexion con el servidor`);
});

socket.on('estadoactual',function(resp){
    console.log(resp);
    actualizahtml(resp.ultimos4);
    
});

socket.on('ultimos4',function(resp){
    console.log(resp);
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizahtml(resp);
})

function actualizahtml(ultimos4){
    for (let index = 0; index <= ultimos4.length -1; index++) {
        lblTickets[index].text('Ticket ' + ultimos4[index].numero);        
        lblEscritorios[index].text('Escritorio ' + ultimos4[index].escritorio);        
    }
}