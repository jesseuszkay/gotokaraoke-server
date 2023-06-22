const fs = require("fs");

// Read input JSON file
fs.readFile("./data/fix_years.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Parse the input JSON array
  const inputArray = JSON.parse(data);

  // Extract the inner objects
  const outputArray = [];
  inputArray.forEach((item) =>
    outputArray.push([item.song_id, item.year_released])
  );

  // Convert the output array to JSON
  const outputJson = JSON.stringify(outputArray);

  // Write the output JSON to another file
  fs.writeFile("./data/another.json", outputJson, "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log("Output JSON file has been written successfully.");
  });
});
