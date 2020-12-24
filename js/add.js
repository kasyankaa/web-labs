import {
    getInputs,
    checkAllInputs,
    clearInputs
} from "./utils.js";

import { postSwitchblade } from "./api.js"


const submitButton = document.getElementById("submit-button");
const hideWindowButton = document.getElementById("window_button");


submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    let { name, price, country } = getInputs();
    if (checkAllInputs()) {
        price = Number(price);
        console.log({ name, price, country });
        postSwitchblade({ name, price, country });

        document.getElementById("window_content").style.display = "block";
        document.getElementById("window_content").style.backgroundColor = " rgb(242, 245, 247)";
        document.getElementById("window_text_content").innerText = "Item added!";
    } else {
        document.getElementById("window_content").style.display = "block";
        document.getElementById("window_content").style.backgroundColor = "rgb(242, 245, 247)";
        document.getElementById("window_text_content").innerText = "Input all the values to add item!";
    }
    clearInputs();
});

hideWindowButton.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("window_content").style.display = 'none';
});