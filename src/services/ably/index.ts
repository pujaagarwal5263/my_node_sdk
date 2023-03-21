import { injectable } from "tsyringe";
import * as Ably from "ably";
import { Config } from "src/types/configInterface";
import { IAblyMsg } from "src/types/ablyMessageInterface";

@injectable()
export class AblyClass {
  private serviceName: string;
  private apiKey: string;
  public connection: any;
  public ably: any;
  public channelName: string;
  public channelArray: [string];
  public channel: any;
  constructor() {
    this.serviceName = "Ably";
  }

  public async init(config: Config) {
    this.apiKey = config.apiKey
      ? config.apiKey
      : "SMO4DQ.q7nMsA:UoSDIbT6wD45WWiBOIo-A6Nq003A3Moe1HXH3Df2kO0";

    this.ably = new Ably.Realtime.Promise(this.apiKey);
    this.channelName = "default";
    this.connection=this.ably;
    this.channel = this.ably.channels.get(this.channelName);
    await this.ably.connection.once("connected");
    console.log("Connected to service: ", this.serviceName);
  }

  public publish(eventName: string, data: object) {
    try {
      this.channel.publish(eventName, data);
    } catch (err) {
      console.log("[ROOM/CHANNEL ERROR] Unable to publish message", err);
    }
  }

  public subscribe(eventName: string, cb: Function) {
    try {
      this.channel.subscribe(eventName, (payload: IAblyMsg) => {
        cb(payload.data);
      });
    } catch (err) {
      console.log("[ROOM/CHANNEL ERROR] Unable to subscribe to event", err);
    }
  }

  public publishAll(eventName: string, data: any) {
    console.log('[Not Configured]: PublishAll Function Called!');
  }

  public subscribeAll(eventName: string, cb: Function) {
    console.log("[Not Configured]: SubscribeAll Function Called!");
  }
}
