import { getWorks } from "./api.js";

const openButton = document.querySelector("[data-open-modal]")
const closeButton = document.querySelector("[data-close-modal]")
const modal = document.querySelector("[data-modal]")
const modalContainer = document.querySelector('.modal-container')
const returnButton = document.querySelector(".btn-return")

/*OPEN, RETURN AND CLOSE MODAL*/

const token = localStorage.getItem("loginData");

if (token) {
    openButton.addEventListener("click", () => {
        modal.showModal()
    })

    returnButton.addEventListener('click', () => {
        returnButton.classList.remove('show-btn-return')
        showDeleteGalleryModal();
    });

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

/*SHOW MODAL*/

async function showDeleteGalleryModal() {
    modalContainer.innerHTML = '';

    const modalGallery = document.createElement("div");
    modalGallery.classList.add('modal-gallery');
    modalContainer.appendChild(modalGallery);

    const modalGalleryTitle = createModalTitle("Galerie photo");

    modalContainer.appendChild(modalGalleryTitle);
    modalContainer.appendChild(modalGallery);
    
    createBtnAdd()

    const worksData = await getWorks()

    worksData.forEach((work) => {
        const workElement = document.createElement("figure");
        const img = document.createElement("img");
        const btnDelete = document.createElement("button");

        img.src = work.imageUrl;
        img.alt = work.title;

        btnDelete.innerHTML = '<i class="fa-solid fa-trash-can fa-sm"></i>';

        btnDelete.addEventListener('click', async () => {
            try {
                workElement.remove();
            } catch (error) {
                console.error('Une erreur est survenue lors de la suppression :', error);
            }
        });

        workElement.appendChild(img);
        workElement.appendChild(btnDelete);

        modalGallery.appendChild(workElement);
    }
)}

showDeleteGalleryModal()

async function showAddFormModal() {
    modalContainer.innerHTML = '';

    returnButton.classList.add('show-btn-return')

    createForm()
}

/*DELETE*/

/*ADD*/

function submitForm(event) {
    event.preventDefault();
    const photo = document.getElementById('photo').value;
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    console.log("Photo chargée :", photo);
    console.log("Titre :", title);
    console.log("Catégorie :", category);
    document.getElementById('photoForm').reset();
}

/*CREATE*/

function createBtnAdd() {
    const btnAdd = document.createElement("button");
    btnAdd.classList.add("btn-add");
    btnAdd.innerHTML = 'Ajouter une photo';
    modalContainer.appendChild(btnAdd);

    btnAdd.addEventListener('click', (e) => {
        e.stopPropagation();
        showAddFormModal();
    });
}

function createModalTitle(text) {
    const title = document.createElement("h3");
    title.innerHTML = `${text}`;
    return title;
}

function createForm() {
    const form = document.createElement('form');
    form.classList.add('modal-form');
    form.id = 'photoForm';
    form.enctype = 'multipart/form-data';
    const fileDiv = document.createElement('div');
    fileDiv.classList.add('uploader')
    const fileLabel = document.createElement('label');
    fileLabel.htmlFor = 'photo';
    fileLabel.innerHTML = '<i class="fa-regular fa-image fa-2xl"></i>' + '<span class="picture-add">+ Ajouter photo</span>' + '<span class="picture-size">jpg, png : 4mo max</span>';
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'photo';
    fileInput.name = 'photo';
    fileInput.accept = 'image/*';
    const modalAddTitle = createModalTitle("Ajout photo");
    fileDiv.appendChild(fileLabel);
    fileDiv.appendChild(fileInput);
    form.appendChild(modalAddTitle);
    form.appendChild(fileDiv);

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('picture-title');
    const titleLabel = document.createElement('label');
    titleLabel.htmlFor = 'title';
    titleLabel.textContent = 'Titre';
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'title';
    titleInput.name = 'title';
    titleInput.required = true;
    titleDiv.appendChild(titleLabel);
    titleDiv.appendChild(titleInput);
    form.appendChild(titleDiv);

    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('picture-categories');
    const categoryLabel = document.createElement('label');
    categoryLabel.htmlFor = 'category';
    categoryLabel.textContent = 'Catégorie';
    const categorySelect = document.createElement('select');
    categorySelect.id = 'category';
    categorySelect.name = 'category';
    const categories = ['Objets', 'Appartements', 'Hotels & restaurants'];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.toLowerCase();
        option.text = category;
        categorySelect.appendChild(option);
    });
    categoryDiv.appendChild(categoryLabel);
    categoryDiv.appendChild(categorySelect);
    form.appendChild(categoryDiv);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Valider';
    submitButton.classList.add("btn-submit");
    submitButton.addEventListener('click', submitForm);
    form.appendChild(submitButton);

    modalContainer.appendChild(form);
}