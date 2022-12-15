// src/utils/multer.js
"use strict"

const multer = require('multer');
const path = require('path');

const fileFilter = (req, file, cb) => {
    //확장자 필터링
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true); //해당 mimetype만 받기
    } else {
        //다른 mimtype은 저장X
        req.fileValidationError = "이미지 타입에러";
        cb(null, false);
    }
};

const upload = multer({
    storage: multer.diskStorage({
        //폴더위치 지정
        destination: (req, file, done) => {
            done(null, '/VSCODE/WEB_PG/img_files');
        },
        filename: (req, file, done) => { //파일 이름지정
            const ext = path.extname(file.originalname);
            const fileName = path.basename(file.originalname, ext) + Date.now() + ext; //이부분 해석 필요
            done(null, fileName);
        },
    }),
    fileFilter: fileFilter,
    limits: { fileSize: 30 * 1024 * 1024 },
});

module.exports = { upload };