///Fresia

const products = [
    {
        id: "aeblbemost",
        title: "Æblemost",
        description: "Økologisk æblemost lavet fra koncentrat",
        size: [
            { label: "20 cl", price: 5 },
            { label: "50 cl", price: 16 },
        ],
        image: "../img/applemost.jpg",
    },

    {
        id: "rabarber",
        title: "Rabarberdrik",
        description: "Økologisk rabarbersaft er en ufiltreret saft, presset af friskhøstede, solmodne økologiske rabarber – intet er tilsat",
        size: [
            { label: "20 cl", price: 5 },
            { label: "50 cl", price: 16 },
        ],
        image: "../img/rabarber.jpg",
    },

    {
        id: "appelsin",
        title: "Appelsin juice",
        description: "økologisk appelsinjuice er presset af økologiske appelsiner",
        size: [
            { label: "20 cl", price: 5 },
            { label: "25 cl", price: 10 },
            { label: "50 cl", price: 16 },
        ],
        image: "../img/appelsin_juice.jpg",
    },

    {
        id: "hyldeblomst",
        title: "Hyldeblomstdrik",
        description: "Økologisk hyldeblomstdrik er fremstillet af økologisk hyldeblomst udtræk",
        size: [
            { label: "20 cl", price: 5 },
            { label: "50 cl", price: 16 },
        ],
        image: "../img/hyldeblomst.jpg",
    },

    {
        id: "vand",
        title: "Vand",
        description: "Naturligt kildevand er rent vand, der udspringer fra underjordiske kilder og filtreres gennem naturlige jordlag",
        size: [{ label: "50 cl", price: 16 }],
        image: "../img/vand.jpg",
    },

    {
        id: "aeblejuice",
        title: "Æble juice",
        description: "økologisk æblejuice på den klassiske og populære 25 cl. Brik med sugerør",
        size: [{ label: "25 cl", price: 10 }],
        image: "../img/apple_juice.jpg",
    },

    {
        id: "gingerlemon",
        title: "Økologisk ginger lemon shot",
        description: "Økologisk citron shot er fremstillet til det danske klima hvor der ofte er behov for et ekstra shot af Ingefær",
        size: [{ label: "6 cl", price: 10 }],
        image: "../img/lemon_shot.jpg",
    },

    {
        id: "gingerrabarber",
        title: "Økologisk ginger rabarber shot",
        description: "Økologisk rabarber shot er fremstillet til det danske klima hvor der ofte er behov for et ekstra shot af Ingefær",
        size: [{ label: "6 cl", price: 10 }],
        image: "../img/rabarber_shot.jpg",
    },
];

/*DOM metode*/
const grid = document.getElementById("productGrid");

/* Only render products on pages that have the product grid */
if (grid) {
    /*Loop*/
    products.forEach((product) => {
        const col = document.createElement("div");
        col.className = "col";

        const card = document.createElement("div");
        card.className = "card h-100 shadow";

        /*billede*/
        const img = document.createElement("img");
        img.className = "card-img-top";
        img.src = product.image;
        img.alt = product.title;

        /*card body*/
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        /*title til kort*/
        const title = document.createElement("h4");
        title.className = "card-title";
        title.textContent = product.title;

        /*produkt beskrivelse*/
        const desc = document.createElement("p");
        desc.className = "card-text";
        desc.textContent = product.description;

        // adding title & description to the DOM
        cardBody.appendChild(title);
        cardBody.appendChild(desc);

        const sizeRow = document.createElement("div");
        sizeRow.className = "row";

        product.size.forEach((size) => {
            const sizeCol = document.createElement("div");
            sizeCol.className = "col-6 mb-2";

            const label = document.createElement("span");
            label.textContent = size.label;

            const price = document.createElement("p");
            price.className = "mb-1";
            price.innerHTML = `<strong>Dkk${size.price}</strong>`;

            const btnGroup = document.createElement("div");
            btnGroup.className = "btn-group ms-2";
            btnGroup.setAttribute("role", "group");
            btnGroup.setAttribute("aria-label", `${size.label} tæller`);

            const minus = document.createElement("button");
            minus.className = "btn btn-outline-secondary";
            minus.textContent = "−";

            const count = document.createElement("button");
            count.className = "btn btn-outline-secondary";
            count.textContent = "0";
            count.disabled = true;

            const plus = document.createElement("button");
            plus.className = "btn btn-outline-secondary";
            plus.textContent = "+";

            minus.addEventListener("click", () => {
                let productCount = parseInt(count.textContent);
                const basketCounter = document.getElementById("jo-basket-counter");
                if (productCount > 0) {
                    count.textContent = productCount - 1;
                    let basketCounterInt = parseInt(basketCounter.textContent);
                    basketCounter.textContent = basketCounterInt - 1;
                }

                const cart = JSON.parse(localStorage.getItem("cart")) || [];
                for (let i = 0; i < cart.length; i++) {
                    if (cart[i].id === product.id && cart[i].size === size.label) {
                        cart.splice(i, 1);
                        break;
                    }
                }
                localStorage.setItem("cart", JSON.stringify(cart));
            });

            plus.addEventListener("click", () => {
                let productCount = parseInt(count.textContent);
                count.textContent = productCount + 1;

                const basketCounter = document.getElementById("jo-basket-counter");
                let basketCounterInt = parseInt(basketCounter.textContent);
                basketCounter.textContent = basketCounterInt + 1;

                const cart = JSON.parse(localStorage.getItem("cart")) || [];
                cart.push({
                    id: product.id,
                    title: product.title,
                    size: size.label,
                    price: size.price,
                    imgUrl: product.image,
                });
                localStorage.setItem("cart", JSON.stringify(cart));
            });

            btnGroup.append(minus, count, plus);
            sizeCol.append(price, label, btnGroup);
            sizeRow.appendChild(sizeCol);
        });

        //adding to the DOM
        cardBody.appendChild(sizeRow);
        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
        grid.appendChild(col);
    });
}
