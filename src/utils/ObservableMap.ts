const EventEmitter = require("events");


export class ObservableMap extends Map {

  emitter;

  constructor() {
    super();
    this.emitter = new EventEmitter();
  }
  // @ts-ignore
  set(key: string, value: any) {
    super.set(key, value);
    // @ts-ignore
    this.emitter.emit("change", {key, value});
  }
// @ts-ignore
  delete(key: string) {
    const value = this.get(key);
    super.delete(key);
    // @ts-ignore
    this.emitter.emit("change", {key, value});
  }

  clear() {
    super.clear();
    // @ts-ignore
    this.emitter.emit("change", {});
  }
}


