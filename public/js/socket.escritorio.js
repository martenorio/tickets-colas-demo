var socket = io();

var searchparams = new URLSearchParams(window.location.search);

if(!searchparams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchparams.get('escritorio');
console.log(escritorio);
var label = $('small');

$('h1').text('Escritorio ' + escritorio); 

$('button').on('click',function(){
    socket.emit('atenderTicket',{ escritorio : escritorio },function(resp){
        console.log(resp);
        if(resp === 'No hay tickets'){
            label.text(resp)
            alert('No hay mas tickets');
            return
        }
        label.text(resp.numero);
    })    
})
