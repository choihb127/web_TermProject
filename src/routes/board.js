// src/routes/board.js
"use strict";

const express = require('express');
const routes = express.Router();
const board_ctrl = require('../controllers/board');
const comment_ctrl = require('../controllers/comment');

const { upload } = require('../utils/multer');

routes.get('/', board_ctrl.mainpage);//board의 메인페이지. 전체글 보기

routes.get('/upload', board_ctrl.uploadpage);//게시글 업로드 페이지
routes.get('/content/:contentid', board_ctrl.contentRead);//게시글 보기
routes.get('/edit/:contentid', board_ctrl.contentEdit)//게시글 수정 페이지

routes.post('/check/:contentid', board_ctrl.contentCheck);//게시글 수정페이지 접근을 위한 PW검사
routes.post('/upload', upload.single("img"), board_ctrl.upload);//게시글 업로드
routes.post('/update/:contentid', board_ctrl.contentUpdate);//게시글 수정
routes.post('/delete/:contentid', board_ctrl.contentDelete);//게시글 삭제

routes.post('/commentUp/:contentid', comment_ctrl.commentUp)//댓글 작성
routes.post('/commentDel/:commentid', comment_ctrl.commentDel)//댓글 삭제

module.exports = routes;