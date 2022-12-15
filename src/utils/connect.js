// src/utils/connect.js
"use strict";

const Sequelize = require('sequelize');
const config = require('config');

const Content = require('../models/content');
const Tag = require('../models/tag');
const Comment = require('../models/comment');

//new sequelize로 MySQL 연결 객체 생성
const sequelize = new Sequelize(
    config.get('mysql.database'),
    config.get('mysql.username'),
    config.get('mysql.password'),
    { host: config.get('mysql.host'), dialect: config.get('mysql.dialect') }
);

const db = {};

db.sequelize = sequelize;

db.Content = Content;
db.Tag = Tag;
db.Comment = Comment;

Content.init(sequelize);
Tag.init(sequelize);
Comment.init(sequelize);

Content.associate(db);
Tag.associate(db);
Comment.associate(db);

module.exports = db;