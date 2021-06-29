/* eslint valid-jsdoc: "off" */
'use strict';
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'admin',
      // 密码
      password: '123456',
      // 数据库名
      database: 'test',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  // 用于cookie签名密钥，应更改为您自己的并保持安全
  // config.keys = appInfo.name + '_1616829538291_8222';
  //自定义 token 的加密条件字符串
  config.jwt = {
    secret: 'fdssdgdfg2sdfs'
  };
  // 在此处添加中间件配置
  config.middleware = [];
  // 在此处添加中间件配置
  const userConfig = {
    // myAppName: 'egg',
  };
  //允许跨域
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*']//允许访问接口的白名单
  };
  config.cors = {
    origin: '*', 
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  // egg-validate 配置
  config.validate = {
    // convert: false,
    // validateRoot: false,
  };
  // 配置端口号
  config.cluster = {
    listen: {
      path: '',
      port: 8000,
      hostname: '127.0.0.1',
    }
  };
  const I18n = require('i18n');

  I18n.configure({
    locales: ['zh-CN'],
    defaultLocale: 'zh-CN',
    directory: __dirname + '/locale',
  });


  config.validate = {
    // convert: false,
    // validateRoot: false,
    translate() {
      const args = Array.prototype.slice.call(arguments);
      return I18n.__.apply(I18n, args);
    },
  };
  return {
    ...config,
    ...userConfig,
  };
};

