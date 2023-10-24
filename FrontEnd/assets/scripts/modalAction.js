
import { getWorks, deleteWork, addWork } from "./api.js";
import { createWorksGallery } from "./gallery.js";

export async function deleteWorkGallery(e) {
    const target = e.target;
    let workElement = target.parentElement;
    if (target.tagName === "i") {
        workElement = target.parentElement.parentElement;
    }

    try {
        await deleteWork(workElement.dataset.workId);
        workElement.remove();
        await getWorks(true)
        createWorksGallery();
    } catch (error) {
        console.error('Une erreur est survenue lors de la suppression :', error);
    }
}

export async function submitForm() {
    const image = document.querySelector('#image').files[0];
    const title = document.querySelector('#title').value;
    const category = document.querySelector('#category').value;
    document.querySelector('#modal-form').reset();
    await addWork(image, title, category);
    await getWorks(true)
    createWorksGallery();
}