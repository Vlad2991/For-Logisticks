const cargoList = [
    {
      id: "CARGO001",
      name: "Строительные материалы",
      status: "В пути",
      origin: "Москва",
      destination: "Казань",
      departureDate: "2024-11-24"
    },
    {
      id: "CARGO002",
      name: "Хрупкий груз",
      status: "Ожидает отправки",
      origin: "Санкт-Петербург",
      destination: "Екатеринбург",
      departureDate: "2024-11-26"
    }
  ];
  
  const cargoTable = document.getElementById("cargoTable");
  const addCargoForm = document.getElementById("addCargoForm");
  const statusFilter = document.getElementById("statusFilter");
  const errorMessage = document.getElementById("errorMessage");
  

  function renderTable(filter = "all") {
    cargoTable.innerHTML = "";
    cargoList
      .filter(cargo => filter === "all" || cargo.status === filter)
      .forEach(cargo => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${cargo.id}</td>
          <td>${cargo.name}</td>
          <td><span class="badge ${getStatusClass(cargo.status)}">${cargo.status}</span></td>
          <td>${cargo.origin}</td>
          <td>${cargo.destination}</td>
          <td>${cargo.departureDate}</td>
          <td>
            <select onchange="changeStatus('${cargo.id}', this.value)" class="form-select">
              <option value="Ожидает отправки" ${cargo.status === "Ожидает отправки" ? "selected" : ""}>Ожидает отправки</option>
              <option value="В пути" ${cargo.status === "В пути" ? "selected" : ""}>В пути</option>
              <option value="Доставлен" ${cargo.status === "Доставлен" ? "selected" : ""}>Доставлен</option>
            </select>
          </td>
        `;
        cargoTable.appendChild(row);
      });
  }
  
 
  function getStatusClass(status) {
    switch (status) {
      case "Ожидает отправки": return "badge-warning";
      case "В пути": return "badge-primary";
      case "Доставлен": return "badge-success";
      default: return "";
    }
  }
 
  function changeStatus(id, newStatus) {
    const cargo = cargoList.find(cargo => cargo.id === id);
    const today = new Date().toISOString().split("T")[0];
    
    if (newStatus === "Доставлен" && cargo.departureDate > today) {
      alert("Нельзя установить статус 'Доставлен' для груза с будущей датой отправления.");
      renderTable(statusFilter.value);
      return;
    }
  
    cargo.status = newStatus;
    renderTable(statusFilter.value);
  }
  
 
  addCargoForm.addEventListener("submit", event => {
    event.preventDefault();
    
    const name = document.getElementById("cargoName").value.trim();
    const origin = document.getElementById("origin").value;
    const destination = document.getElementById("destination").value;
    const departureDate = document.getElementById("departureDate").value;
  
    if (!name || !departureDate) {
      errorMessage.textContent = "Все поля должны быть заполнены!";
      return;
    }
  
    errorMessage.textContent = "";
    cargoList.push({
      id: `CARGO${cargoList.length + 1}`.padStart(7, "0"),
      name,
      status: "Ожидает отправки",
      origin,
      destination,
      departureDate
    });
    
    addCargoForm.reset();
    renderTable(statusFilter.value);
  });
  
 
  statusFilter.addEventListener("change", () => {
    renderTable(statusFilter.value);
  });
  
 
  renderTable();