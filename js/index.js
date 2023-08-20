// lấy ra tài khoản đăng nhập hiện tại
let userLogin = JSON.parse(sessionStorage.getItem("userLogin"));
// lấy ra vị trí cần chèn tên và avatar
let divs = document.getElementsByClassName("account");
// kiểm tra sự tồn tại
if (userLogin != null) { // nếu có tài khoản đăng nhập
  for (let i = 0; i < divs.length; i++) {
    const element = divs[i];
    element.innerHTML = `<div class="dropdown">
                        <div class="dropbtn">
                            <img src="${userLogin.avatar}" alt="">
                            <p>${userLogin.username}</p>
                        </div>
                        <div id="myDropdown" class="dropdown-content">
                            <a href="">My Profile</a>
                            <a href="#" onclick="handleLogout()">Logout</a>
                        </div>
                    </div>`
  }
} else { // chưa có tài khoản đăng nhập
  for (let i = 0; i < divs.length; i++) {
    const element = divs[i];
    element.innerHTML = `<i class="fa-solid fa-user"></i>
                            <a href="/login.html">Login</a>`
  }
}


const handleLogout = () => {
  // trước khi đăng xuất thì lưu giỏ hàng vào local
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // tìm vị trí của userlogin
  let userLoginIndex = users.findIndex((user) => user.user_id == userLogin.user_id);

  users[userLoginIndex] = userLogin;
  // Lưu lại vào localStorage
  localStorage.setItem("users", JSON.stringify(users))

  // thực hiện đăng xuất tài khoản
  sessionStorage.removeItem("userLogin");
  // load lại trang
  if (userLogin.role == 'admin') {
    location.href = '/index.html'
  } else {
    location.reload();
  }
}