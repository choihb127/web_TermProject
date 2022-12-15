// src/utils/connect.js
"use strict";

const Sequelize = require('sequelize');
const config = require('config');

const Content = require('../models/content');
const Tag = require('../models/tag');
const Comment = require('../models/comment');

//new sequelize로 mysql 연결 객체 생성
const sequelize = new Sequelize(
    config.get('aws.database'),
    config.get('aws.username'),
    config.get('aws.password'),
    { host: config.get('aws.host'), dialect: config.get('aws.dialect') }
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