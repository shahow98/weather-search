'use strict';
const fs = require('fs');

const Controller = require('egg').Controller;

class ViewController extends Controller {
  async index() {
    const { ctx } = this;
    const provinces = await ctx.service.weather.findProvinces();
    await ctx.render('register.html', { provinces: [ ...provinces ] });
  }

  async register() {
    const { ctx } = this;
    ctx.body = await fs.readFileSync('../../pulic/register.html').toString();
  }
}

module.exports = ViewController;
