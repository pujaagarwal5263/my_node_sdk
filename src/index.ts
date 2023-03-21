import "reflect-metadata";
import { container } from "tsyringe";
import { Config } from "./types/configInterface";
import { AblyClass } from "./services/ably";
import { Socket } from "./services/socket";
import { RabbitMq } from "./services/rabbitmq";

export class SDK {
  public connection: any;
  instance: AblyClass | Socket | RabbitMq;
  public utilities: any;

  constructor() {}

  setConfig(config: Config) {
    switch (config.appMedium) {
      case "rabbitmq":
        this.instance = container.resolve(RabbitMq);
        break;
      case "ably":
        this.instance = container.resolve(AblyClass);
        break;
      case "socket":
        this.instance = container.resolve(Socket);
        break;
    }
    //setting other configurations sent by the client
  }

  initialize = async (config: Config) => {
    if (config) {
      this.setConfig(config);
      await this.instance.init(config);
      this.connection = await this.instance.connection;
      return;
    } else {
      console.log("Please pass app-medium");
    }
  };

  public publish(eventName: string, data: any) {
    this.instance.publish(eventName, data);
  }

  public subscribe(eventName: string, cb: Function) {
    this.instance.subscribe(eventName, cb);
  }

  public publishAll(eventName: string, data: any) {
    this.instance.publishAll(eventName, data);
  }

  public subscribeAll(eventName: string, cb: Function) {
    this.instance.subscribeAll(eventName, cb);
  }
}
