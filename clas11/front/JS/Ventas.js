const currency = new Intl.NumberFormat("en-US", {
  style: "currency", currency: "USD", maximumFractionDigits: 0
});
const body = document.querySelector("#table-body");

function normalize(value) {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
const path = "/api/v1/ventas";

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

async function render(){

  const filteredBD = await api(path);
  console.log(filteredBD);

  let filtered = filteredBD.sort((a, b) => a.id - b.id);
  body.replaceChildren();

  filtered.forEach(venta => {
    const row = document.createElement("tr");
    [ venta.cliente.nombre, venta.fechaVenta, venta.estado, venta.total].forEach(value=>{
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    })
    body.append(row);
  });
}

render();