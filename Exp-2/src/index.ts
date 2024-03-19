import * as readlineModule from 'readline';

// Creating interface
const readline = readlineModule.createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question("Enter a two bit input: ", function (input: string) {
    const cipher: string = '01101010110101';
    console.log("XOR operation with Cipher sequence");

    // Splitting the cipher sequence into two parts 
    const mid: number = Math.floor(cipher.length / 2);
    const cipherPart1: string = cipher.slice(0, mid);
    const cipherPart2: string = cipher.slice(mid);

    // XOR operation on input with the above two ciphers
    const xorResult1: string = xorOperation(input[0], cipherPart1);
    const xorResult2: string = xorOperation(input[1], cipherPart2);

    // Joining the result to make final result
    const finalResult: string = xorResult1 + xorResult2;
    console.log("Result after XOR operation is: " + finalResult);

    // Again doing the xor with the cipher sequence
    console.log("Again Applying xor operation with cipher");
    const xorResultFinal: string = xorOperationBitByBit(finalResult, cipher);
    console.log("FinalResult is " + xorResultFinal);

    // Reading the input from the above result 
    console.log("Reading the input from the FinalResult");
    const processedResult: string = xorResultFinal.replace(/0+/g, '0').replace(/1+/g, '1');
    console.log("Input read is: " + processedResult);
    
    readline.close();
});

function xorOperation(inputBit: string, cipherPart: string): string {
    let result: string = '';
    for (let i = 0; i < cipherPart.length; i++) {
        result += (parseInt(inputBit) ^ parseInt(cipherPart[i])).toString();
    }
    return result;
}

function xorOperationBitByBit(input: string, cipher: string): string {
    let result: string = '';
    for (let i = 0; i < input.length; i++) {
        result += (parseInt(input[i]) ^ parseInt(cipher[i])).toString();
    }
    return result;
}
