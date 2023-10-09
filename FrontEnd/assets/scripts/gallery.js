const apiRoute = "http://localhost:5678/api/";
let worksData = [];
let workIdsSet = new Set(); 

async function getWorks(categoryId) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  if (!workIdsSet.size) {
    try {
      const response = await fetch(`${apiRoute}works`);
      const works = await response.json();

      works.forEach((work) => {
        if (!workIdsSet.has(work.id)) {
          workIdsSet.add(work.id);
          worksData.push(work);
        }
      });
    } catch (error) {
      console.error("Error fetching works:", error);
      return;
    }
  }

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
  try {
    const response = await fetch(`${apiRoute}categories`);
    const categories = await response.json();
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
      getWorks();
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
        getWorks(category.id);
      });
      buttonsContainer.appendChild(button);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

createCategoryButtons();
getWorks();
