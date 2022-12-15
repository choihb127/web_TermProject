//src/public/js/tag.js
"use strict";
//DOM= 문서객체모델. 인터페이스. html에 데이터를 받아옴
//document 라이브러리 이용

const tag = document.getElementById('tag') // html id 선택자
document.getElementById('btn').addEventListener('click', tagmake);

const changevalue = (target) => { //select문 관련
    const value = target.value;
}

function tagmake() {
    //evt.preventDafault(); //post 이벤트 중지
    //console.log(userid.value);
    const req = {
        tagname: tag.value,
    };
    console.log(req);
    fetch('/tag/make', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    }).then((res) => res.json()) // 백엔드에서 받은 res(promis)
        .then((res) => {
            console.log(res);
            if (res.success) { // 백엔드에서 받은 res의 success값이 true일 때 = 태그생성 성공
                console.log('make new tag');
                location.href = '/tag'; // 태그페이지 이동
            };
        })
        .catch((err) => { // 에러발생시 구문
            return res.status(500).json({ err });
        });
}