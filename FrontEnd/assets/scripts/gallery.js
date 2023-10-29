import { getWorks, getCategories } from "./api.js";

export let activeCategoryId;

export async function createWorksGallery(categoryId) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    const worksData = await getWorks();
    const filteredWorks = !categoryId ? worksData : worksData.filter((work) => work.categoryId === categoryId);

    filteredWorks.forEach((work) => {
        const workElement = document.createElement("figure");
        const img = document.createElement("img");
        const title = document.createElement("figcaption");

        img.src = work.imageUrl;
        img.alt = work.title;
        title.textContent = work.title;

        workElement.appendChild(img);
        workElement.appendChild(title);

        gallery.appendChild(workElement);
    });
}

async function createCategoryButtons() {
    const categories = await getCategories();

    const buttonsContainer = document.querySelector(".category-buttons");

    const allCategoriesButton = document.createElement("button");
    allCategoriesButton.textContent = "Tous";
    allCategoriesButton.classList.add("btn", "active");
    allCategoriesButton.addEventListener("click", () => {
        const activeButton = document.querySelector(".btn.active");
        if (activeButton) {
            activeButton.classList.remove("active");
        }
        allCategoriesButton.classList.add("active");
        createWorksGallery();
    });
    buttonsContainer.appendChild(allCategoriesButton);

    categories.forEach((category) => {
        const button = document.createElement("button");
        button.textContent = category.name;
        button.classList.add("btn");
        button.addEventListener("click", () => {
            const activeButton = document.querySelector(".btn.active");
            if (activeButton) {
                activeButton.classList.remove("active");
            }
            button.classList.add("active");
            activeCategoryId = category.id;
            createWorksGallery(activeCategoryId);
        });
        buttonsContainer.appendChild(button);
    });
}

createCategoryButtons();
createWorksGallery();