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
const readline = __importStar(require("readline"));
// Creating the interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function isOrthogonal(A, B) {
    // Convert binary strings to Array of +1 and -1
    const arrayA = Array.from(A, (bit) => bit === '1' ? +1 : -1);
    const arrayB = Array.from(B, (bit) => bit === '1' ? +1 : -1);
    // Input validation
    if (arrayA.length !== arrayB.length) {
        throw new Error("Input strings must be of the same length");
    }
    // Multiplication of corresponding elements
    let sum = 0;
    for (let i = 0; i < arrayA.length; i++) {
        sum = sum + arrayA[i] * arrayB[i];
    }
    // Check for orthogonality
    if (sum === 0) {
        console.log("Strings are orthogonal");
    }
    else {
        console.log("The strings are not orthogonal");
    }
}
// Taking input from the user and calling the function
rl.question("Enter Value of A: ", function (A) {
    rl.question("Enter Value for B: ", function (B) {
        try {
            isOrthogonal(A, B);
        }
        catch (error) {
            console.error(error.message);
        }
        rl.close();
    });
});
