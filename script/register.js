function changeNickname(e) {
    if (e.value === "") { return; }
    $.ajax({
        url: '/register/nicknameCheck?nickname=' + e.value,
        type: 'get',
        success: function(data) {
            let nickname = document.getElementById("nickname-check-i");
            nickname.className = data.res == 1 ? "fa fa-check" : "fa fa-times";
        },
        error: function() {
            console.log("Nickname check failed");
        }
    })
}


function checkId() {
    let idcheckButton = document.getElementById("id-check-button");
    let e = document.getElementById("id-check-input");
    if (e.value === "" || idcheckButton.disabled === true) { return; }
    $.ajax({
        url: '/register/idCheck?id=' + e.value,
        type: 'get',
        success: function(data) {
            let idcheck = document.getElementById("id-check-i");
            idcheck.className = data.res == 1 ? "fa fa-check" : "fa fa-times";
            if (data.res === 1) {
                document.getElementById("id-check-button").disabled = true;
                document.getElementById("id-check-input").disabled = true;
            }
        },
        error: function() {
            console.log("Id check failed");
        }
    });
}


function checkPw() {
    let e = document.getElementById("pw-check-input");
    let pw = document.getElementById("pw-input");
    let pw_i = document.getElementById("pw-check-i");
    if (e.value !== pw.value) {
        pw_i.className = "fa fa-times";
    }
    else {
        pw_i.className = "fa fa-check";
    }
}


function formclear() {
    let clearButton = document.getElementById("register-button-clear");
    let req = confirm("모든 항목을 지우시겠습니까?");
    if (req === false) { return; }
    let form = document.getElementById("register-form");
    for(let i = 0; i < form.length; i++) {
        form[i].value = "";
        form[i].disabled = false;
    }
    let nickname = document.getElementById("nickname-check-i")
    nickname.className = "";
    let idcheck = document.getElementById("id-check-i");
    idcheck.className = "";
    let pwcheck = document.getElementById("pw-check-i");
    pwcheck.className = "";
}

function formsubmit() {
    let form = document.getElementById("register-form");
    let check = 0;
    for(let i = 0; i < form.length; i++) {
        if (form[i].tagName === "INPUT" && form[i].value === ""){
            console.log(form[i]);
            check = 1;
            break;
        }
    }
    let nickname = document.getElementById("nickname-check-i")
    if (nickname.className !== "fa fa-check") { check = 2; };
    let idcheck = document.getElementById("id-check-i");
    if (idcheck.className !== "fa fa-check") { check = 2; };
    let pwcheck = document.getElementById("pw-check-i");
    if (pwcheck.className !== "fa fa-check") { check = 3; }
    if (check === 1){
        alert("모든 항목을 정확히 입력해주세요.");
        return;
    }
    else if (check == 2) {
        alert("중복 체크를 확인해주세요.");
        return;
    }
    else if (check == 3) {
        alert("비밀번호가 일치하지 않습니다.");
    }
    else {
        // 요청
        let id_input = document.getElementById("id-check-input");
        id_input.disabled = false;
        form.submit();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    let idcheckButton = document.getElementById("id-check-button");
    idcheckButton.addEventListener('click', checkId);
    let clearButton = document.getElementById("register-button-clear");
    clearButton.addEventListener('click', formclear);
    let submitButton = document.getElementById("register-button-submit");
    submitButton.addEventListener('click', formsubmit);
});
