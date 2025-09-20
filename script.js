const sheetId = "1aY1kyz4i8nWVwGoCfKDd_0DjWSzxnhH0nubCLc0tI74";
const sheetName = "AnujGeneral"; // tab name
const url = `https://opensheet.elk.sh/${sheetId}/${sheetName}`;

async function fetchSheetData() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const rows = data;
    const tbody = document.getElementById("data-table");

    if (!rows || rows.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" class="text-center py-4">No data found</td></tr>`;
      return;
    }

    const htmlRows = rows.map(row => `
      <tr class="hover:bg-gray-100 transition">
        <td class="py-3 px-4">${row.Item || ""}</td>
        <td class="py-3 px-4 text-green-600 font-semibold">₹${row.Rate || ""}</td>
        <td class="py-3 px-4">₹${row.MRP || ""}</td>
        <td class="py-3 px-4">${row.Stock || ""}</td>
      </tr>
    `).join("");

    tbody.innerHTML = htmlRows;

  } catch (err) {
    console.error("Error fetching sheet data:", err);
    document.getElementById("data-table").innerHTML = `<tr><td colspan="4" class="text-center py-4">⚠️ Failed to load data</td></tr>`;
  }
}

fetchSheetData();
setInterval(fetchSheetData, 60000);
