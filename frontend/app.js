const API = "/support-requirement";

async function init() {
    await cargarClientes();
    await cargarSeveridades();
}

async function cargarClientes() {
    const res = await fetch(`${API}/get-clients`);
    const data = await res.json();

    const select = document.getElementById("clienteSelect");
    select.innerHTML = "";

    data.data.clientsList.forEach(c => {
        const option = document.createElement("option");
        option.value = c.idCliente;
        option.textContent = c.nombreCliente;
        select.appendChild(option);
    });

    setTimeout(onClienteChange, 0);
}

async function cargarSeveridades() {
    const res = await fetch(`${API}/get-severidades`);
    const data = await res.json();

    const select = document.getElementById("severidadSelect");
    select.innerHTML = "";

    data.data.severidadList.forEach(s => {
        const option = document.createElement("option");
        option.value = s.idSeveridad;
        option.textContent = s.nombreSeveridad;
        select.appendChild(option);
    });
}

async function onClienteChange() {
    const idCliente = document.getElementById("clienteSelect").value;
    await cargarModulos(idCliente);
    await cargarSolicitantes(idCliente);
}

async function cargarModulos(idCliente) {
    const res = await fetch(`${API}/get-modulos/${idCliente}`);
    const data = await res.json();

    const select = document.getElementById("moduloSelect");
    select.innerHTML = "";

    data.data.moduloList.forEach(m => {
        const option = document.createElement("option");
        option.value = m.idModulo;
        option.textContent = m.nombreModulo;
        select.appendChild(option);
    });
}

async function cargarSolicitantes(idCliente) {
    const res = await fetch(`${API}/get-solicitantes/${idCliente}`);
    const data = await res.json();

    const select = document.getElementById("solicitanteSelect");
    select.innerHTML = "";

    data.data.solicitanteList.forEach(s => {
        const option = document.createElement("option");
        option.value = s.idSolicitante;
        option.textContent = s.nombreSolicitante;
        select.appendChild(option);
    });
}

async function guardar() {
    const body = {
        idCliente: document.getElementById("clienteSelect").value,
        idModulo: document.getElementById("moduloSelect").value,
        idSeveridad: document.getElementById("severidadSelect").value,
        idSolicitante: document.getElementById("solicitanteSelect").value,
        descripcionBreve: document.getElementById("descBreve").value,
        descripcionDetallada: document.getElementById("descDetallada").value,
        idUsuario: document.getElementById("idUsuario").value
    };

    console.log("BODY ENVIADO:", body);


    const res = await fetch(`${API}/create-ticket`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    });

    const data = await res.json();

    document.getElementById("resultado").textContent =
        JSON.stringify(data, null, 2);
}
