const nameInput = document.getElementById("name-input");
const priceInput = document.getElementById("price-input");
const countryInput = document.getElementById("country-input")
const itemsContainer = document.getElementById("items-container");


const getItemId = (id) => `${id}`;

const itemTemplate = ({ id, name, price, country }) => `
<li id="${getItemId(id)}" class="list-item">
    <img src="images/razor.jpg" class="item-image" alt="switchblade">
    <div class="switchblade-body">
        <h3 class="switchblade-name">${name}</h3>
        <p class="switchblade-price">${price} $</p>
        <p class="switchblade-country">${country}</p>
    </div>
    <div class="li-buttons">
        <button id="delete_${id}" type="button" class="btn delete">Delete </button>
        <button id="edit_${id}" type="button" class="btn edit">Edit </button>
    </div>
</li>`;


export const checkAllInputs = () => {
    if (nameInput.value == "" || priceInput.value == "" || countryInput.value == "") {
        return false
    } else {
        return true
    }
}

export const addItemToPage = ({ id, name, price, country }, editSwitchblade, removeSwitchblade) => {
    itemsContainer.insertAdjacentHTML(
        "afterbegin",
        itemTemplate({ id, name, price, country })
    );

    const deleteButton = document.getElementById("delete_" + `${id}`);
    const editButton = document.getElementById("edit_" + `${id}`);
    editButton.addEventListener("click", editSwitchblade);
    deleteButton.addEventListener("click", removeSwitchblade);
};

export const renderItemsList = (items, editSwitchblade, removeSwitchblade) => {
    itemsContainer.innerHTML = "";
    for (const item of items) {
        addItemToPage(item, editSwitchblade, removeSwitchblade);
    }
    countTotalPrice(items);
};

export const getInputs = () => {
    return {
        name: nameInput.value,
        price: priceInput.value,
        country: countryInput.value

    };
};

export const countTotalPrice = (items) => {
    let totalPrice = Number(0);
    for (const item of items) {
        totalPrice += Number(item.price);
    }
    document.getElementById("total-price").innerText = totalPrice + '$';
}

export const clearInputs = () => {
    nameInput.value = "";
    priceInput.value = "";
    countryInput.value = "";

};