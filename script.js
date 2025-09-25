const sheetUrl = "https://opensheet.elk.sh/1aY1kyz4i8nWVwGoCfKDd_0DjWSzxnhH0nubCLc0tI74/Sheet1";
let globalData = [];

// Fetch Data
async function fetchData() {
  try {
    const res = await fetch(sheetUrl);
    const data = await res.json();
    globalData = data;
    renderTable(data);
  } catch (err) {
    console.error("Fetch error:", err);
    document.getElementById("sheetData").innerHTML = "❌ Error loading sheet data!";
  }
}

// Render Table
function renderTable(data) {
  const container = document.getElementById("sheetData");
  container.innerHTML = "";

  if (!data || data.length === 0) {
    container.innerHTML = "⚠️ No data found!";
    return;
  }

  let table = "<table><tr>";
  Object.keys(data[0]).forEach(key => { table += `<th>${key}</th>`; });
  table += "</tr>";

  data.forEach(row => {
    table += "<tr>";
    Object.values(row).forEach(value => {
      table += `<td>${value}</td>`;
    });
    table += "</tr>";
  });

  table += "</table>";
  container.innerHTML = table;
}

// Apply Filters
function applyFilters() {
  const searchText = document.getElementById("searchBox").value.toLowerCase();
  const minRate = parseFloat(document.getElementById("minRate").value) || 0;
  const maxRate = parseFloat(document.getElementById("maxRate").value) || Infinity;
  const stockFilter = document.getElementById("stockFilter").value;

  const filtered = globalData.filter(row => {
    const nameMatch = row["Item Name"].toLowerCase().includes(searchText);
    const rate = parseFloat(row["Rate"]) || 0;
    const rateMatch = rate >= minRate && rate <= maxRate;
    const stock = parseInt(row["Stock"]) || 0;
    let stockMatch = true;

    if (stockFilter === "in") stockMatch = stock > 0;
    if (stockFilter === "out") stockMatch = stock <= 0;

    return nameMatch && rateMatch && stockMatch;
  });

  renderTable(filtered);
}

// Reset Filters
function resetFilters() {
  document.getElementById("searchBox").value = "";
  document.getElementById("minRate").value = "";
  document.getElementById("maxRate").value = "";
  document.getElementById("stockFilter").value = "";
  renderTable(globalData);
}

// Event Listeners
document.getElementById("applyFilter").addEventListener("click", applyFilters);
document.getElementById("resetFilter").addEventListener("click", resetFilters);

// Init
fetchData();
setInterval(fetchData, 60000);
