# Stellar-XLM-Gas-Less-Transaction
Stellar XLM Gas-Less Transaction

Gas-less transactions on the Stellar (XLM) blockchain can be achieved using a concept known as "sponsored transactions." This approach allows a third party to pay the transaction fees on behalf of the user, which is useful for creating a more user-friendly experience where users do not need to hold XLM for transaction fees.

Below is an advanced example of source code to implement gas-less transactions on the Stellar blockchain using JavaScript and the Stellar SDK. This code involves using a sponsor to cover transaction fees for a user.

Note: Stellar does not natively support gas-less transactions in the same way Ethereum does. However, you can achieve similar functionality by having a sponsor pay the transaction fees.

1. Setup Stellar SDK
First, ensure you have the Stellar SDK installed:

`npm install stellar-sdk`
