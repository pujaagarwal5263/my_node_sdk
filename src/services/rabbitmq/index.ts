import { singleton } from "tsyringe";
import { Client } from "@stomp/stompjs";
import { ObservableMap } from "../../utils/ObservableMap";
import { Config } from "src/types/configInterface";

const publishQueueMap: ObservableMap = new ObservableMap();
const subscribeQueueMap: ObservableMap = new ObservableMap();

@singleton()
export class RabbitMq {
  private serviceName: string;
  public connection: any;
  public channel: any;
  public queueName: any;
  public config: Client;
  constructor() {
    this.serviceName = "RabbitMQ";
  }
  init = async (config: Config) => {
    if (config.appType != "web") {
      //NOTE: Added conditional import due to polyfills which requires the below import to exist in Stompjs for nodejs and react-native.
      const app = require("websocket");
      Object.assign(global, { WebSocket: app.w3cwebsocket });
    }
    try {
      const stompConfig = {
        connectHeaders: {},
        brokerURL: config.appUrl,
        forceBinaryWSFrames: true,
        appendMissingNULLonIncoming: true,
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      };
      const StompClient = new Client(stompConfig);
      StompClient.onConnect = function () {
        publishQueueMap.emitter.on(
          "change",
          (event: { key: any; value: any }) => {
            StompClient.publish({
              destination: `/queue/${event.key}`,
              body: event.value,
            });
          }
        );
        subscribeQueueMap.emitter.on(
          "change",
          (event: { key: string; value: (payload: object) => void }) => {
            StompClient.subscribe(`/queue/${event.key}`, (payload) => {
              //NOTE: The "data" is converted back into JS Object before sending back.
              event.value(JSON.parse(payload.body));
            });
          }
        );
      };
      StompClient.activate();
      this.connection=StompClient;
      console.log("Connected to service: ", this.serviceName);
      const timeOut = (secs: number) =>
        new Promise((res) => setTimeout(res, secs * 1000));
      await timeOut(2);
    } catch (err) {
      console.log(err);
    }
  };

  public publish(queueName: string, data: object) {
    try {
      //NOTE: "data" parameter is converted to string, as STOMP expects a string in the "body" parameter of its publish method.
      publishQueueMap.set(queueName, JSON.stringify(data));
    } catch (error) {
      console.log("[ROOM/CHANNEL ERROR] Unable to publish message", error);
    }
  }
  public subscribe(queueName: string, cb: Function) {
    try {
      subscribeQueueMap.set(queueName, cb);
    } catch (error) {
      console.log("[ROOM/CHANNEL ERROR] Unable to subscribe to event", error);
    }
  }

  public publishAll(queueName: string, data: object) {
    console.log("[Not Configured]: PublishAll Function Called!");
  }
  public subscribeAll(eventName: string, cb: Function) {
    console.log("[Not Configured]: SubscribeAll Function Called!");
  }
}
