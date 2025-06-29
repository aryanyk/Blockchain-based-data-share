from flask import Flask, jsonify, request
from flask_cors import CORS
from web3 import Web3
import os
from dotenv import load_dotenv

load_dotenv()  # Load .env file

app = Flask(__name__)
CORS(app)  # Allow Next.js to call this API

# Connect to Ganache
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:7545")) 
CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")  # Your deployed contract

# Mock user data (replace with real DB later)
users = {
    "0xUserAddress1": {"balance": "$1000", "transactions": []},
    "0xUserAddress2": {"balance": "$500", "transactions": []},
}

@app.route('/check_balance', methods=['POST'])
def check_balance():
    data = request.json
    user_address = data.get('user_address')
    nft_id = data.get('nft_id')

    # TODO: Add NFT validation logic (call smart contract)
    # For now, assume NFT is valid if user exists
    if user_address in users:
        return jsonify(users[user_address])
    else:
        return jsonify({"error": "User not found"}), 404

if __name__ == '__main__':
    app.run(port=5000, debug=True)