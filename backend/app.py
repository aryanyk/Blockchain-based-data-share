from flask import Flask, request, jsonify
from web3 import Web3
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app,supports_credentials=True)

# Connect to Ganache
ganache_url = "http://127.0.0.1:7545"
web3 = Web3(Web3.HTTPProvider(ganache_url))

# Unlock account
web3.eth.default_account = web3.eth.accounts[0]

# Load Contract
with open("contract/ConsentNFT.json") as f:
    abi = json.load(f)['abi']

contract_address = "0x59a1ef4aCAfE06584384c6285Bfa6C4c7d7e8f44"  # Replace with actual
contract = web3.eth.contract(address=contract_address, abi=abi)

# ------------------------------------------
# Routes

@app.route("/")
def index():
    return "ChainConsent Flask API is running ✅"

@app.route("/mint", methods=["POST"])
def mint():
    data = request.json
    print("Received:", data)  # ✅ log input

    what = data.get("what")
    who = data.get("who")
    valid_until = int(data.get("valid_until"))

    try:
        tx_hash = contract.functions.mintConsent(what, who, valid_until).transact()
        receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
        print("Minted NFT, TX:", tx_hash.hex())  # ✅ log tx
        return jsonify({
            "status": "minted",
            "tx": tx_hash.hex(),
            "consentId": contract.functions.consentCounter().call()
        })
    except Exception as e:
        print("❌ Error in mint:", str(e))  # ✅ log error
        return jsonify({"error": str(e)}), 500



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



@app.route("/get_balance", methods=["POST", "OPTIONS"])
def get_balance():
    data = request.json
    consent_id = int(data.get("consent_id"))
    requester = data.get("requester")

    print(f"[DEBUG] Consent ID: {consent_id}")
    print(f"[DEBUG] Requester: {requester}")

    on_chain = contract.functions.consents(consent_id).call()
    print(f"[DEBUG] On-chain whoCanAccess: {on_chain[2]}")

    valid = contract.functions.isValid(consent_id, requester).call()
    print(f"[DEBUG] Consent valid? {valid}")

    if valid:
        return jsonify({"balance": "₹24,000.00"})
    else:
        return jsonify({"error": "Access Denied"}), 403




@app.route("/consent/<int:id>", methods=["GET"])
def get_consent(id):
    try:
        c = contract.functions.consents(id).call()
        return jsonify({
            "user": c[0],
            "whatData": c[1],
            "whoCanAccess": c[2],
            "validUntil": c[3],
            "active": c[4]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 404


# ------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)
