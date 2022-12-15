// src/controllers/tag.js
"use strict"

var fs = require('fs');
const { User, Content, Tag } = require('../utils/connect');
const model = require('../utils/connect');
const contenttag = model.sequelize.models.contentTag;

//태그페이지(모든 태그보기)
exports.tagall = async (req, res) => {
    console.log('get tagpage');
    Tag.findAll({}).then((data) => {
        res.render('tag/main', {
            tags: data,
        });

    }).catch((err) => {
        return res.status(500).json({ err });
    });
};

//태그edit페이지
exports.tagedit = async (req, res) => {
    console.log('get tagedit');
    const editid = req.params.tagid;
    Tag.findAll({}).then((data) => {
        res.render('tag/edit', {
            tags: data,
            editid: editid,
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
};

//태그추가
//중복찾기 함수
exports.tagcreate = (req, res) => {
    console.log('post tag');
    let { tagname } = req.body;
    Tag.create({
        tagname: tagname,
    }).then(() => {
        return res.json({
            success: true,
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
};

//태그삭제
exports.tagdelete = async (req, res) => {
    console.log('del tag');
    //console.log(req.params.id)
    Tag.destroy({ where: { id: req.params.tagid } })
        .then(() => {
            res.redirect('/tag');
            console.log("delete success");
        }).catch((err) => {
            return res.status(500).json({ err });
        });
};

//태그수정
exports.tagupdate = async (req, res) => {
    console.log('update tag');
    const id = req.params.tagid;
    let { newname } = req.body;
    Tag.update({
        tagname: newname,
    }, {
        where: { id: id },
    }).then(() => {
        return res.json({
            success: true,
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
};