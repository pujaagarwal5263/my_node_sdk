// //check all the configuration file and export from here
// import { serviceConfiguration } from "../types/servicesInterface";
// import { Utilites } from "../utils/utils";
// import { container, injectable, singleton } from "tsyringe";

// var utilities = container.resolve(Utilites);

// @singleton()
// export class Configuration {
//   public ablyKey: string;
//   public ablyUrl: string;
//   public socketUrl: string;
//   public rabbitmqUrl: string;

//   constructor() {
//     //path needs to be fixed
//     const path = process.cwd() + "/node_modules/typescript/src/configuration/";
//     if (utilities.checkFileExists(path, "conf.json")) {
//       const config: serviceConfiguration = JSON.parse(
//         utilities.readFileToString(path, "conf.json")
//       );
//       this.ablyKey = config.ablyKey;
//       this.ablyUrl = config.ablyUrl;
//       this.socketUrl = config.socketUrl;
//       this.rabbitmqUrl = config.rabbitmqUrl;
//     } else {
//       console.log("conf file not found");
//     }
//   }

//   public getAblyKey(): string {
//     return this.ablyKey;
//   }

//   public getAblyUrl(): string {
//     return this.ablyUrl;
//   }

//   public getSocketUrl(): string {
//     return this.socketUrl;
//   }

//   public getRabbitmqUrl(): string {
//     return this.rabbitmqUrl;
//   }
// }
