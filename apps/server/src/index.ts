import http from "http";
import SocketService from "./services/socket";
async function init(){

    const socketService = new SocketService();
    const httpServer = http.createServer();
    const port = process.env.PORT || 8001;
   socketService.io.attach(httpServer);
    httpServer.listen(port,()=>{
        console.log(`Http server hai bhai chal raha ${port} pe`)
    });
    socketService.initListeners();
}
init();