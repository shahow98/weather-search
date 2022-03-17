// app/service/user.js
'use strict';
const Service = require('egg').Service;
const USER = 't_user';

class UserService extends Service {
  async find(id) {
    const user = await this.app.mysql.get(USER, { id });
    return user;
  }

  async findByFlag(flag) {
    const users = await this.app.mysql.select(USER, {
      where: {
        flag,
      },
    });
    return users;
  }

  async findPushUser() {
    const findSql = `select * from ${USER} where flag = 'T' and email is not null`;
    const users = await this.app.mysql.query(findSql, []);
    return users;
  }

  async findByEmail(email) {
    const user = await this.app.mysql.select(USER, {
      where: { email },
    });
    return user;
  }

  async findRegionCodes() {
    const findSql = `select distinct region_code from ${USER}`;
    const regionCodes = await this.app.mysql.query(findSql);
    return regionCodes.map(code => code.region_code);
  }

  async register(name, email, regionCode) {
    let flag = true;
    const user = await this.findByEmail(email);
    if (!user.length) {
      await this.insert(name, email, regionCode);
    } else {
      flag = false;
    }
    return flag;
  }

  async insert(name, email, regionCode) {
    const result = await this.app.mysql.insert(USER, {
      name,
      email,
      region_code: regionCode,
      flag: 'T',
    });
    const isSuccess = result.affectedRows === 1 ? '成功' : '失败';
    this.ctx.logger.info(`添加一个用户: ${isSuccess}`);
  }

  async updateEmail(id, email) {
    const result = await this.app.mysql.update(USER, {
      id,
      email,
    });
    const isSuccess = result.affectedRows === 1 ? '成功' : '失败';
    this.ctx.logger.info(`更新用户${id}邮箱: ${isSuccess}`);
  }
}

module.exports = UserService;
