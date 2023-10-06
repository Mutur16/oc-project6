updateWorks()

async function updateWorks(categoryId) {
    document.querySelector(".gallery").innerHTML = ''

    const reponse = await fetch(`http://localhost:5678/api/works`);
    const works = await reponse.json();
    const gallery = document.querySelector(".gallery");

    for (let i = 0; i < works.length; i++) {

        if (categoryId === works[i].categoryId || categoryId === undefined) {

            const workElement = document.createElement("figure");
            const imageElement = document.createElement("img")
            const titleElement = document.createElement("figcaption");

            imageElement.setAttribute("src", `${works[i].imageUrl}`);
            imageElement.setAttribute("alt", `${works[i].title}`);
            titleElement.innerHTML = `${works[i].title}`;

            gallery.appendChild(workElement);
            workElement.appendChild(imageElement);
            workElement.appendChild(titleElement);
        }
    }
    document.querySelector('.btn.active').classList.remove("active")
    document.querySelector(`.btn[data-category="${undefined === categoryId ? "" : categoryId}"]`).classList.add("active")
}

document.querySelectorAll('.btn').forEach(button => button.addEventListener("click", (event) => {
    const targetElement = event.target
    updateWorks(targetElement.dataset.category === "" ? undefined : parseInt(targetElement.dataset.category))
}))
