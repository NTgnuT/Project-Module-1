// lấy ra danh sách sp
let products = JSON.parse(localStorage.getItem("products")) || [];
// let products = [];



// lấy ra danh sách danh mục
let categories = [
    { category_id: 1, name: "Juice" },
    { category_id: 2, name: "Smoothie" },
    // { category_id: 3, name: "Trang sức" },
];

// Tìm kiếm tên danh mục theo id danh mục
const getCategoryNameByCategoryId = (id) => {
    let rs = categories.find(cat => cat.category_id == id)
    return rs.name;
}

// đổ danh sách danh mục ra 
let string1 = "";
for (let i = 0; i < categories.length; i++) {
    const element = categories[i];
    string1 += `<option value="${element.category_id}">${element.name}</option>`;
}
document.getElementById("category_id").innerHTML = string1;


//thêm ảnh vào sản phẩm
let fileImageGlobal = null;

document.getElementById("image").addEventListener("change", function (e) {
    document.getElementById("img_product").src = `../ảnh/${e.target.files[0].name}`
    fileImageGlobal = e.target.files[0].name
})

// hàm id tự tăng
let getNewId = () => {
    let idMax = 0;
    for (let i = 0; i < products.length; i++) {
        const element = products[i];
        if (idMax < element.product_id) {
            idMax = element.product_id;
        }
    }
    return idMax + 1;
}


// tính toán tổng số trang ;
let totalProduct = products.length; // tổng số sp = 0?
let count = 5;// số sp trên 1 trang
let pageCurrent = 0;
let totalPage = Math.ceil(totalProduct / count); // tổng số trang
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
    products.sort((a, b) => b.product_id - a.product_id);
    let productPaginate = products.filter((p, index) => (index >= (pageCurrent * count) && index < (pageCurrent + 1) * count))
    showListProduct(productPaginate)
    showPagination()
}



products = JSON.parse(localStorage.getItem("products")) || []
let showListProduct = function (getItem = products) {
    getItem.sort((a, b) => b.product_id - a.product_id);
    let string = '';
    for (i = 0; i < getItem.length; i++) {
        let element = getItem[i]
        string += `<tr>
            <td>${Number(element.product_id)}</td>
            <td><img src="../ảnh/${element.image}" alt="" width="100px"></td>
            <td>${element.name}</td>
            <td>${getCategoryNameByCategoryId(element.category_id)}</td>
            <td>${element.description.substring(0, 30)}</td>
            <td>${element.unit_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
            <td>${element.stock}</td>
            <td><button type="button" class="train" onclick="showProductEdit(${element.product_id})">
                <i class="fa-solid fa-wrench"></i>
                Sửa
            </button></td>
            <td><button type="button" class="delete" onclick="handleDeleteProduct(${element.product_id})">
                <i class="fa-solid fa-trash"></i>
                Xóa
            </button></td>
        </tr>`
    }
    document.getElementById('list').innerHTML = string;
}
showListProduct();

// chức năng thêm mới
let handleAddNewProduct = () => {
    products = JSON.parse(localStorage.getItem("products")) || [];
    // lấy đươc toàn bộ dữ liệu của ô input
    // let product_id = getNewId();
    let name = document.getElementById("name").value;
    let image = fileImageGlobal;
    let category_id = Number(document.getElementById("category_id").value);
    let description = document.getElementById("description").value;
    let unit_price = document.getElementById("unit_price").value;
    let stock = document.getElementById("stock").value;
    let error = "";
    if (name.trim() == "") {
        error = "Tên không được để trống"
        document.getElementById("warn_box").innerHTML = error;
        return
    }

    if (unit_price <= 0) {
        error = "Đơn giá phải lớn hơn 0";
        document.getElementById("warn_box").innerHTML = error;
        return
    }
    if (stock <= 0) {
        error = "Số lượng phải lớn hơn 0";
        document.getElementById("warn_box").innerHTML = error;
        return
    }

    let newProduct = {
        product_id: getNewId(),
        image: image,
        name: name,
        category_id: category_id,
        description: description,
        unit_price: unit_price,
        stock: stock,
    }
    // thêm vào mảng
    products = [...products, newProduct];
    fileImageGlobal = null;
    localStorage.setItem("products", JSON.stringify(products));
    // showListProduct();
    location.reload();
}


// xóa phần tử
const handleDeleteProduct = (id) => {
    if (confirm("bạn có chắc chắn muốn xóa sản phẩm này không?")) {
        let indexDelete = products.findIndex(p => p.product_id === id);
        products.splice(indexDelete, 1);
        localStorage.setItem("products", JSON.stringify(products));
        location.reload();
    }
}

// chức năng sửa 
// lấy toàn bộ thông tin cũ và đổ ra modal
const showProductEdit = (id) => {
    let letEdit = products.find(e => e.product_id == id);
    // đổ toàn bộ dữ liệu ra forrm
    document.getElementById("product_id").value = letEdit.product_id;
    document.getElementById("name").value = letEdit.name;
    document.getElementById("unit_price").value = letEdit.unit_price;
    document.getElementById("stock").value = letEdit.stock;
    document.getElementById("description").value = letEdit.description;
    document.getElementById("category_id").value = letEdit.category_id;
    // document.getElementById("image").src = letEdit.image;
    fileImageGlobal = letEdit.image
    document.getElementById("img_product").src = `../ảnh/${letEdit.image}`
}



// chúc năng cập nhật lại và lưu thay dổi
const handleUpdateProduct = () => {
    // lấy đươc toàn bộ dữ liệu của ô input
    let product_id = document.getElementById("product_id").value;
    let name = document.getElementById("name").value;
    // let image = document.getElementById('image');
    image = fileImageGlobal;
    let description = document.getElementById("description").value;
    let unit_price = document.getElementById("unit_price").value;
    let stock = document.getElementById("stock").value;
    let category_id = document.getElementById("category_id").value;

    // lấy vị trí cần sửa
    let indexUpdate = products.findIndex(p => p.product_id == product_id);
    products[indexUpdate] = { ...products[indexUpdate], name, image, unit_price, stock, description, category_id, product_id }

    console.log(products[indexUpdate]);

    localStorage.setItem("products", JSON.stringify(products));
    fileImageGlobal = null
    // showListProduct();
    location.reload();
}

// chức năng tìm kiếm 
const handleSearch = () => {
    // lấy ra được chuỗi tìm kiếm 
    let name = document.getElementById("search").value
    // console.log(name);
    let productsSearch = products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()))
    showListProduct(productsSearch)
}

handlePagination(0);
