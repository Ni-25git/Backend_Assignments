const crypto = require('crypto');

function performOperation(operation, operands) {
    switch (operation) {
        case 'add':
            return operands.reduce((acc, num) => acc + parseFloat(num), 0);
        case 'sub':
            return operands.reduce((acc, num) => acc - parseFloat(num));
        case 'mult':
            return operands.reduce((acc, num) => acc * parseFloat(num), 1);
        case 'divide':
            return operands.reduce((acc, num) => acc / parseFloat(num));
        case 'sin':
            return Math.sin(parseFloat(operands[0]));
        case 'cos':
            return Math.cos(parseFloat(operands[0]));
        case 'tan':
            return Math.tan(parseFloat(operands[0]));
        case 'random':
            const length = operands.length > 0 ? parseInt(operands[0], 10) : null;

            if (!length || isNaN(length)) {
                console.log("Provide length for random number generation.");
                return;
            }

            const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
            const randomNumber = parseInt(randomBytes.toString('hex'), 16);

            return randomNumber;
        default:
            console.log('Invalid operation.');
            return;
    }
}

const [,, operation, ...operands] = process.argv;

if (!operation || operands.length === 0) {
    console.log('Usage: node index.js <operation> <operands>');
    process.exit(1);
}


const result = performOperation(operation, operands);

if (result !== undefined) {
    console.log(result);
}
