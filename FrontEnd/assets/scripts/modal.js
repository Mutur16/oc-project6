import { getWorks, getCategories } from "./api.js";

// @fixme ; ?

const token = localStorage.getItem("loginData");

const openButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");

const modalGallery = document.getElementById('modal-delete-gallery');
const modalForm = document.getElementById('modal-form');

/*OPEN AND CLOSE MODAL*/

if (token) {
    openButton.addEventListener("click", () => {
        modal.showModal()
    })

    closeButton.addEventListener("click", () => {
        modal.close()
    })

    modal.addEventListener("click", (e) => {
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
}

/*MODAL OTHER BUTTONS*/

const returnButton = document.querySelector(".btn-return");
returnButton.addEventListener('click', () => {
    returnButton.classList.remove('show-btn-return');

    modalGallery.classList.remove('display-none');
    modalForm.classList.add('display-none');
});

const addButton = document.querySelector('.btn-add');
addButton.addEventListener('click', (e) => {
    e.stopPropagation();
    showAddFormModal();
});

const submitButton = document.querySelector('.btn-submit');
submitButton.addEventListener('click', submitForm);


/*SHOW MODAL*/
/*gallery*/

async function showDeleteGalleryModal() {
    modalForm.classList.add('display-none');
    const deleteGallery = document.querySelector(".delete-gallery");
    const worksData = await getWorks();

    worksData.forEach((work) => {
        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;

        const btnDelete = document.createElement("button");
        btnDelete.innerHTML = '<i class="fa-solid fa-trash-can fa-sm"></i>';
        btnDelete.addEventListener('click', async () => {
            try {
                workElement.remove();
            } catch (error) {
                console.error('Une erreur est survenue lors de la suppression :', error);
            }
        });

        const workElement = document.createElement("figure");
        workElement.appendChild(img);
        workElement.appendChild(btnDelete);

        deleteGallery.appendChild(workElement);
    }) 
}

showDeleteGalleryModal()

/*form*/

async function showAddFormModal() {
    modalGallery.classList.add('display-none');
    modalForm.classList.remove('display-none');

    returnButton.classList.add('show-btn-return');
}

/*DELETE*/

/*ADD*/

function submitForm(event) {
    event.preventDefault();
    const image = document.getElementById('image').value;
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    console.log("Uploaded file :", image);
    console.log("Title :", title);
    console.log("Category :", category);
    document.getElementById('modal-form').reset();
}


/*FORM*/

document.getElementById('image').addEventListener('change', function() {
    const preview = document.getElementById('preview');
    const file = this.files[0];
    const reader = new FileReader();

    reader.onloadend = function() {
        const img = document.createElement('img');
        img.src = reader.result;
        preview.innerHTML = '';
        preview.appendChild(img);
    }
    if (file) {
        reader.readAsDataURL(file);
    }
});

async function createFormCategory() {
    const categories = await getCategories();
    const categorySelect = document.getElementById('category');

    categories.forEach((category) => {
        const option = document.createElement('option');
        option.setAttribute('value', category.id);
        option.text = category.name;
        categorySelect.appendChild(option);
    });
}
createFormCategory()

document.addEventListener('DOMContentLoaded', function() {
    const modalForm = document.querySelector('#modal-form');
    const submitButton = document.querySelector('.btn-submit');

    modalForm.addEventListener('input', function() {
        let allFieldsFilled = true;
        const inputs = modalForm.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            if (!inputs[i].value) {
                allFieldsFilled = false;
                break;
            }
        }

        if (allFieldsFilled) {
            submitButton.removeAttribute('disabled');
            submitButton.classList.add('btn-submit-ok');
        } else {
            submitButton.setAttribute('disabled', 'disabled');
            submitButton.classList.remove('btn-submit-ok');
        }
    });
});
