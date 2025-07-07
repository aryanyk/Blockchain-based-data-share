# Blockchain-based-data-share


1. Install ganache on local computer
   `https://archive.trufflesuite.com/ganache/`

2. Run ganache using quickstart
   and set the gas limit to 8000000

3. git clone the project and cd blockchain
   and then type
   ` truffle migrate --reset`
   and copy the contract address .

5. Paste the copied contract address to the contract address variable in app.py
6. Also move the consentnft.json file from blockchain contract to  backend contract
7. Cd to the backend and run
   `py app.py`
