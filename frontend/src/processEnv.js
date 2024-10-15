const fs = require("fs");
const targetPath = "./src/environments/environment.prod.ts";

// Dynamically set the API key from Vercel environment variables
const envConfigFile = `
export const environment = {
  production: true,
  apiKey: '${process.env.API_KEY}',
};
`;

fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log("Error generating environment file", err);
  } else {
    console.log(`Environment file generated correctly at ${targetPath}`);
  }
});
