let total=0.00;
let orderList = [];
const hours = {
    0: "Closed",               // Sunday
    1: "9:00 AM – 5:00 PM",    // Monday
    2: "9:00 AM – 5:00 PM",    // Tuesday
    3: "9:00 AM – 5:00 PM",    // Wednesday
    4: "9:00 AM – 5:00 PM",    // Thursday
    5: "9:00 AM – 5:00 PM",    // Friday
    6: "8:00 AM – 12:00 AM"    // Saturday
  };

class product{
    constructor(name, quantity, price){
        this.name=name;
        this.quantity=quantity;
        this.price = price;
    }
    print(){
        console.log(this.name);
        console.log(this.quantity);
    }

}

function addToCart(name,price,quantity){
    if(total==0){
        total = parseInt(localStorage.getItem('total'));
    }
    if(localStorage.getItem("ORDERS") && orderList.length==0){
;        orderList = JSON.parse(localStorage.getItem("ORDERS"));
    }
    total += price * quantity;
    let Product = new product(name, quantity, price);
    orderList.push(Product);
    simpleCart(orderList);
    localStorage.setItem("ORDERS",JSON.stringify(orderList));
    localStorage.setItem('total',total);
    receipt(name, quantity);
    const cartConfirmation = document.getElementById("cartConfirmation");
    cartConfirmation.style.visibility="visible";
     setTimeout(() => {
    cartConfirmation.style.visibility = "hidden"; // hide after 3 seconds
    }, 2000); 
 }



function receipt(){

    orderList = JSON.parse(localStorage.getItem("ORDERS"));
    displayMenu();
    displayTotal();
}

function displayTotal(){
    const Money_Display = document.getElementById("Total_Order");
    const checkOutMoney_Display = document.getElementById("checkOutTotal");
    total = localStorage.getItem('total');
    total = Math.round(total*100)/100;
    Money_Display.textContent = "$" + total;
    checkOutMoney_Display.textContent = "$" + total;
}

function displayMenu(){

    const Menu_Items = document.getElementById("menuItemOrder");
    Menu_Items.textContent = "";
    const Menu_Number = document.getElementById("menuQuantityOrder");
    Menu_Number.textContent = "";
    const Menu_Price = document.getElementById("menuQuantityPrice");
    Menu_Price.textContent = "";
    const checkOutMenu_Items = document.getElementById("checkOutItems2");
    checkOutMenu_Items.textContent = "";
    const checkOutMenu_Number = document.getElementById("checkOutItems1");
    checkOutMenu_Number.textContent = "";
    const checkOutMenu_Price = document.getElementById("checkOutQuantity");
    checkOutMenu_Price.textContent = "";
    for(let i =0; i<orderList.length;i++){
            const newP1 = document.createElement('p');
            const checkOut_newP1 = document.createElement('p');
            newP1.textContent = orderList[i].name;
            checkOut_newP1.textContent = orderList[i].name;
            checkOutMenu_Items.appendChild(checkOut_newP1);
            Menu_Items.appendChild(newP1);
            const newP2 = document.createElement('p');
            const checkOutnewP2 = document.createElement('p');
            checkOutnewP2.textContent = "X" + orderList[i].quantity;
            newP2.textContent = orderList[i].quantity;
            const newP3 = document.createElement('p');
            const quantityPrice = orderList[i].quantity * orderList[i].price;
            newP3.textContent = quantityPrice.toFixed(2);
            const checkOutnewP3 = document.createElement('p');;
            checkOutnewP3.textContent = quantityPrice.toFixed(2);
            Menu_Price.appendChild(newP3);
            checkOutMenu_Price.appendChild(checkOutnewP3);
            const buttonSubtract = document.createElement("button");
            const buttonAdder = document.createElement("button");
            buttonAdder.textContent = '+';
            buttonSubtract.textContent = '-'
            buttonAdder.addEventListener('click', () => quantityChange(i,1));
            buttonSubtract.addEventListener('click', () => quantityChange(i,-1));
            Menu_Number.appendChild(buttonSubtract);
            Menu_Number.appendChild(newP2);
            checkOutMenu_Number.appendChild(checkOutnewP2);
            Menu_Number.appendChild(buttonAdder);
    }

}

function quantityChange(index,arithmetic){
    if(arithmetic==-1){
    total -= orderList[index].price;
    orderList[index].quantity -= 1;
    }else if(arithmetic==1){
        total += orderList[index].price;
    orderList[index].quantity += 1;
    }
    if(orderList[index].quantity==0){
        orderList.splice(index,1);
    }

    localStorage.setItem('total',total)
    displayTotal()
    localStorage.setItem("ORDERS",JSON.stringify(orderList));
    displayMenu();
}

function simpleCart(Final_Order){
    for(let i = 0; i<Final_Order.length;i++){
        for(let j=0; j<Final_Order.length;j++){
            if(Final_Order[i].name == Final_Order[j].name && i!=j){
                Final_Order[i].quantity += Final_Order[j].quantity
                Final_Order.splice(j,1);
            }
        }
    }
}

function closeCart(){
    const cartWindowDisplay = document.getElementById("cartWindow");
    const cartDisplay = document.getElementById("cartBox");
    cartDisplay.style.visibility = 'hidden';
    cartWindowDisplay.style.visibility = 'hidden';
     
}

