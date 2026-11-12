const state = { page: 1, pageSize: 10, query: "", sortKey: "id", direction: 1 };

const body = document.querySelector("#table-body");

async function render() {
    const filteredBD = await api(path);

    body.replaceChildren();

    if (!filteredBD) return;

    filteredBD.forEach(cliente => {
        console.log(cliente);

        const row = document.createElement("tr");

        [cliente.id, cliente.nombre].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.append(cell);
        });

        body.append(row);
    });
}

const path = "/api/v1/clientes";

async function api(path, options = {}) {
    const response = await fetch(`${path}`, {
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
        ...options,
    });

    const payload = response.status === 204 ? null : await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(payload?.error?.message || 'No fue posible completar la operación.');
    }

    return payload?.data;
}

render();
