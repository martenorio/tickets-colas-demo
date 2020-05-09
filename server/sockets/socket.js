const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')
const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.emit('estadoactual',{
        actual :ticketControl.getUltimoTicket(),
        ultimos4:ticketControl.getUltimos4()
    });

    // Escuchar el cliente
    client.on('siguienteTicket', (data,callback) => {

        let siguiente = ticketControl.siguiente();
        // console.log(siguiente);

        callback(siguiente);

    });
    client.on('atenderTicket',(data,callback)=>{
        // console.log(data);
        
        if (!data.escritorio){
            return callback({
                err:true,
                mensaje:"El escritorio es necesario"
            }); 
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);
        
        //actualizar o notificar los ultimos 4 cambios
        client.broadcast.emit('ultimos4',ticketControl.getUltimos4());

    })

});