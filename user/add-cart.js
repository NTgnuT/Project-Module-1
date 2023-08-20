// thêm sản phẩm vào giỏ hàng
const addToCart = (idProduct) => {

    // console.log("==> id: ", idPro);
    let userLogin = JSON.parse(sessionStorage.getItem("userLogin"));
    if (userLogin == null) {
        alert("Vui lòng đăng nhập đề xem giỏ hàng");
        location.href = "/login.html";
    }
    // lấy ra số lượng mua
    let quantity = +document.querySelector(".count_box > input").value;

    // nếu sp đã tồn tại trong giỏ hàng thì tăng số lượng
    let indexCartItem = userLogin.cart.findIndex(
        (cartIt) => cartIt.idProduct == idProduct
    );
    // console.log(indexCartItem);
    if (indexCartItem > -1) {
        // đã tồn tại
        userLogin.cart[indexCartItem].quantity += quantity;
    } else {
        // chưa tồn tại , thêm mới
        let cartItem = {
            idProduct: idProduct,
            quantity,
        };
        // console.log("==>", cartItem);
        // document.getElementById("cart-table").innerHTML += 1;
        userLogin.cart.push(cartItem);
    }
    sessionStorage.setItem("userLogin", JSON.stringify(userLogin));
    location.href = "/user/cart.html";
};


// danh sách sp
let products = JSON.parse(localStorage.getItem("products")) || [];

// hiển thị danh sách giỏ hàng

const showCart = () => {
    let total = 0;
    let listCartItem = userLogin.cart.reduce((string, ct, index) => {
        // lấy thông tin sp theo id
        let product = products.find((p) => p.product_id == ct.idProduct);
        // console.log(product);

        total += product.unit_price * ct.quantity;
        return (
            string +
            `<tr>
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td><img src="/ảnh/${product.image}" width="100" height="100" style="object-fit: cover;" alt=""></td>
                <td>${(product.unit_price * 1000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                <td><input id="quantity_${ct.idProduct}" type="number" min="1" value="${ct.quantity}" /></td>
                <td>${(product.unit_price * ct.quantity * 1000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                <td>
                    <button type="button" class="btn-Edit" onclick="handleUpdate(${ct.idProduct})">
                        <i class="fa-solid fa-wrench"></i>
                        Edit
                    </button>
                </td>
                <td>
                    <button type="button" class="btn-Delete" onclick="handleDelete(${ct.idProduct})">
                        <i class="fa-solid fa-trash"></i>
                        Delete
                    </button>
                </td>
            </tr>`
        );
    }, "");

    document.getElementById("cart-table").innerHTML = listCartItem;
    document.querySelector("tfoot").innerHTML = ` <tr>
  <td colspan="8" style="text-align: center;">Tổng tiền : ${(total * 1000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>  
</tr>`;


};

showCart();


// // Xử lí xóa
const handleDelete = (idProduct) => {
    userLogin = JSON.parse(sessionStorage.getItem("userLogin"));
    if (confirm("Are you sure you want to delete")) {
        let indexDelete = userLogin.cart.findIndex(e => e.idProduct == idProduct)
        userLogin.cart.splice(indexDelete, 1);
        sessionStorage.setItem("userLogin", JSON.stringify(userLogin))
        showCart();
    }
}

// // hàm xử lí cập nhật
const handleUpdate = (idPro) => {
    console.log("==> id: ", idPro);
    // lấy ra số lượng cần cập nhật
    let quantity = +document.getElementById(`quantity_${idPro}`).value
    // Láy ra vị trí cần cập nhật
    let indexCartItem = userLogin.cart.findIndex(
        (cartIt) => cartIt.idProduct == idPro
    );
    userLogin.cart[indexCartItem].quantity = quantity;
    sessionStorage.setItem("userLogin", JSON.stringify(userLogin))
    showCart();
}


let orders = JSON.parse(localStorage.getItem("orders")) || []

// tạo hóa đơn 
const handleCheckOut = () => {
    let order_id = getNewId(); // id hóa đơn tự tăng
    let user_id = userLogin.user_id; // id người dùng đang đăng nhập

    let orders_details = []; //  danh sách chi tiết hóa đơn
    let total_price = 0; // tổng tiền
    for (let i = 0; i < userLogin.cart.length; i++) {
        const element = userLogin.cart[i];
        // element {}

        //  tìm sản phẩm theo id 
        // kiểm tra xem id sản phẩm có giống với id trong giỏ hàng 
        let product = products.find(pro => pro.product_id == element.idProduct)
        //tính tổn tiền
        total_price += product.unit_price * element.quantity;
        // mỗi spp trong giỏ hàng sẽ là 1 chi tiết hoa đơn tỏng hóa đơn
        let order_detail = {
            product_id: element.idProduct,
            product_name: product.name,
            unit_price: product.unit_price,
            quantity: element.quantity
        }
        orders_details.push(order_detail);
    }


    let order_at = new Date().toLocaleString();
    let status = 1;
    let note = document.getElementById("note").value;

    // tạo hóa đơn mới
    let newOrder = {
        order_id,
        user_id,
        order_at,
        total_price,
        status,
        note,
        orders_details
    }


    orders.push(newOrder);
    // lưu vào local
    localStorage.setItem("orders", JSON.stringify(orders));
    // reset giỏ hàng
    userLogin.cart = [];
    sessionStorage.setItem("userLogin", JSON.stringify(userLogin));

    // trước khi đăng xuất thì lưu giỏ hàng vào local
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // tìm vị trí của userlogin
    let userLoginIndex = users.findIndex((user) => user.user_id == userLogin.user_id);

    users[userLoginIndex] = userLogin;
    // Lưu lại vào localStorage
    localStorage.setItem("users", JSON.stringify(users))
    alert("Đơn hàng đã được đặt")
    location.reload();
}
// tạo id tự tăng  
const getNewId = () => {
    let idMax = 0;
    for (let i = 0; i < orders.length; i++) {
        const element = orders[i];
        if (idMax < element.order_id) {
            idMax = element.order_id;
        }
    }
    return idMax + 1;
}

function keepBuying() {
    location.href = './product-user.html';
}