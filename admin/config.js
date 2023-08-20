let users = JSON.parse(localStorage.getItem('users')) || [];

let admin = {
    user_id: 0,
    username: "admin123",
    email: null,
    full_name: null,
    password: "admin123",
    role: "ADMIN",
    avatar: "avatar.jpg",
    cart: null
}
users = [...users, admin]
localStorage.setItem("users", JSON.stringify(users));