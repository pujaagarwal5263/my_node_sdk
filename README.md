<h1 align="center">Welcome to my-node-sdk 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.15-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> a self made sdk

## Install

```sh
npm link
```

## Run in express/ node/ react/ react-native app:

```sh
const {SDK} = require("package-name")
const obj= SDK.initialize({
 appMedium:"socket",
 appURL:""
});

obj.publish("data","Hi, from this side");
obj.subscribe("data",(msg)=>{
  console.log(msg);
})
```



## Show your support
Give a ⭐️ if this project helped you!
