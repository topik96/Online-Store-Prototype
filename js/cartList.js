let cart = JSON.parse(localStorage.getItem('cart'))
cart ? cart : cart = []

let sum = 0;
let total = function () {
   cart.forEach(e => {
      sum += (e.price * e.quantity)
   });
   return $('#price').text('€ ' + sum)
}

$(document).ready(function () {
   cart.map(data => {
      $("#cartList tbody").append(
         `<tr id=cart${data.id}>
            <td class='pid'>${data.id}</td>
            <td>${data.name}</td>
            <td class='quantity'>${data.quantity}</td>
            <td class='subtotal'>${parseInt(data.price) * parseInt(data.quantity)}</td>
            <td><button class="removeItem" onclick="del(${data.id},${data.price})">-1</button></td>
         </tr>`
      )
   })
   total()
})

function ok(pid, nama, harga, stok) {
   // console.log(stok)
   let quantity = 1;
   const item = cart.find(x => x.id == pid)
   if (item && cart[cart.indexOf(item)].stock == 0) {
      alert("UDAH ABIS WOI")
   } else {
      if (item) {
         cart[cart.indexOf(item)].quantity++
         let qty_text = $(`#cart${pid} .quantity`).text()
         $(`#cart${pid} .quantity`).text(parseInt(qty_text) + 1)
         cart[cart.indexOf(item)].stock--
         $(`#cart${pid} .subtotal`).text($(`#cart${pid} .quantity`).text() * harga)
      }
      else {
         stok -= quantity
         cart.push({ id: pid, name: nama, price: harga, quantity: quantity, stock: stok })
         $("#cartList tbody").append(
            `<tr id=cart${pid}>
               <td class='pid'>${pid}</td>
               <td>${nama}</td>
               <td class='quantity'>${quantity}</td>
               <td class='subtotal'>${quantity * harga}</td>
               <td><button class=removeItem onclick="del(${pid},${harga})">-1</button></td>
            </tr>`
         )
      }
      localStorage.setItem('cart', JSON.stringify(cart))
      $('#price').text('€ ' + (parseInt(($('#price').text()).slice(2)) + harga))
   }
}

function del(pid, harga) {
   const quantity = $(`#cart${pid} .quantity`).text()
   const sub = $(`#cart${pid} .subtotal`).text()
   const item = cart.find(x => x.id == pid)
   if (quantity == 1) {
      $(`#cart${pid}`).remove()
      cart.splice(cart.indexOf(item), 1)
   } else {
      $(`#cart${pid} .quantity`).text(quantity - 1)
      cart[cart.indexOf(item)].quantity--
      cart[cart.indexOf(item)].stock++
      $(`#cart${pid} .subtotal`).text(sub - harga)
   }
   $('#price').text('€ ' + (parseInt(($('#price').text()).slice(2)) - harga))
   localStorage.setItem('cart', JSON.stringify(cart))
}