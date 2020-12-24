import {
    renderItemsList,
    checkAllInputs,
    getInputs,
    clearInputs
} from "./utils.js";

import { getAllSwitchblades, updateSwitchblade, deleteSwitchblade } from "./api.js";

const findButton = document.getElementById("find-button");
const clearFindButton = document.getElementById("clear-find-button");
const findInput = document.getElementById("find-input");
const sortByprice_in_uahAscButton = document.getElementById("sort-button");
const submitButton = document.getElementById("submit-button");
const hideWindowButton = document.getElementById("window_button");

let switchblades = [];

let currentItemId;

const removeSwitchblade = (element) => {
    const itemId = element.target.id.replace('delete_', "");
    deleteSwitchblade(itemId).then(renderSwitchblades(editSwitchblade, removeSwitchblade));

}

const editSwitchblade = (element) => {
    const itemId = element.target.id.replace('edit_', "");
    currentItemId = itemId;
    document.getElementById("operations_container").style.display = 'block';

}

const renderSwitchblades = async(editSwitchblade, removeSwitchblade) => {
    const allSwitchblades = await getAllSwitchblades();
    switchblades = allSwitchblades;
    renderItemsList(switchblades, editSwitchblade, removeSwitchblade);
}


findButton.addEventListener("click", () => {
    const foundswitchblades = switchblades.filter(switchblade => switchblade.name.search(findInput.value) !== -1);

    renderItemsList(foundswitchblades, editSwitchblade, removeSwitchblade);
});

sortByprice_in_uahAscButton.addEventListener("click", () => {
    const sortedswitchblades = switchblades.sort((switchblade_1, switchblade_2) => (switchblade_1.price > switchblade_2.price) ? 1 : -1);

    renderItemsList(sortedswitchblades, editSwitchblade, removeSwitchblade);
});

clearFindButton.addEventListener("click", () => {
    findInput.value = "";

    renderItemsList(switchblades, editSwitchblade, removeSwitchblade);
});

// edit 
submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    let { name, price, country } = getInputs();

    if (checkAllInputs()) {
        price = Number(price);

        updateSwitchblade(currentItemId, { name, price, country });

        document.getElementById("window_content").style.display = "block";
        document.getElementById("window_content").style.border = "none";
        document.getElementById("window_content").style.backgroundColor = " rgb(242, 245, 247)";
        document.getElementById("window_text_content").innerText = "Item was edited!";

    } else {
        document.getElementById("window_content").style.display = "block";
        document.getElementById("window_content").style.backgroundColor = " rgb(242, 245, 247)";
        document.getElementById("window_text_content").innerText = "Input all the values to edit this item!";

    }

});

hideWindowButton.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("window_content").style.display = 'none';
    if (checkAllInputs()) {
        document.getElementById("operations_container").style.display = 'none';
        clearInputs();
        renderSwitchblades(editSwitchblade, removeSwitchblade);
    }
});

renderSwitchblades(editSwitchblade, removeSwitchblade);