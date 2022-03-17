# weather-search

天气查询小服务

## Bash

+ egg.js
+ mysql
+ 百度地图api

## QuickStart

+ create a database 
+ running `ddl/weather_search_tables_ddl.sql` to mysql
+ open `app/config/default.js`  and editing `userConfig.mysql.client` 
+ open `app/service/email.js` and editing `EmailService.sender` 

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```
