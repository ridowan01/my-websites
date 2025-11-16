function init() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        itemList(data["drinks"]);
    })
    .catch(err => console.log("Error: ", err));
}

document.addEventListener('DOMContentLoaded', init);

function createCard(item) {
    const name = item["strDrink"];
    const img = item["strDrinkThumb"];
    const category = item["strCategory"];
    const instruciton = item["strInstructions"];

    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card my-3" style="width: 16rem;">
            <img src="${img}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p> Category: ${category}</p>
                <p class="card-text">Insturction: ${instruciton.slice(0, 15)}</p>
                <button type="button" class="btn btn-outline-danger abtn">Add To Cart</button>
                <button type="button" class="btn btn-outline-info dbtn">Details</button>
            </div>
        </div>
    `
    const dbtn = div.querySelector(".dbtn")
    dbtn.addEventListener("click", () => showDetails(item["idDrink"]));
    
    const abtn = div.querySelector(".abtn");
    abtn.addEventListener("click", () => addCart(item["strDrink"], item["strDrinkThumb"]));

    return div;
}

function itemList(items) {
    const item_list = document.getElementById("item-list");
    item_list.innerHTML = "";

    for (let item of items) {
        const card = createCard(item);
        item_list.appendChild(card);
    }
}

function showDetails(id) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        createModal(data["drinks"][0]);
    })
    .catch(err => {
        console.log("Error: ", err);
    })
}

function createModal(item) {
    console.log(item);
    const name = item["strDrink"];
    const img = item["strDrinkThumb"];
    const category = item["strCategory"];
    const alcoholic = item["strAlcoholic"];
    const instruction = item["strInstructions"];

    const div = document.createElement("div");
    div.innerHTML = `
        <div class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">${name}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <img src="${img}" class="card-img-top" alt="...">
                <p><b>Details</b></p>
                <p>Category: <b>${category}</b></p>
                <p>Alcoholic: <b>${alcoholic}</b></p>
                <p>${instruction}</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
    `

    document.body.appendChild(div.firstElementChild);
    const modalElement = document.body.lastElementChild;
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}


let globalCount = 1;
function addCart(name, img) {
    if (globalCount == 8) {
        alert("Don't drink to much");
        return;
    }

    const cart = document.getElementById("cart");
    const div = document.createElement("div")
    div.innerHTML = `
        <div class="row">
            <div class="col-2">${globalCount}</div>
            <div class="col-4">
                <img src="${img}" class="card-img-top" alt="..." style="border-radius: 50%;">
            </div>
            <div class="col-6">${name}</div>
        </div>
        <hr>
    `

    const tcount = document.getElementById("Tcount");
    tcount.innerText = "Total Cart: " + globalCount;

    globalCount += 1;
    cart.appendChild(div);
}

function search() {
    const letter = document.getElementById("txt").value;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${letter}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        itemList(data["drinks"]);
    })
    .catch(err => {
        console.log("Error: ", err);
        noItem();
    });
}

function noItem() {
    const item_list = document.getElementById("item-list");
    item_list.innerHTML = "";

    item_list.innerHTML = `
        <font size="20px">No Items Found</font>
    `
}
