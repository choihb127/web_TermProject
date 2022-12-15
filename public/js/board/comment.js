//src/public/js/board/comment.js
"use strict";

const creator = document.getElementById('commentCreator');
const commentPassword = document.getElementById('commentPassword');
const content = document.getElementById('commentContent');
document.getElementById('commentbtn').addEventListener('click', addcomment);

var commentid = document.getElementsByName('commentid');

//document.getElementById('commentDel').addEventListener('click', delcomment);

function addcomment() {
    let urlStr = window.location.href;
    urlStr = urlStr.replace('?', '');
    let contentid = urlStr.split('/');
    if (creator.value == '') {
        alert('작성자 필수!');
    } else if (commentPassword.value == '') {
        alert('비밀번호 필수!');
    } else if (content.value == '') {
        alert('내용 필수!');
    } else {
        const req = {
            creator: creator.value,
            password: commentPassword.value,
            content: content.value,
        };
        fetch(`/board/commentUp/${contentid[5]}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req),
        }).then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    location.href = res.url;
                };
            }).catch((err) => { // 에러발생시 구문
                return res.status(500).json({ err });
            });
    };
};

function delcomment() {
    let commentList = document.getElementById("commentList");
    //console.log(commentList);
    for (let i = 0; i < commentList.rows.length; i++) {
        if (i % 2 == 0) {
            commentList.rows[i].cells[1].onclick = () => {
                var comment_password = document.getElementsByName('comment_password')[i];
                console.log(comment_password);
                console.log(i);
            }
        }

    }

    /*
        let urlStr = window.location.href;
        urlStr = urlStr.replace('?', '');
        let contentid = urlStr.split('/');
        const req = {
            password: comment_password,
            contentid: contentid[5],
        };

    console.log(req);
    console.log(commentid.value);
    */
    /*fetch(`http://localhost:3000/board/commentDel/${commentid.name}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
}).then((res) => res.json())
    .then((res) => {
        if (res.success) {
            location.href = res.url;
        } else {
            alert('비밀번호 오류!');
        };
    }).catch((err) => { // 에러발생시 구문
        return res.status(500).json({ err });
    }); */
};