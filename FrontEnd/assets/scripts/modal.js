import { getWorks } from "./api.js";

const openButton = document.querySelector("[data-open-modal]")
const closeButton = document.querySelector("[data-close-modal]")
const modal = document.querySelector("[data-modal]")

openButton.addEventListener("click", () => {
    modal.showModal()
})

closeButton.addEventListener("click", () => {
    modal.close()
})

modal.addEventListener("click", e => {
    const dialogDimensions = modal.getBoundingClientRect()
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        modal.close()
    }
})

async function editableWorks() {
    const modalGallery = document.getElementById("modal-gallery");

    const worksData = await getWorks()

    worksData.forEach((work) => {
        const workElement = document.createElement("figure");
        const img = document.createElement("img");

        img.src = work.imageUrl;
        img.alt = work.title;

        workElement.appendChild(img);

        modalGallery.appendChild(workElement);
    }
)}

editableWorks()