"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readlineModule = __importStar(require("readline"));
// Creating interface
const readline = readlineModule.createInterface({
    input: process.stdin,
    output: process.stdout
});
readline.question("Enter a two bit input: ", function (input) {
    const cipher = '01101010110101';
    console.log("XOR operation with Cipher sequence");
    // Splitting the cipher sequence into two parts 
    const mid = Math.floor(cipher.length / 2);
    const cipherPart1 = cipher.slice(0, mid);
    const cipherPart2 = cipher.slice(mid);
    // XOR operation on input with the above two ciphers
    const xorResult1 = xorOperation(input[0], cipherPart1);
    const xorResult2 = xorOperation(input[1], cipherPart2);
    // Joining the result to make final result
    const finalResult = xorResult1 + xorResult2;
    console.log("Result after XOR operation is: " + finalResult);
    // Again doing the xor with the cipher sequence
    console.log("Again Applying xor operation with cipher");
    const xorResultFinal = xorOperationBitByBit(finalResult, cipher);
    console.log("FinalResult is " + xorResultFinal);
    // Reading the input from the above result 
    console.log("Reading the input from the FinalResult");
    const processedResult = xorResultFinal.replace(/0+/g, '0').replace(/1+/g, '1');
    console.log("Input read is: " + processedResult);
    readline.close();
});
function xorOperation(inputBit, cipherPart) {
    let result = '';
    for (let i = 0; i < cipherPart.length; i++) {
        result += (parseInt(inputBit) ^ parseInt(cipherPart[i])).toString();
    }
    return result;
}
function xorOperationBitByBit(input, cipher) {
    let result = '';
    for (let i = 0; i < input.length; i++) {
        result += (parseInt(input[i]) ^ parseInt(cipher[i])).toString();
    }
    return result;
}
