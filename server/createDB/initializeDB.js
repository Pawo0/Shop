const { exec } = require('child_process');

const scripts = [
  'node createDB/addUser.js',
  'node createDB/addProducts.js',
  'node createDB/addReviews.js',
  'node createDB/addCarts.js'
];

const runScripts = async () => {
  for (const script of scripts) {
    console.log(`Running: ${script}`);
    await new Promise((resolve, reject) => {
      exec(script, (error, stdout) => {
        if (error) {
          console.error(`Error executing ${script}:`, error);
          reject(error);
        } else {
          console.log(`Output of ${script}:`, stdout);
          resolve();
        }
      });
    });
  }
  console.log('All scripts executed successfully.');
};

runScripts().catch(error => {
  console.error('Error during script execution:', error);
});