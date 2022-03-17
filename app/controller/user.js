'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async info() {
    const { ctx } = this;
    const userId = ctx.params.id;
    const userInfo = await ctx.service.user.find(userId);
    ctx.body = userInfo;
  }

  async inUse() {
    const { ctx } = this;
    const userInfo = await ctx.service.user.findByFlag('A');
    ctx.body = userInfo;
  }

  async pushUser() {
    const { ctx } = this;
    const userInfo = await ctx.service.user.findPushUser();
    ctx.body = userInfo;
  }

  async register() {
    const { ctx } = this;
    const userInfo = ctx.request.body;
    const flag = await ctx.service.user.register(userInfo.name, userInfo.email, userInfo.districtcode);
    ctx.body = flag ? { code: 0 } : { code: 1, errMsg: '邮箱已存在!' };
  }
}

module.exports = UserController;
