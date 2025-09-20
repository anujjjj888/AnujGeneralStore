const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1aY1kyz4i8nWVwGoCfKDd_0DjWSzxnhH0nubCLc0tI74/edit?usp=sharing';
const sheetTabName = "AnujGeneral"; // Sheet tab name

function init() {
  Tabletop.init({
    key: publicSpreadsheetUrl,
    simpleSheet: true,
    wanted: [sheetTabName],
    callback: function(data, tabletop) {
      const tbody = document.getElementById("data-table");
      tbody.innerHTML = "";
      data.forEach(row => {
        const tr = document.createElement("tr");
        tr.classList.add("hover:bg-gray-100", "transition");
        tr.innerHTML = `
          <td class="py-3 px-4">${row.Item || ""}</td>
          <td class="py-3 px-4 text-green-600 font-semibold">₹${row.Rate || ""}</td>
          <td class="py-3 px-4">₹${row.MRP || ""}</td>
          <td class="py-3 px-4">${row.Stock || ""}</td>
        `;
        tbody.appendChild(tr);
      });
    }
  });
}

window.addEventListener('DOMContentLoaded', init);
