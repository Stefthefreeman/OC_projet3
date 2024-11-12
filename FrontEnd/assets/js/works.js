const reponse = await fetch('http://localhost:5678/api/works/');
const works = await reponse.json();
const cats = await fetch('http://localhost:5678/api/categories');
const categories = await cats.json();
console.log(categories);

function showWorks(works) {
    for (let i = 0; i < works.length; i++) {
        const work = works[i];
        const sectionGallery = document.querySelector(".gallery");
        const galleryElement = document.createElement("figure");
        const imgGallery = document.createElement("img");
        imgGallery.src = work.imageUrl;
        imgGallery.alt = work.title;
        const figCaption = document.createElement("figcaption");
        figCaption.innerText = work.title;

        sectionGallery.appendChild(galleryElement);
        galleryElement.appendChild(imgGallery);
        galleryElement.appendChild(figCaption);

    }
}

showWorks(works);

function showWorksInModal(works) {
    let work;
    for (let i = 0; i < works.length; i++) {
        work = works[i];
        const sectionGallery = document.querySelector(".modal-gallery");
        const galleryElement = document.createElement("div");
        const trashIcon = document.createElement('i');
        trashIcon.classList.add('fa', 'fa-trash', "deleteImg");
        const imgGallery = document.createElement("img");
        trashIcon.setAttribute("data-image", work.id);
        galleryElement.className = "image-container";
        galleryElement.id = "image-container";
        imgGallery.src = work.imageUrl;
        imgGallery.alt = work.title;
        sectionGallery.appendChild(galleryElement);
        galleryElement.appendChild(imgGallery);
        galleryElement.appendChild(trashIcon);
        //console.log(galleryElement.id);
    }
    document.querySelectorAll('.deleteImg').forEach((i) => {
        i.addEventListener('click', async (event) => {
            const imageId = event.target.getAttribute('data-image');
            console.log(imageId);
            const token=localStorage.getItem("authToken");
            /*try {
                const response = await fetch(`http://localhost:5678/api/works/${imageId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }

                });

                if (response.ok) {
                    // Supprimer l'image du DOM si la suppression est réussie
                    const imageContainer = event.target.closest('#image-container');
                    imageContainer.remove();
                    console.log("Image supprimée avec succès.");
                } else {
                    console.error("Échec de la suppression de l'image.");
                }
            } catch (error) {
                console.error("Erreur de requête :", error);
            }*/
        });
    });
}

showWorksInModal(works);
const buttons = new Set([
    {id: "btn-object", categoryId: 1},
    {id: "btn-appart", categoryId: 2},
    {id: "btn-hr", categoryId: 3},
    {id: "all", categoryId: null}
]);

buttons.forEach(button => {
    const btnElement = document.getElementById(button.id);

    btnElement.addEventListener("click", function () {
        const worksfilter = button.categoryId !== null
            ? works.filter(work => work.categoryId === button.categoryId)
            : works;

        document.querySelector(".gallery").innerHTML = "";
        showWorks(worksfilter);
    });
});
// Récupérer les éléments de la modale
const modal = document.getElementById("myModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.querySelector(".close");

// Ouvrir la modale lors du clic sur le bouton
openModalBtn.onclick = function () {
    modal.style.display = "flex";
}

// Fermer la modale lors du clic sur le bouton de fermeture
closeModalBtn.onclick = function () {
    modal.style.display = "none";
}

// Fermer la modale lors du clic en dehors de la modale
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

function selectInModal(categories) {
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const select = document.querySelector(".myCategories");
        const option = document.createElement("option");
        option.text = category.name;
        option.value = category.id;
        select.appendChild(option);
    }

}

selectInModal(categories);

function submitForm(event) {
    event.preventDefault();
    const form = document.getElementById("addWork");
    const formData = new FormData(form);
    console.log(formData.entries);
    // Afficher le contenu de formData pour vérifier
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }

    const token = localStorage.getItem("authToken");
    console.log(token);
    // Envoyer le formulaire avec fetch
    /*fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Succès:', data);
        })
        .catch(error => {
            console.log('Erreurs:', error);
        });*/
}





