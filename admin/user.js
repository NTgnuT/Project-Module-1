let users = JSON.parse(localStorage.getItem("users")) || [];

function showUser(getItem = users) {
    let str = ''
    for (let i = 0; i < getItem.length; i++) {
        const element = getItem[i];
        str += `<tr>
                <td>${element.user_id}</td>
                <td>${element.username}</td>
                <td>${element.full_name}</td>
                <td>${element.email}</td>
                <td>${element.role}</td>
                <td><button type="button" class="train" onclick="clickUpdate(${element.user_id})">
                        <i class="fa-solid fa-wrench"></i>
                        Sửa
                    </button></td>
                <td><button type="button" class="delete" onclick="deleteUser(${element.user_id})">
                        <i class="fa-solid fa-trash"></i>
                        Xóa
                    </button></td>
            </tr>`
    }
    document.getElementById('list').innerHTML = str;
}
showUser();

const deleteUser = (id) => {
    if (confirm("bạn có chắc chắn muốn xóa người dùng này không?")) {
        let indexDelete = users.findIndex(p => p.id === id);
        users.splice(indexDelete, 1);
        localStorage.setItem("users", JSON.stringify(users));
        location.reload();
    }
}

function clickUpdate(id) {
    const index = users.findIndex(user => user.user_id == id);

    if (index == -1) {
        alert("Không tìm thấy User!");
    } else {
        if (users[index].role === "USER") {
            users[index].role = "admin";
        } else {
            users[index].role = "USER";
        }
        localStorage.setItem("users", JSON.stringify(users));
        showUser();
    }
}

// chức năng tìm kiếm 
const handleSearch = () => {
    // lấy ra được chuỗi tìm kiếm 
    let name = document.getElementById("search").value
    // console.log(name);
    let usersSearch = users.filter(user => user.username.toLowerCase().includes(name.toLowerCase()))
    showUser(usersSearch)
}

// tính toán tổng số trang ;
let totalUser = users.length; // tổng số sp = 0?
let count = 5;// số sp trên 1 trang
let pageCurrent = 0;
let totalPage = Math.ceil(totalUser / count); // tổng số trang
// console.log(totalPage); 

// đổ ra giao diện
let showPagination = () => {

    let links = "";
    // console.log("totalPage", totalPage);
    for (let i = 0; i < totalPage; i++) {
        links += `<li onclick="handlePagination(${i})"><a href="#">${i + 1}</a></li>`;
    }
    document.querySelector(".pagination").innerHTML = links
}
// showPagination();

// phân trang  : số trang hiện tại / số phần tử trên 1 trang
let handlePagination = (page = 0) => {
    pageCurrent = page
    // products.sort((a, b) => b.product_id - a.product_id);
    let productPaginate = users.filter((p, index) => (index >= (pageCurrent * count) && index < (pageCurrent + 1) * count))
    showUser(productPaginate)
    showPagination()
}

handlePagination(0);

