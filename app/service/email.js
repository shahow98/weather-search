// app/service/weather.js
'use strict';
const Service = require('egg').Service;
const Nodemailer = require('nodemailer');

class EmailService extends Service {
  async sender(subject, content, to) {
    const transporter = Nodemailer.createTransport({
      host: 'HOST',
      port: 465,
      secure: true,
      auth: {
        user: 'USER@DOMAIN',
        pass: 'PASSWORD',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const info = await transporter.sendMail({
      from: '"weathermaker🌍" <USER@DOMAIN>',
      to,
      subject,
      html: content,
    });

    return info;
  }

  wheatherContentBuild(info) {
    let template = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>天气查询</title></head><body><div id="app" style="display: inline-block;text-align: center;width: 330px;height: 180px;"><div id="location" style="margin-bottom: 20px;        border-radius: 10px;        background: #edede9;        box-shadow: 20px 20px 60px #5f5f5d,            -20px -20px 60px #ffffff;            float: left;        margin: 0 20px 20px 0;        width: 200px;        height: 40px;        line-height: 40px;        font-size: 20px;">            {{city}}-{{region}}</div><div id="status" style="margin-bottom: 20px;        border-radius: 10px;        background: #edede9;        box-shadow: 20px 20px 60px #5f5f5d,            -20px -20px 60px #ffffff;            float: right;        width: 110px;        height: 80px;        line-height: 80px;        font-size: 24px;">            {{status}}</div><div id="now" style="margin-bottom: 20px;        border-radius: 10px;        background: #edede9;        box-shadow: 20px 20px 60px #5f5f5d,            -20px -20px 60px #ffffff;            float: left;        margin: 0 20px 20px 0;        width: 84px;        height: 60px;        line-height: 60px;        font-size: 24px;">            {{now}}℃</div><div id="rh" style="margin-bottom: 20px;        border-radius: 10px;        background: #edede9;        box-shadow: 20px 20px 60px #5f5f5d,            -20px -20px 60px #ffffff;            float: left;        margin: 0 20px 20px 0;        width: 96px;        height: 60px;        line-height: 60px;        font-size: 24px;">            {{rh}}%RH</div><div id="week" style="margin-bottom: 20px;        border-radius: 10px;        background: #edede9;        box-shadow: 20px 20px 60px #5f5f5d,            -20px -20px 60px #ffffff;            float: right;        width: 110px;        height: 80px;        line-height: 80px;        font-size: 24px;">            {{week}}</div><div id="wind-class" style="margin-bottom: 20px;        border-radius: 10px;        background: #edede9;        box-shadow: 20px 20px 60px #5f5f5d,            -20px -20px 60px #ffffff;            float: left;        margin-right: 20px;        width: 100px;        height: 40px;        line-height: 40px;        font-size: 24px;">            {{windClass}}</div><div id="wind-dir" style="margin-bottom: 20px;        border-radius: 10px;        background: #edede9;        box-shadow: 20px 20px 60px #5f5f5d,            -20px -20px 60px #ffffff;            float: left;        width: 80px;        height: 40px;        line-height: 40px;        font-size: 24px;">            {{windDir}}</div></div></body></html>';
    for (const prop in info) {
      const regex = `{{${prop}}}`;
      template = template.replace(regex, info[prop]);
    }
    return template;
  }
}

module.exports = EmailService;
