const sheetId = "1aY1kyz4i8nWVwGoCfKDd_0DjWSzxnhH0nubCLc0tI74";
const sheetName = "Sheet1";
const apiKey = ""; // अगर public access है तो खाली छोड़ सकते हो

let url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}`;
if (apiKey) url += `?key=${apiKey}`;

async function fetchSheetData() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const rows = data.values;
    const tbody = document.getElementById("data-table");

    if (!rows || rows.length < 2) {
      tbody.innerHTML = `<tr><td colspan="4" class="text-center py-4">No data found</td></tr>`;
      return;
    }

    const htmlRows = rows.slice(1).map(row => `
      <tr>
        <td class="py-3 px-4">${row[0] || ""}</td>
        <td class="py-3 px-4 text-green-600 font-semibold">₹${row[1] || ""}</td>
        <td class="py-3 px-4">₹${row[2] || ""}</td>
        <td class="py-3 px-4">${row[3] || ""}</td>
      </tr>
    `).join("");

    tbody.innerHTML = htmlRows;

  } catch (err) {
    console.error("Error fetching sheet data:", err);
    document.getElementById("data-table").innerHTML = `<tr><td colspan="4" class="text-center py-4">⚠️ Failed to load data</td></tr>`;
  }
}

fetchSheetData();
setInterval(fetchSheetData, 60000); // हर 1 मिनट auto refresh
