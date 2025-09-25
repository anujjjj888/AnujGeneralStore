const sheetUrl = "https://opensheet.elk.sh/1aY1kyz4i8nWVwGoCfKDd_0DjWSzxnhH0nubCLc0tI74/Sheet1";

let globalData = [];

// Fetch and Render Data
async function fetchData() {
  try {
    const res = await fetch(sheetUrl);
    const data = await res.json();
    globalData = data; // store data globally
    renderTable(data);
  } catch (err) {
    console.error("Fetch error:", err);
    document.getElementById("sheetData").innerHTML = "❌ Error loading sheet data!";
  }
}

// Render table with optional filter
function renderTable(data) {
  const container = document.getElementById("sheetData");
  container.innerHTML = "";

  if (!data || data.length === 0) {
    container.innerHTML = "⚠️ No data found!";
    return;
  }

  let table = "<table>";
  // Table headers
  table += "<tr>";
  Object.keys(data[0]).forEach(key => {
    table += `<th>${key}</th>`;
  });
  table += "</tr>";

  // Table rows
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

// Filter function
document.addEventListener("input", (e) => {
  if (e.target.id === "searchBox") {
    const searchText = e.target.value.toLowerCase();
    const filtered = globalData.filter(row =>
      row["Item Name"].toLowerCase().includes(searchText) ||
      row["Rate"].toLowerCase().includes(searchText) ||
      row["MRP"].toLowerCase().includes(searchText) ||
      row["Stock"].toLowerCase().includes(searchText)
    );
    renderTable(filtered);
  }
});

// Initial fetch + auto refresh
fetchData();
setInterval(fetchData, 60000);
