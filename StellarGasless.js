const StellarSdk = require('stellar-sdk');
const fetch = require('node-fetch');

// Set up the Stellar network
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org'); // For testnet
const networkPassphrase = StellarSdk.Networks.TESTNET; // For testnet

// Function to create a transaction
async function createTransaction(sourceAccountId, destinationAccountId, amount, sponsorKeypair) {
    // Load the source account
    const sourceAccount = await server.loadAccount(sourceAccountId);

    // Create a transaction
    const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: networkPassphrase,
    })
    .addOperation(StellarSdk.Operation.payment({
        destination: destinationAccountId,
        asset: StellarSdk.Asset.native(),
        amount: amount,
    }))
    .setTimeout(30)
    .build();

    // Sign the transaction with the source account's keypair
    transaction.sign(StellarSdk.Keypair.fromSecret(sponsorKeypair.secret()));

    return transaction;
}

// Function to submit the transaction
async function submitTransaction(transaction) {
    try {
        const result = await server.submitTransaction(transaction);
        console.log('Transaction successful:', result);
    } catch (error) {
        console.error('Transaction failed:', error);
    }
}

// Example usage
(async () => {
    const sourceAccountId = 'GXXXXXXXXXXXXX...'; // Source account ID
    const destinationAccountId = 'GYYYYYYYYYYYYY...'; // Destination account ID
    const amount = '10'; // Amount to send

    // Sponsor's keypair (they will cover the transaction fee)
    const sponsorKeypair = StellarSdk.Keypair.fromSecret('SXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');

    // Create and submit the transaction
    const transaction = await createTransaction(sourceAccountId, destinationAccountId, amount, sponsorKeypair);
    await submitTransaction(transaction);
})();
