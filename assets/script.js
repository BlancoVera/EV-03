document.getElementById("formulario").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita que el formulario recargue la página

    const filtro = document.getElementById("filtro").value.trim(); // Captura el texto ingresado
    const resultadosDiv = document.getElementById("resultados");

    resultadosDiv.innerHTML = "<p>Cargando resultados...</p>"; // Mensaje de carga

    if (!filtro) {
        resultadosDiv.innerHTML = "<p>Por favor, ingresa el nombre de un Digimon.</p>";
        return;
    }

    try {
        // Solicitar datos desde la API
        const respuesta = await fetch(`https://digi-api.com/api/v1/digimon/${filtro}`);
        
        if (!respuesta.ok) {
            throw new Error("Digimon no encontrado");
        }

        const digimon = await respuesta.json(); // Convertir la respuesta a JSON

        // Limpiar resultados previos y mostrar los datos del Digimon
        resultadosDiv.innerHTML = ""; 
        const tarjeta = document.createElement("div");
        tarjeta.className = "card";
        tarjeta.innerHTML = `
            <h3>${digimon.id}. ${digimon.name}</h3>
            <img src="${digimon.images[0]?.href || ''}" alt="${digimon.name}" />
            <div class="info-row">
                <div><strong>Level:</strong> ${digimon.levels?.[0]?.level || "Desconocido"}</div>
                <div><strong>Type:</strong> ${digimon.types?.[0]?.type || "Desconocido"}</div>
                <div><strong>Attribute:</strong> ${digimon.attributes?.[0]?.attribute || "Desconocido"}</div>
                <div><strong>Release Date:</strong> ${digimon.releaseDate || "No disponible"}</div>
            </div>
            <div class="description">
                <p>${digimon.descriptions?.find(desc => desc.language === "en_us")?.description || "Sin descripción disponible"}</p>
            </div>
        `;
        resultadosDiv.appendChild(tarjeta);
    } catch (error) {
        resultadosDiv.innerHTML = "<p>No se encontró el Digimon especificado. Intenta con otro nombre.</p>";
        console.error("Error al obtener datos de la API:", error);
    }
});
