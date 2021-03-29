'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  //添加如下代码，注意添加位置
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  // egg-validate 启用
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  // 启用mysql
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  // 启用jwt
  jwt: {
    enable: true,
    package: "egg-jwt"
  },
};