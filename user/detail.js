let id = JSON.parse(localStorage.getItem("pro_id"));

// let href = location.href;
// console.log(href.split("=")[1]);
// let id = href.split("id=")[1]

if (id > -1) {
    let products = JSON.parse(localStorage.getItem("products"))
    let proDetail = products.find(e => e.product_id == id);
    // console.log("==> id: ", proDetail.product_id, "detail: ", proDetail);
    // lisst anh phụ
    // let listImg = proDetail.image.reduce((str, imgUrl) => str + `<img data-imgbigurl="${imgUrl}" alt="#">`, "");
    // hien thi chi tiet ra man hinh
    let stringHTML = `
    <div class="detail_img">
            <figure>
                <img src="/ảnh/${proDetail.image}" alt="">
            </figure>
        </div>

        <div class="detail_info">
            <h2>${proDetail.name}</h2>
            <hr>
            <h3>${proDetail.unit_price} VNĐ</h3>
            <h4>Thông tin sản phẩm:</h4>
            <p>${proDetail.description}</p>

            <div class="count_box">
                <input type="number" name="count" id="count" min="0" value="1">
                <button type="button" onclick="addToCart(${proDetail.product_id})"><i class="bi bi-cart2"></i> ADD TO CART</button>
            </div>

            <div class="detail_bottom">
                <div class="share">
                    <span>Share</span>
                    <i class="fa-brands fa-facebook"></i>
                    <i class="fa-brands fa-instagram"></i>
                    <i class="fa-brands fa-twitter"></i>
                </div>
                <div class="policy">
                    <p>
                        <i class="fa-solid fa-lock"></i>
                        Security policy
                    </p>
                    <p>
                        <i class="fa-solid fa-truck"></i>
                        Delivery policy
                    </p>
                    <p>
                        <i class="fa-solid fa-box"></i>
                        Return policy
                    </p>
                </div>
            </div>
        </div>
    `

    document.querySelector(".product-detail").innerHTML = stringHTML;
} else {
    location.href = "index.html"
}

// ${ proDetail.product_id }