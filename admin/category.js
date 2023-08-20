// let categories = [];



let categories = JSON.parse(localStorage.getItem("categories")) || []
function showCateglory(getItem = categories) {
    let string = '';
    for (i = 0; i < getItem.length; i++) {
        let element = getItem[i];
        string += `<tr>
                    <td>${element.category_id}</td>
                    <td>${element.name}</td>
                    <td>${element.description}</td>
                    <td><button type="button" class="train" onclick="getCateglory(${element.category_id})">
                        <i class="fa-solid fa-wrench"></i>
                        Sửa
                    </button></td>
                    <td><button type="button" class="delete" onclick="DeleteCateglories(${element.category_id})">
                        <i class="fa-solid fa-trash"></i>
                        Xóa
                    </button></td>
                </tr>`
    }
    document.getElementById('list').innerHTML = string;
}
showCateglory();

// thêm mới 
function newCateglory() {
    categories = JSON.parse(localStorage.getItem("categories")) || [];

    // let categories_id = newId();
    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let error = '';

    if (name.trim() == '') {
        error = 'Tên danh mực không được để trống'
        document.getElementById('warn_box').innerHTML = error;
        return;
    }

    let newCateglory = {
        category_id: newId(),
        name: name,
        description: description,
    }

    categories = [...categories, newCateglory]
    localStorage.setItem('categories', JSON.stringify(categories))
    // showCateglory();
    location.reload();
}

// xóa phần tử
const DeleteCateglories = (id) => {
    if (confirm("bạn có chắc chắn muốn xóa sản phẩm này không?")) {
        let indexDelete = categories.findIndex(p => p.category_id == id);
        categories.splice(indexDelete, 1);
        localStorage.setItem("categories", JSON.stringify(categories));
        showCateglory();
    }
}

//chức năng sửa
function getCateglory(id) {
    let getIdEdit = categories.find(e => e.category_id == id)

    document.getElementById('category_id').value = getIdEdit.category_id;
    document.getElementById('name').value = getIdEdit.name;
    document.getElementById('description').value = getIdEdit.description;
}

function updateCateglory() {
    let category_id = document.getElementById('category_id').value;
    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;

    let indexUpdate = categories.findIndex(p => p.category_id == category_id);
    categories[indexUpdate] = { ...categories[indexUpdate], name, description, category_id }

    localStorage.setItem("categories", JSON.stringify(categories));
    showCateglory();
}

function newId() {
    let idMax = 0;
    for (let i = 0; i < categories.length; i++) {
        const element = categories[i];
        if (idMax < element.category_id) {
            idMax = element.category_id;
        }
    }
    return idMax + 1;
}

// chức năng tìm kiếm 
const handleSearch = () => {
    // lấy ra được chuỗi tìm kiếm 
    let name = document.getElementById("search").value
    // console.log(name);
    let categoriesSearch = categories.filter(category => category.name.toLowerCase().includes(name.toLowerCase()))
    showCateglory(categoriesSearch)
}

// tính toán tổng số trang ;
let totalCategory = categories.length; // tổng số sp = 0?
let count = 10;// số sp trên 1 trang
let pageCurrent = 0;
let totalPage = Math.ceil(totalCategory / count); // tổng số trang
// console.log(totalPage); 

// đổ ra giao diện
let showPagination = () => {

    let links = "";
    // console.log("totalPage", totalPage);
    for (let i = 0; i < totalPage; i++) {
        links += `<li class='box-directional' onclick="handlePagination(${i})"><a href="#">${i + 1}</a></li>`;
    }
    document.querySelector(".pagination").innerHTML = links
}
// showPagination();

// phân trang  : số trang hiện tại / số phần tử trên 1 trang
let handlePagination = (page = 0) => {
    pageCurrent = page
    // products.sort((a, b) => b.product_id - a.product_id);
    let productPaginate = categories.filter((p, index) => (index >= (pageCurrent * count) && index < (pageCurrent + 1) * count))
    showCateglory(productPaginate)
    showPagination()
}

handlePagination(0);

