//src/public/js/board/content.js
"use strict";

const out_togle = document.getElementById('out_togle');
const hidden = document.getElementById('hidden');
const in_togle = document.getElementById('in_togle');
const password = document.getElementById('password');
document.getElementById('btn').addEventListener('click', checkPassword);

function showPassword() {
    if (hidden.style.display !== 'none') {
        hidden.style.display = 'none';
        out_togle.style.display = 'block';
    } else {
        hidden.style.display = 'block';
        out_togle.style.display = 'none';
    }
};

function checkPassword() {
    let urlStr = window.location.href;
    urlStr = urlStr.replace('?', '');
    let contentid = urlStr.split('/');
    const req = {
        password: password.value,
    };
    fetch(`/board/check/${contentid[5]}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    }).then((res) => res.json())
        .then((res) => {
            if (res.pwcheck) {
                location.href = res.url;
            } else {
                alert('비밀번호 오류!');
            }
        }).catch((err) => {
            return res.status(500).json({ err });
        })
};