// app/service/weather.js
'use strict';
const Service = require('egg').Service;
const Nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const emailTemplate = fs.readFileSync(
  path.join(__dirname, '../template/weather-email.txt'),
  'utf-8'
);

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

  wheatherContentBuild(weather) {
    const template = emailTemplate;
    emailTemplate
      .match(/{{[a-zA-z|.|_]+}}/g)
      .map(link => link.replace(/{{([a-zA-z|.|_]+)}}/, '$1'))
      .forEach(arg => {
        let cache = weather;
        const props = arg.match(/[.]/g);
        for (let i = 0; i < props.length; i++) {
          if (!cache[props[i]]) {
            template.replace(`{{${arg}}}`, '');
            return;
          }
          cache = cache[props[i]];
        }
        template.replace(`{{${arg}}}`, cache);
      });
    return template;
  }
}


module.exports = EmailService;
