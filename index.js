"use strict";

//모듈
const express = require('express');
const { sequelize } = require('./src/utils/connect');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//웹 세팅
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/public', express.static(__dirname + '/public'));
app.use('/img_files', express.static(__dirname + '/img_files'));
app.set('views', './views');
app.set('view engine', 'ejs');

//라우팅
const boardRouter = require('./src/routes/board');
const tagRouter = require('./src/routes/tag');
app.use('/board', boardRouter);
app.use('/tag', tagRouter);

//루트페이지 사용X
app.get('/', (req, res) => {
    res.redirect('/board')
});

//연결
const port = 3000;
app.listen(port, () => {
    console.log("server on!");
});

sequelize.sync({ force: false }).then(() => {
    console.log("DB connecting Success!");
}).catch((err) => {
    console.error(err);
});