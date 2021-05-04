// Script to interact with human swap pallet and price provider pallet
const { Keyring } = require("@polkadot/api");
const { buildConnection } = require("./connection.js");

function uploadProviderPrice(base, quote, price) {
    return new Promise(async resolve => {
        const keyring = new Keyring({ type: "sr25519" });
        const api = await buildConnection("localvln");
        const sender = keyring.addFromUri("//Alice");
        const hash = api.tx.ratesProvider
        .updatePrice(base, quote, "BankX", price)
        .signAndSend(sender, (result) => {
          console.log(`Current status is ${result.status}`);
          if (result.status.isInBlock) {
            console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
          } else if (result.status.isFinalized) {
            console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
            hash();
            resolve();
          }
        });
    })
}