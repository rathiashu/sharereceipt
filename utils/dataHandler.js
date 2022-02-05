const fs = require('fs');

// receipts in JSON file for simplicity, store in a db for production applications
let receipts = require('../data/receipt.json');

function getAll() {
    // let receipts = require('../data/receipt.json');
    return receipts;
}

function create(receipt) {
    
    // generate new receipt id
    receipt.id = receipts.length ? Math.max(...receipts.map(x => x.id)) + 1 : 1;

    // set date created and updated
    receipt.dateCreated = new Date().toISOString();
    receipt.dateUpdated = new Date().toISOString();

    // add and save receipt
    receipts.push(receipt);
    saveData();
    return receipt.id;
}

function update(id, params) {
    const receipt = receipts.find(x => x.id.toString() === id.toString());

    // set date updated
    receipt.dateUpdated = new Date().toISOString();

    // update and save
    Object.assign(receipt, params);
    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
// function _delete(id) {
//     // filter out deleted receipt and save
//     receipts = receipts.filter(x => x.id.toString() !== id.toString());
//     saveData();
    
// }

// private helper functions

function saveData() {
    fs.writeFileSync('../data/receipt.json', JSON.stringify(receipts, null, 4));
}


export {
    getAll,
    create
}
