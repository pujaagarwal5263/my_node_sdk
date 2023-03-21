import { injectable } from "tsyringe";
import { io } from "socket.io-client";
import { Config } from "src/types/configInterface";
const { v4: uuidv4 } = require("uuid");

@injectable()
export class Socket {
  private serviceName: string;
  public connection: any;
  private socket: any;
  private appURL: string;

  constructor() {
    this.serviceName = "Socket.io";
  }

  init = async (config: Config) => {
    try {
      this.appURL = config.appUrl ? config.appUrl : "http://localhost:8001";
      this.socket = io(this.appURL);
      this.connection= this.socket;
      this.socket.on("connect_error", () => {
        const urlError =
          "Cannot connect to service: " +
          "Socket.io could not connect to the specified URL";
        throw new Error(urlError);
      });
      this.socket.on("connect", () => {
        console.log("Connected to service: ", this.serviceName);
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  public publish(eventName: string, data: object) {
    try {
      this.socket.emit("customEvent",{ event: eventName, data: data }); 
    } catch (err) {
      console.log("[ROOM/CHANNEL ERROR] Unable to publish message");
    }
  }
 
  public subscribe(eventName: string, cb: Function) {
    try {
      this.socket.on(eventName, (payload: object) => {
        cb(payload);
      });
    } catch (err) {
      console.log("[ROOM/CHANNEL ERROR] Unable to subscribe to event");
    }
  }

  public publishAll(eventName: string, data: any) {
    console.log("[Not Configured]: PublishAll Function Called!");
  }
  public subscribeAll(eventName: string, cb: Function) {
    console.log("[Not Configured]: SubscribeAll Function Called!");
  }
}