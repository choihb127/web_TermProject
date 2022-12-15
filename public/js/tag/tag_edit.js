//src/public/js/tag/tag_edit.js
"use strict";

const newname = document.getElementById('newname');
document.getElementById('btn').addEventListener('click', tagedit);

function tagedit() {
    console.log('js in')
    let urlStr = window.location.href;
    urlStr = urlStr.replace('?', '');
    let tagid = urlStr.split('/');
    const req = {
        newname: newname.value,
    };
    console.log(req);
    fetch(`/tag/update/${tagid[5]}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    }).then((res) => res.json()) // 백엔드에서 받은 res(promis)
        .then((res) => {
            console.log(res);
            if (res.success) { // 백엔드에서 받은 res의 success값이 true일 때 = 로그인 성공일 때
                console.log('change tagname');
                location.href = '/tag'; // 루트경로로 이동
            };
        })
        .catch((err) => { // 에러발생시 구문
            return res.status(500).json({ err });
        });
};