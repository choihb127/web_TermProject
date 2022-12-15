// src/controllers/comment.js
"use strict"

const { Comment, Content, Tag } = require('../utils/connect');
const model = require('../utils/connect');
const contenttag = model.sequelize.models.contentTag;

//댓글작성 
exports.commentUp = async (req, res) => {
    console.log('comment upload');
    const contentid = req.params.contentid;
    let { content, creator, password } = req.body;
    Comment.create({
        content: content,
        creator: creator,
        password: password,
        contentid: parseInt(contentid),
    }).then(() => {
        return res.json({
            success: true,
            url: `/board/content/${contentid}`,
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
};

//댓글삭제
exports.commentDel = async (req, res) => {
    console.log('comment delete');
    const commentid = req.params.commentid;
    let { comment_password, contentid } = req.body;
    var comment = await Comment.findOne({
        where: { id: commentid },
    });
    //console.log(comment.password);
    if (comment_password !== comment.password) {
        console.log('password error');
        res.send("<script>alert('비밀번호 오류!');window.location.href=document.referrer;</script>");
    } else {
        console.log('destroy');
        Comment.destroy({
            where: {
                id: parseInt(commentid),
            },
        }).then(() => {
            res.redirect(`/board/content/${contentid}`);
        }).catch((err) => {
            return res.status(500).json({ err });
        });
    };
};
