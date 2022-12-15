// src/controllers/board.js
"use strict"

var fs = require('fs');
const { Comment, Content, Tag } = require('../utils/connect');
const model = require('../utils/connect');
const contenttag = model.sequelize.models.contentTag;

//전체글 보기
//태그는 같이 안보여주는지?
exports.mainpage = async (req, res) => {
    console.log('get mainpage');
    Content.findAll({}).then((data) => {
        res.render('board/main', {
            contents: data,
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
};

//게시글 업로드 페이지
exports.uploadpage = async (req, res) => {
    console.log('get uploadpage');
    const taginfo = await Tag.findAll({});
    res.render('board/upload', {
        tags: taginfo,
        fail: false, //업로드 실패여부???
    });
};

//게시글 보기 (댓글 출력)
exports.contentRead = async (req, res) => {
    console.log('get content');
    var content = await Content.findOne({
        where: { id: req.params.contentid },
    });
    var conTag = await Content.findOne({
        where: { id: req.params.contentid },
        include: [{
            model: Tag,
        }]
    });
    var comment = await Comment.findAll({
        where: { contentid: req.params.contentid },
    });

    var jconTag = JSON.stringify(conTag, null, 2);
    var tags = JSON.parse(jconTag);

    var jcomment = JSON.stringify(comment, null, 2);
    var comments = JSON.parse(jcomment);
    res.render('board/content', {
        content: content,
        conTag: tags,
        comment: comments,
    });
};

//게시글 수정페이지 접근을 위한 PW검사
exports.contentCheck = async (req, res) => {
    console.log('content pw check');
    let { password } = req.body;
    var content = await Content.findOne({
        where: { id: req.params.contentid },
    });
    console.log(content.password);
    console.log(password);
    if (content.password == password) {
        return res.json({
            pwcheck: true,
            url: `/board/edit/${content.id}`,
        });
    } else {
        return res.json({
            pwcheck: false,
        });
    }
};

//게시글 수정페이지
exports.contentEdit = async (req, res) => {
    console.log('edit content');
    var content = await Content.findOne({
        where: { id: req.params.contentid },
        include: [{
            model: Tag,
        }]
    });
    var taginfo = await Tag.findAll({});
    var jcontent = JSON.stringify(content, null, 2);
    var content = JSON.parse(jcontent);
    res.render('board/edit', {
        content: content,
        allTag: taginfo,
    });

};

//게시글 업로드 O
exports.upload = async (req, res) => {
    console.log('post upload');
    var imgfile = req.file;
    let { title, content, tags, creator, password } = req.body;
    if (imgfile == undefined) {
        imgfile = { file_name: null, file_path: null };
    };
    if (title == '') { //제목, 내용 없이 제출시 alert과 리다이렉트
        res.send("<script>alert('제목 필수!');window.location.href='http://15.164.123.188:3000/board/upload';</script>");
    }
    else if (content == '') {
        res.send("<script>alert('내용 필수!');window.location.href='http://15.164.123.188:3000/board/upload';</script>");
    }
    else {
        Content.create({
            title: title,
            content: content,
            creator: creator,
            password: password,
            file_name: imgfile.filename,
            file_path: imgfile.path
        }).then((data) => {//태그 존재시 추가
            if (tags) {//tags => [ 태그id, 태그id, ...] 형태
                tags = Array.from(tags);
                var contentid = data.id;
                tags.forEach(tag => {
                    contenttag.create({
                        ContentId: contentid,
                        TagId: tag
                    });
                });
            };
        }).then(() => {
            res.redirect('/board');
        }).catch((err) => {
            return res.status(500).json({ err });
        });
    };
};

//게시글 삭제
exports.contentDelete = async (req, res) => {
    console.log('del content');
    Content.findOne({ where: { id: req.params.contentid } })
        .then((data) => {
            var file_name = data.file_name;
            if (file_name != null) {
                fs.unlinkSync('/home/ubuntu/web_pg/web_TermProject/img_files' + file_name);
                console.log("image delete");
            };
            Content.destroy({ where: { id: req.params.contentid } });
            console.log("content delete");
        }).then(() => {
            res.redirect('/board');
            console.log("delete success");
        }).catch((err) => {
            return res.status(500).json({ err });
        });
};

//게시글 수정
exports.contentUpdate = async (req, res) => {
    console.log('update content');
    let { title, content, tags } = req.body;
    var id = req.params.contentid;
    await contenttag.destroy({
        where: { contentId: id },
    });
    await Content.update({
        title: title,
        content: content,
    }, {
        where: { id: id },
    }).then((data) => {
        if (tags) {//tags => [ 태그id, 태그id, ...] 형태
            tags = Array.from(tags);
            tags.forEach(tag => {
                contenttag.create({
                    ContentId: id,
                    TagId: tag
                });
            });
        };
    }).then(() => {
        res.redirect(`/board/content/${id}`);
    }).catch((err) => {
        return res.status(500).json({ err });
    });
};