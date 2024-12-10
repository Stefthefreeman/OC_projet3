function loGin() {
    const formLogin = document.querySelector(".login");
    formLogin.addEventListener("submit", function (event) {
        event.preventDefault();
        const myLogin = {
            email: event.target.querySelector("[name=mail]").value,
            password: event.target.querySelector("[name=passwd]").value,
        };
        const charge = JSON.stringify(myLogin);
        console.log(charge);
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: charge
        }).then(response => {
            if (response.status === 200) {
                // Redirige vers la nouvelle URL
                window.location.href = './index.html';

            } else {
                console.log('Erreur : Code de statut non 200');
               alert(`Erreur dans l’identifiant ou le mot de passe.`);
            }
            if (response.ok) {
                return response.json(); // Convertit la réponse en JSON
            } else {
                throw new Error(`Erreur : Code de statut ${response.status}`);
            }
        }).then(data => {
            // Récupère le token de la réponse JSON
            const token = data.token;
            localStorage.setItem('authToken', token);
            console.log("localStorage:",localStorage.getItem("authToken"));
        })
            .catch(error => {
                console.error('Erreur lors de la requête :', error);
            });

    });
}
loGin();