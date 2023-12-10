import { Server } from "socket.io";
import Redis from "ioredis";
// host redis-3ddc1af1-johndoeatconvoverse-3dc8.a.aivencloud.com
// Port
// 26490
// User
// default

// Password
// AVNS_dEFHK1faIg3c7DTA3zg

const pub = new Redis({
    host: "redis-3ddc1af1-johndoeatconvoverse-3dc8.a.aivencloud.com",
    port: 26490,
    username: "default",
    password: "AVNS_dEFHK1faIg3c7DTA3zg",
  });
  
  const sub = new Redis({
    host: "redis-3ddc1af1-johndoeatconvoverse-3dc8.a.aivencloud.com",
    port: 26490,
    username: "default",
    password: "AVNS_dEFHK1faIg3c7DTA3zg",
  });
  
  class SocketService {
    private _io: Server;
  
    constructor() {
      console.log("Init Socket Service...");
      this._io = new Server({
        cors: {
          allowedHeaders: ["*"],
          origin: "*",
        },
      });
      sub.subscribe("MESSAGES");
    }
  
    public initListeners() {
      const io = this.io;
      console.log("Init Socket Listeners...");
  
      io.on("connect", (socket) => {
        console.log(`New Socket Connected`, socket.id);
        socket.on("event:message", async ({ message }: { message: string }) => {
          console.log("New Message Rec.", message);
          // publish this message to redis
          await pub.publish("MESSAGES", JSON.stringify({ message }));
        });
      });
  
      sub.on("message", (channel, message) => {
        if (channel === "MESSAGES") {
          console.log("new message from redis", message);
          io.emit("message", message);
        }
      });
    }
  
    get io() {
      return this._io;
    }
  }
  
  export default SocketService;