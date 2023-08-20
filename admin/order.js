// hiển thị trạng thái theo mã trậng thái
const handleStatusCodeOrder = (statusCode) => {
  switch (statusCode) {
    case 1:
      return `<button type="button" class="btn btn-secondary">Chờ xác nhận ...</button>`;
    case 2:
      return `<button type="button" class="btn btn-success">Đã xác nhận</button>`;
    case 3:
      return `<button type="button" class="btn btn-danger">Đã hủy</button>`;
  }
};
// hiển thị toán bộ đơn hàng  theo thứ tự ngày gần nhất

// lấy   danh sách đơn hàng
let orders = JSON.parse(localStorage.getItem("orders")) || [];
const showOrders = (list = orders) => {
  // list.sort((a, b) => b.order_at.localeCompare(a.order_at));
  list.sort((a, b) => b.order_id - a.order_id);
  let string = list.reduce(
    (str, value) =>
      str +
      `<tr>
    <td>${value.order_id}</td>
    <td>${value.order_at}</td>
    <td>${(value.total_price * 1000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
    <td>${handleStatusCodeOrder(value.status)}</td>
    <td>
        <button type="button" onclick="showOrderDetail(${value.order_id})" class="btn btn-warning" 
        data-bs-toggle="modal" data-bs-target="#modalDetail">Detail</button>
    </td>  
</tr>`,
    ""
  );

  document.getElementById("orders").innerHTML = string;
};
showOrders();

// lấy danh sách người dùng
let users = JSON.parse(localStorage.getItem("users")) || [];

// hiển thị chi tiết đơn hàng
const showOrderDetail = (idOrder) => {
  let orderDetail = orders.find((order) => order.order_id == idOrder);
  //  lấy người dùng theo user_id
  let user = users.find((u) => u.user_id == orderDetail.user_id);
  // đổ ra danh sách đơn hàng chi tiết
  let str = orderDetail.orders_details.reduce(
    (prevStr, value) =>
      prevStr +
      `<tr>
    <td>${value.product_id}</td>
    <td>${value.product_name}</td>
    <td>${value.unit_price}</td>
    <td>${value.quantity}</td>
    <td>${(value.unit_price * value.quantity * 1000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
  </tr>`,
    ""
  );

  // hiển thị buton theo mã trạng thái
  let button =
    orderDetail.status == 1
      ? `<button type="button" class="btn btn-danger" data-bs-dismiss="modal" 
      onclick="handleDenieOrder(${orderDetail.order_id})">Từ chối</button>

        <button type="button" class="btn btn-success" onclick="handleAcceptOrder(${orderDetail.order_id})">Chấp nhận</button>`


      : `<button type="button" class="btn btn-info" data-bs-dismiss="modal">Đóng</button>`;

  let string = `
    <div class="modal-header">
            <h5 class="modal-title" id="modalDetailLabel">Chi tiết đơn hàng</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
    <div>
    <span>Số hóa đơn : ${orderDetail.order_id}</span>
    <p>Người đặt hàng : ${user.full_name}</p>
    <p>Thời gian đặt hàng : ${orderDetail.order_at}</p>
  </div>
  <h4>Chi tiết hóa đơn</h4>
  <table class="table" id="order-details">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Price</th>
        <th scope="col">Quantity</th>
        <th scope="col">Total Amount</th>
      </tr>
    </thead>
    <tbody>
     ${str}
    </tbody>
    <tfoot> 
      <td colspan="5">Tổng tiền : ${(orderDetail.total_price * 1000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </td>
    </tfoot>
  </table>
  </div>
          <div class="modal-footer">
            ${button}
          </div>`;

  document.querySelector(".modal-content").innerHTML = string;
};

// xác nhận đơn hàng
function handleAcceptOrder(idOrder) {
  // lấy ra vị trí cần xác nhận
  let orderIndex = orders.findIndex((order) => order.order_id == idOrder);
  // tiến hành cập nhật trậng thâis
  orders[orderIndex].status = 2;
  localStorage.setItem("orders", JSON.stringify(orders));
  location.reload();
}
// từ chối đơn hàng
function handleDenieOrder(idOrder) {
  // lấy ra vị trí cần xác nhận
  let orderIndex = orders.findIndex((order) => order.order_id == idOrder);
  // tiến hành cập nhật trậng thâis
  orders[orderIndex].status = 3;
  localStorage.setItem("orders", JSON.stringify(orders));
  location.reload();
}

// // chức năng tìm kiếm
// const handleSearch = () => {
//   // lấy ra được chuỗi tìm kiếm
//   let id = document.getElementById("search").value
//   // console.log(id);
//   let ordersSearch = orders.filter(order => order.id == id)
//   showOrders(ordersSearch)
// }

// tính toán tổng số trang ;
let totalOrder = orders.length; // tổng số sp = 0?
let count = 7;// số sp trên 1 trang
let pageCurrent = 0;
let totalPage = Math.ceil(totalOrder / count); // tổng số trang
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
  let productPaginate = orders.filter((p, index) => (index >= (pageCurrent * count) && index < (pageCurrent + 1) * count))
  showOrders(productPaginate)
  showPagination()
}

handlePagination(0);


