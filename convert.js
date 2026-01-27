const fs = require("fs");

// Read JSON
const data = JSON.parse(fs.readFileSync("copy.json", "utf8"));

// Convert object → array
const rows = Object.values(data);

// Get CSV headers
const headers = Object.keys(rows[0]);

// Build CSV
const csv = [
  headers.join(","), // header row
  ...rows.map((row) =>
    headers
      .map((h) => `"${(row[h] ?? "").toString().replace(/"/g, '""')}"`)
      .join(","),
  ),
].join("\n");

// Write file
fs.writeFileSync("new.csv", csv);

console.log("CSV created: new.csv");
