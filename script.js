function generateMessage() {
    let name = document.getElementById("name").value || "Raphaël";
    document.getElementById("message").textContent = name + " vous souhaite une belle année !";

    // URL partageable
    let url = new URL(window.location);
    url.searchParams.set("name", name);
    window.history.replaceState(null, '', url); // change l'URL sans recharger
}

// Optionnel : récupérer le nom depuis l'URL si quelqu'un partage un lien
window.onload = function() {
    let params = new URLSearchParams(window.location.search);
    let name = params.get("name");
    if(name) {
        document.getElementById("message").textContent = name + " vous souhaite une belle année !";
        document.getElementById("name").value = name;
    }
};
