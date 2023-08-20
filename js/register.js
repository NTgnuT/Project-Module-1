// lấy ra danh sách user 
let users = JSON.parse(localStorage.getItem('users')) || [];

let handleLogin = () => {
    let fullName = document.getElementById('fullName').value;
    let email = document.getElementById('email').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('pass').value;
    let passwordConfirm = document.getElementById('confirmPass').value;

    // xác thực dữ liệu 
    if (username.trim() === '') {
        document.getElementById("usernameError").innerText = "Không được để trống";
        return;
    } else if (users.findIndex((value) => value.username === username) > -1) {
        document.getElementById("usernameError").innerText = "Đã tồn tại tài khoản này, vui lòng nhập tên khác";
        return;
    } else {
        document.getElementById("usernameError").innerText = "";
    }
    // full name  : không để trống
    if (fullName.trim() === "") {
        document.getElementById("fullNameError").innerText = "Không được để trống";
        return;
    } else {
        document.getElementById("fullNameError").innerText = "";
    }
    // email
    if (email.trim() === "") {
        document.getElementById("emailError").innerText = "Không được để trống";
        return;
    } else if (!validateEmail(email)) {
        document.getElementById("emailError").innerText = "Không đúng định dạng email";
        return;
    } else if (users.findIndex((value) => value.email === email) > -1) {
        document.getElementById("emailError").innerText = "Đã tồn tại email này, vui lòng nhập email khác";
        return;
    } else {
        document.getElementById("emailError").innerText = "";
    }
    //password
    if (password.trim() === "") {
        document.getElementById("passwordError").innerText = "Không được để trống";
        return;
    } else if (!validatePassword(password)) {
        document.getElementById("passwordError").innerText = "Mật khẩu phải ít nhất 6 kí tự bao gồm 1 chữ số, 1 kí tự đặc biệt";
        return;
    } else {
        document.getElementById("passwordError").innerText = "";
    }
    // kiểm tra xác nhận mật khẩu
    if (password !== passwordConfirm) {
        document.getElementById("confirmPassError").innerText = "Mật khẩu không trùng khớp";
        return;
    }
    // thực hiện đăng kí : tạo đối tượng user
    let newUser = {
        user_id: getNewId(),
        username: username,
        email: email,
        full_name: fullName,
        password: password,
        role: "USER",
        avatar: "ảnh/avatar.jpg",
        cart: []
    }
    // thêm newUser vào mảng
    users = [...users, newUser];
    // lưu lên local
    localStorage.setItem("users", JSON.stringify(users));
    // chuyển trang tự động
    location.href = "/login.html";
}


// hàm validate email
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}
// hàm validate pass 
const validatePassword = (pass) => {
    return String(pass)
        .toLowerCase()
        .match(/^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?@ "]).*$/);
}
// hàm tự tăng id
const getNewId = () => {
    let idMax = 0;
    for (let i = 0; i < users.length; i++) {
        const u = users[i];
        if (u.user_id > idMax) {
            idMax = u.user_id;
        }
    }
    return idMax + 1;
}

let backLogin = () => {
    location.href = '/login.html'
}