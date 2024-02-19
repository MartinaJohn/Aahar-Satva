# crescendo2024
## Run Locally

Clone the project

Go to the project directories in separate terminals

```bash
  cd frontend
  cd hardhat
```

Install dependencies for both directories

```bash
  npm install
```

Hardhat terminal
```bash
  npx hardhat node  //dont close this terminal
```
open another terminal
```bash
  npx hardhat run --network localhost scripts/deploy.js
```
Frontend terminal
```bash
  npm run start
```
