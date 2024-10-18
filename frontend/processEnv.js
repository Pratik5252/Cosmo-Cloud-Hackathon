const fs = require("fs");

// Define paths for environment files
const devPath = "./src/environments/environment.ts";
const prodPath = "./src/environments/environment.prod.ts";

// Create the development environment file
const devEnvConfigFile = `
export const environment = {
  production: false,
  apiKey: '${process.env.API_KEY}', // Add a variable for your development API key
};
`;

// Create the production environment file
const prodEnvConfigFile = `
export const environment = {
  production: true,
  apiKey: '${process.env.API_KEY}',
};
`;

// Write the development environment file
fs.writeFile(devPath, devEnvConfigFile, function (err) {
  if (err) {
    console.error("Error generating development environment file", err);
  } else {
    console.log(`Development environment file generated at ${devPath}`);
  }
});

// Write the production environment file
fs.writeFile(prodPath, prodEnvConfigFile, function (err) {
  if (err) {
    console.error("Error generating production environment file", err);
  } else {
    console.log(`Production environment file generated at ${prodPath}`);
  }
});
