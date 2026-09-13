
(function() {
    emailjs.init("Bir23_oQndFG_ouX_");
})();
const services = [
  { id: 1, name: "Dry Cleaning", price: 200.00 },
  { id: 2, name: "Wash & Fold", price: 100.00 },
  { id: 3, name: "Ironing", price: 30.00 },
  { id: 4, name: "Stain Removal", price: 500.00 },
  { id: 5, name: "Leather & Suede Cleaning", price: 999.00 },
  { id: 6, name: "Wedding Dress Cleaning", price: 2800.00 }
];
let cart = [];
function displayServices() {
  const serviceListDiv = document.getElementById("service-list");
  serviceListDiv.innerHTML = "";

  services.forEach(service => {
    const isAdded = cart.some(item => item.id === service.id);

    const div = document.createElement("div");
    div.className = "service-item";
    
    div.innerHTML = `
      <span><strong>${service.name}</strong> ₹${service.price.toFixed(2)}</span>
      ${isAdded 
        ? `<button class="remove-btn" onclick="removeItem(${service.id})">Remove Item</button>` 
        : `<button class="add-btn" onclick="addItem(${service.id})">Add Item</button>`
      }
    `;
    
    serviceListDiv.appendChild(div);
  });
}
function addItem(id) {
  const selectedService = services.find(s => s.id === id);
  cart.push(selectedService);
  updateCartDisplay();
  displayServices();
}
function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartDisplay();
  displayServices();
}
function updateCartDisplay() {
  const tableBody = document.getElementById("cart-table-body");
  const totalAmountSpan = document.getElementById("total-amount");
  
  tableBody.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td>₹${item.price.toFixed(2)}</td>
    `;
    tableBody.appendChild(row);
  });

  totalAmountSpan.innerText = total.toFixed(2);
}
document.getElementById("booking-form").addEventListener("submit", function(event) {
  event.preventDefault();

  if (cart.length === 0) {
    alert("Please add at least one item to your cart before booking.");
    return;
  }

  const name = document.getElementById("user-name").value;
  const email = document.getElementById("user-email").value;
  const phone = document.getElementById("user-phone").value;
  const total = document.getElementById("total-amount").innerText;


  const templateParams = {
    user_name: name,
    user_email: email,
    user_phone: phone,
    total_price: total
  };

  emailjs.send("service_qo2mn2m",  "template_huso75j", templateParams)
    .then(function(response) {
       document.getElementById("confirmation-message").innerText = 
         "Thank you For Booking the Service We will get back to you soon!";
       cart = [];
       updateCartDisplay();
       displayServices();
       document.getElementById("booking-form").reset();
    }, function(error) {
       document.getElementById("confirmation-message").innerText = 
         "Thank you For Booking the Service We will get back to you soon!";
    });
});
displayServices();