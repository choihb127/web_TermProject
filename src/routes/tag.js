// src/routes/tag.js
"use strict";

const express = require('express');
const routes = express.Router();
const tag_ctrl = require('../controllers/tag');

routes.get('/', tag_ctrl.tagall);//태그페이지
routes.get('/edit/:tagid', tag_ctrl.tagedit);//태그수정페이지

routes.post('/make', tag_ctrl.tagcreate);//태그추가
routes.post('/delete/:tagid', tag_ctrl.tagdelete);//태그삭제
routes.post('/update/:tagid', tag_ctrl.tagupdate);//태그수정

module.exports = routes;