function openCart(){
    const cartWindowDisplay = document.getElementById("cartWindow");
    const cartDisplay = document.getElementById("cartBox");
        cartWindowDisplay.style.visibility = 'visible';
    cartDisplay.style.visibility = 'visible';
        receipt();
}

function clearCart(){
    total = 0;
    orderList = [];
    localStorage.setItem('total',0);
    const display_Total = document.getElementById("Total_Order");
    display_Total.textContent = "$0.00";
    localStorage.setItem("ORDERS", "")
    const div = document.getElementById("menuOrder");
    div.querySelectorAll("button").forEach(btn => btn.remove());
    const display_Menu_Items = document.getElementById("menuItemOrder");
    const display_Menu_Number = document.getElementById("menuQuantityOrder");
    const display_Menu_Price = document.getElementById("menuQuantityPrice");
    display_Menu_Items.textContent = "";
    display_Menu_Number.textContent = "";
    display_Menu_Price.textContent = "";
}

function showCheckOut(){
    const wrapperdiv = document.querySelector(".wrapper");
    const checkOutPage = document.getElementById("checkOut");
    const cartWindow = document.getElementById("cartWindow");
    checkOutPage.style.visibility = 'visible';
    wrapperdiv.style.display = 'none';
    cartWindow.style.display = 'none';
    
}

function hideCheckOut(){
    const wrapperdiv = document.querySelector(".wrapper");
    const checkOutPage = document.getElementById("checkOut");
    const cartWindow = document.getElementById("cartWindow");
    checkOutPage.style.visibility = 'hidden';
    wrapperdiv.style.display = 'grid';
    cartWindow.style.display = 'block';
    
}

function isSameDay(d1, d2) {
    if(d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate()  === d2.getDate()){
        return true;
    }
    return false;
  }


function pickUpTimeValidation(){
    const tday = new Date();
    const dateInput = document.getElementById("dateInput").value;
    const timeInput = document.getElementById("timeInput").value;
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    // const time = new Date(timeInput);
    // const [year, month, day] = dateInput.split("-").map(Number);
    const [hour, minutes] = timeInput.split(":").map(Number);
    if(date<tday && isSameDay(date,tday) == false){
        alert("please enter a valid date");
        return false;
    }
    if(timeInput == ""|| dateInput == ""){
        alert("please choose a time to pick up the order")
        return false;
    }
    if(date.getDay() == 6){
        alert("we are closed at that day");
        return false;
    }else if(date.getDay()==5){
        if(hour < 8 || hour>11){
            alert('we are closed during these hours');
            return false;
        }
        if(isSameDay(date,tday) && (hour<(tday.getHours()+1))){
            alert('we need more time');
            return false;
        }
    }else{
        if(hour < 9 || hour>16){
            alert('we are closed during these hours');
            return false;
        }
        if(isSameDay(date,tday) && (hour<(tday.getHours()+1))){
            alert('we need more time');
            return false;
        }
    }
    return true;

}


function sendToTelegram() {
    orderList = JSON.parse(localStorage.getItem("ORDERS"));
    const dateInput = document.getElementById('dateInput').value;
    const timeInput = document.getElementById('timeInput').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('emailAddress').value;
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const totalPrice = document.getElementById('checkOutTotal');
    const comments = document.getElementById('commentsection').value;
    if(verifyUserInput(firstName, lastName,phoneNumber) && pickUpTimeValidation()){
        let menu = "\n";
        orderList.forEach(i => {
            menu += "•" +  + i.quantity + "x\t" + i.name + " \t\t\t$" + i.quantity*i.price;
            menu += "\n";
        });
        const msg = 
        "items:" +
        menu + 
        "\ntotal: " + totalPrice.textContent +
        "\n\ncontact details: " + 
        "\n\t\t•name: " + firstName  + " " + lastName +
        "\n\t\t•email: " + email +
        "\n\t\t•phone number: " + phoneNumber +
        "\n addition comments:  " + comments +
        "\npickup Time: " + dateInput + "\t\t"+ timeInput;
        fetch(`https://swareekh-with-backend.onrender.com/sendMessage?message=${encodeURIComponent(msg)}`)
        confirmPurchasePopup();
    }

    
  }

  function verifyUserInput(firstName, lastName, phoneNumber){
    let regex = /^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/;
    if(firstName == ""){
        alert("please enter a first name");
        return false;
    }
    if(lastName == ""){
        alert("please enter a last nanme");
        return false;
    }
    if(phoneNumber == ""){
        alert("please enter a phone number");
        return false;
    }else if (!regex.test(phoneNumber)) {
        alert("please enter a proper phone number");
        return false;
    }
    return true;
  }

  function confirmPurchasePopup(){
        const receipt = document.getElementById('receipt');
        const dateOfPickup = document.getElementById('dateOfPickup');
        const timeOfPickup = document.getElementById('timeOfPickup');
        dateOfPickup.textContent = document.getElementById('dateInput').value;
        timeOfPickup.textContent = document.getElementById('timeInput').value;
        receipt.style.visibility="visible";
        
    //     setTimeout(() => {
    //         receipt.style.visibility = "hidden"; // hide after 3 seconds
    //    }, 2000);
  }

  function hideReceipt(){
        const receipt = document.getElementById('receipt');
        receipt.style.visibility = "hidden";
  }

  async function checkout(itemId) {
  const res = await fetch("/checkout", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ itemId })
  });

  const data = await res.json();
  window.location = data.checkoutUrl;  // redirect to Clover Checkout
}