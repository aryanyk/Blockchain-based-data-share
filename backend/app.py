from flask import Flask, request, jsonify
from web3 import Web3
import json

app = Flask(__name__)

# Connect to Ganache
ganache_url = "http://127.0.0.1:7545"
web3 = Web3(Web3.HTTPProvider(ganache_url))

# Unlock account
web3.eth.default_account = web3.eth.accounts[0]

# Load Contract
with open("contract/ConsentNFT.json") as f:
    abi = json.load(f)['abi']

contract_address = "0xYourContractAddressHere"  # Replace with actual
contract = web3.eth.contract(address=contract_address, abi=abi)

# ------------------------------------------
# Routes

@app.route("/")
def index():
    return "ChainConsent Flask API is running ✅"

@app.route("/mint", methods=["POST"])
def mint():
    data = request.json
    what = data.get("what")
    who = data.get("who")
    valid_until = int(data.get("valid_until"))  # timestamp

    tx_hash = contract.functions.mintConsent(what, who, valid_until).transact()
    receipt = web3.eth.wait_for_transaction_receipt(tx_hash)

    return jsonify({"status": "minted", "tx": tx_hash.hex(), "consentId": contract.functions.consentCounter().call()})


@app.route("/revoke/<int:consent_id>", methods=["POST"])
def revoke(consent_id):
    tx_hash = contract.functions.revokeConsent(consent_id).transact()
    web3.eth.wait_for_transaction_receipt(tx_hash)
    return jsonify({"status": "revoked", "id": consent_id})


@app.route("/validate", methods=["POST"])
def validate():
    data = request.json
    consent_id = int(data.get("id"))
    requester = data.get("requester")

    valid = contract.functions.isValid(consent_id, requester).call()
    return jsonify({"valid": valid})


# 🧪 Simulated data endpoint
@app.route("/get_balance", methods=["POST"])
def get_balance():
    data = request.json
    consent_id = int(data.get("consent_id"))
    requester = data.get("requester")

    if contract.functions.isValid(consent_id, requester).call():
        return jsonify({"balance": "₹24,000.00"})
    else:
        return jsonify({"error": "Access Denied"}), 403

# ------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)
