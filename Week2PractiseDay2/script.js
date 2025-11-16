function search() {
    const name = document.getElementById("take-input").value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            showItems(data.meals);
        })
        .catch(err => {
            console.error("Error: ", err);
            showNoItem();
        })
}

function showItems(meals) {
    const show_item = document.getElementById("show-item");
    show_item.innerHTML = "";

    for (const meal of meals) {
        const img = meal.strMealThumb;
        const title = meal.strMeal;

        const card = document.createElement("div");
        card.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${img}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                </div>
            </div>
        `

        card.addEventListener("click", () => {
            const show_div = document.getElementById("details-show");
            show_div.innerHTML = "";

            const img = meal.strMealThumb;
            const title = meal.strMeal;

            const card = document.createElement("div");
            card.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img src="${img}" class="card-img-top" alt="...">
                    <div class="card-body" id="detail-card">
                        <h5 class="card-title">${title}</h5>
                    </div>
                </div>
            `
            show_div.append(card);

            const detail_card = document.getElementById("detail-card");
            const ingre = Object.keys(meal).filter(str => {
                return str.includes("strIngredient");
            })

            const ul = document.createElement("ul");
            for (let i of ingre) {
                if (meal[i] == "") {
                    continue;
                }
                
                const li = document.createElement("li");
                li.textContent = meal[i];
                ul.appendChild(li);
            }

            detail_card.appendChild(ul);
        })

        show_item.appendChild(card);
    }
}

function showNoItem() {
    const show_item = document.getElementById("show-item");
    show_item.innerHTML = "";

    show_item.innerHTML = `
        <center><font size=20>No Items Found</font></center>
    `
}