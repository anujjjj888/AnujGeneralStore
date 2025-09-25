const sheetUrl = "https://opensheet.elk.sh/1aY1kyz4i8nWVwGoCfKDd_0DjWSzxnhH0nubCLc0tI74/Sheet1";

async function fetchData() {
  try {
    const res = await fetch(sheetUrl);
    const data = await res.json();

    const container = document.getElementById("sheetData");
    container.innerHTML = "";

    if (!data || data.length === 0) {
      container.innerHTML = "⚠️ No data found!";
      return;
    }

    let table = "<table>";
    // table headers
    table += "<tr>";
    Object.keys(data[0]).forEach(key => {
      table += `<th>${key}</th>`;
    });
    table += "</tr>";

    // table rows
    data.forEach(row => {
      table += "<tr>";
      Object.values(row).forEach(value => {
        table += `<td>${value}</td>`;
      });
      table += "</tr>";
    });

    table += "</table>";
    container.innerHTML = table;

  } catch (err) {
    console.error(err);
    document.getElementById("sheetData").innerHTML = "❌ Error loading sheet data!";
  }
}

// initial load
fetchData();
// auto refresh every 1 minute
setInterval(fetchData, 60000);
