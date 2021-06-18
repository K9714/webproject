function loadPost(data) {
    let nickname = document.getElementById("post-nickname");
    let date = document.getElementById("post-date");
    let title = document.getElementById("post-title");
    let post = document.getElementById("post-post");
    let recommand = document.getElementById("post-recommand");
    let coment = document.getElementById("post-coment");
    let no = document.getElementById("post-no");
    let image = document.getElementById("post-image");
    
    image.src = "image/" + data.image;
    no.innerHTML = data.no;
    nickname.innerHTML = data.nickname;
    date.innerHTML = dateParse((Date.now() - data.date) / 1000) + " 전";
    title.innerHTML = data.title;
    post.innerHTML = data.post;
    recommand.innerHTML = "추천 " + data.recommand;
    coment.innerHTML = "댓글 " + data.coment;
    let board = document.getElementById("board-content-coment-div");
    board.innerHTML = "";
    board.style.color = "#fff";
    for(let i = 0; i < data.coment; i++) {
        addComent(data.comentList[i]);
    }
}

function addComent(e) {
    let board = document.getElementById("board-content-coment-div");
    let article = document.createElement("article");
    let a = document.createElement("a");
    let img = document.createElement("img");
    let div = document.createElement("div");
    let h3 = document.createElement("h3");
    let time = document.createElement("time");
    let p = document.createElement("p");
    a.className = "board-content-read-small";
    img.src = "/image/" + e.image;
    img.className = "board-content-image-small";
    div.className = "board-content-profile-small";
    h3.className = "board-content-small";
    h3.innerHTML = e.nickname;
    time.className = "board-content-small";
    time.innerHTML = dateParse((Date.now() - e.date) / 1000) + " 전";
    p.innerHTML = e.post;

    div.appendChild(h3);
    div.appendChild(time);
    a.appendChild(img);
    a.appendChild(div);
    a.appendChild(p);
    article.appendChild(a);
    board.appendChild(article);
}

function writeComent() {
    let coment = document.getElementById("add-coment-input").value;
    let secret = document.getElementById("add-coment-checkbox").checked ? 1 : 0;
    let postno = $("#post-no").text();
    let data = {};
    data.coment = coment;
    data.secret = secret;
    data.postno = parseInt(postno);
    if (coment === "") { return; }
    $.ajax({
        url: '/writecoment/community',
        type: 'post',
        data: data,
        success: function(data) {
            if (data.res == 1) {
                alert("댓글을 작성했습니다.");
                $.ajax({
                    url: '/postpage/loadpost?no=' + postno,
                    type: 'get',
                    success: function(data) {
                        loadPost(data);
                    },
                    error: function() {
                        console.log("load post failed");
                    }
                });
            }
            else if (data.res == 2) {
                alert("로그인 후 이용해주세요.");
            }
            else {
                alert("댓글 작성에 실패했습니다.");
            }
        },
        error: function() {
            console.log("add comment failed");
        }
    })
}

function recommand() {
    let postno = $("#post-no").text();
    let data = {};
    data.no = postno;
    $.ajax({
        url: '/postpage/recommand',
        type: 'post',
        data: data,
        success: function(data) {
            if (data.res == 1) {
                alert("추천하였습니다.");
                $.ajax({
                    url: '/postpage/loadpost?no=' + postno,
                    type: 'get',
                    success: function(data) {
                        loadPost(data);
                    },
                    error: function() {
                        console.log("load post failed");
                    }
                });
            }
            else if (data.res == 2) {
                alert("로그인 후 이용해주세요.");
            }
            else {
                alert("추천에 실패했습니다.");
            }
        },
        error: function() {
            console.log("load post failed");
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    let idcheckButton = document.getElementById("add-coment-button");
    idcheckButton.addEventListener('click', writeComent);
});