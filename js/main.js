/* jshint esversion:9 */

let selectedDish = null;
let selectedDrink = null;
let selectedDessert = null;
const checkoutBtn = document.querySelector('.checkout-btn');

function unselectAll(category){

    [...document.querySelector(`.${category}-options`).querySelectorAll('div')].forEach(el=>{
        if(el.classList.contains('selected-item')) el.classList.remove('selected-item');
    });

}

function getCategory(clickedElement){

    let category = '';
    
    if(clickedElement.parentNode.classList.contains('dish-options')){

        category = 'dish';

    } else if(clickedElement.parentNode.classList.contains('drink-options')){

        category = 'drink';

    } else if(clickedElement.parentNode.classList.contains('dessert-options')){

        category = 'dessert';

    }

    return category;

}

function getItemPrice(clickedElement){

    const priceElement = clickedElement.querySelector('h5');
    const itemPrice = Number(priceElement.innerText.replace('R$ ', '').replace(',', '.'));
    return itemPrice;

}

function getItemName(clickedElement){

    return clickedElement.querySelector('h4').innerText;

}

function selectItem(clickedElement){

    if(!clickedElement.classList.contains('selected-item')){

        const category = getCategory(clickedElement);
        unselectAll(category);
        clickedElement.classList.add('selected-item');
        const itemPrice = getItemPrice(clickedElement);
        const itemName = getItemName(clickedElement);

        switch (category) {

            case 'dish':
                selectedDish = {
                    name: itemName,
                    price: itemPrice
                };
                break;

            case 'drink':
                selectedDrink = {
                    name: itemName,
                    price: itemPrice
                };
                break;

            case 'dessert':
                selectedDessert = {
                    name: itemName,
                    price: itemPrice
                };
                break;
        
        }

    }

    if(selectedDish !== null && selectedDrink !== null && selectedDessert !== null){

        checkoutBtn.classList.remove('disabled-button');
        checkoutBtn.classList.add('enabled-button');
        checkoutBtn.innerText = 'Fechar pedido';

    } else {

        checkoutBtn.classList.remove('enabled-button');
        checkoutBtn.classList.add('disabled-button');
        checkoutBtn.innerText = 'Selecione os 3 itens para fechar o pedido';

    }

}

function getTotalPrice(){

    let total = 0;

    if(selectedDish !== null) total += selectedDish.price;
    if(selectedDrink !== null) total += selectedDrink.price;
    if(selectedDessert !== null) total += selectedDessert.price;

    return total;

}

function checkout(){

    if(selectedDish !== null && selectedDrink !== null && selectedDessert !== null){

        const userName = prompt('Informe seu nome:');
        const userAddress = prompt('Informe o endereço de entrega do pedido:');

        const totalPrice = getTotalPrice();
        const whatsText = `Olá, gostaria de fazer o pedido: \n- Prato: ${selectedDish.name} \n- Bebida: ${selectedDrink.name} \n- Sobremesa: ${selectedDessert.name} \nTotal: R$ ${String(totalPrice.toFixed(2)).replace('.', ',')}\n\nNome: ${userName}\nEndereço: ${userAddress}`;
        const whatsLink = `https://wa.me/5583993809410?text=${encodeURIComponent(whatsText)}`;
        window.open(whatsLink, '_blank');

    }

}