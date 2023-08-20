// dổ ra danh sách danh mục
let categories = JSON.parse(localStorage.getItem("categories")) || [];
console.log(categories);
let str = `<button type="button" onclick='findListProductByCategory()'>All</button>`;
for (let i = 0; i < categories.length; i++) {
    const element = categories[i];
    str += `<button type="button" onclick="findListProductByCategory(${element.category_id})">${element.name}</button>`
}

document.querySelector(".box-choose").innerHTML = str;

// xem chi tiet sp
function showProductDetail(id) {
    // sessionStorage.setItem("pro_id", id);
    localStorage.setItem("pro_id", JSON.stringify(id))
    location.href = `/user/detail.html`;
}
// lọc danh sách sản phẩm theo danh mục 

function findListProductByCategory(idCat = 0) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let listProduct;
    if (idCat === 0) {
        //  lấy tất cả
        listProduct = products;
    } else {
        // lấy theo từng danh mục
        listProduct = products.filter(product => product.category_id == idCat)
    }

    let str = "";
    for (let i = 0; i < listProduct.length; i++) {
        const element = listProduct[i];
        str += `<div class="row">
                    <div class="card" style="width: 18rem;">
                        <img src="/ảnh/${element.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${element.name}</h5>
                            <p class="card-text">${element.unit_price}VNĐ</p>
                            <a href="#" onclick="showProductDetail(${element.product_id})" class="btn btn-primary">Add to cart</a>
                        </div>
                    </div>
                </div>`
    }
    document.querySelector('.product').innerHTML = str;
}
findListProductByCategory();

