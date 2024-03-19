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
const crypto_1 = require("crypto");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function generate128bitKey() {
    return (0, crypto_1.randomBytes)(16);
}
function apply_A3_Algorithm(key, RANDNO) {
    // Step 1 : Divide the key and RANDNO into two equal parts of 64 bit each
    const XOR_64_LHS = Buffer.alloc(8);
    const XOR_64_RHS = Buffer.alloc(8);
    const key_LHS_64 = key.slice(0, 8); // Left 64 bits of the key
    const key_RHS_64 = key.slice(8); // Right 64 bits of the key
    const RANDNO_LHS_64 = RANDNO.slice(0, 8); // Left 64 bits of RANDNO
    const RANDNO_RHS_64 = RANDNO.slice(8); // Right 64 bits of RANDNO
    // Step 2 : Do the cross xor to get the required 64bits parts
    const xorResult_64_LHS = Buffer.alloc(8);
    const xorResult_64_RHS = Buffer.alloc(8);
    for (let i = 0; i < 8; i++) {
        xorResult_64_LHS[i] = RANDNO_LHS_64[i] ^ key_RHS_64[i]; // XOR left 64 bits of RANDNO with right 64 bits of the key
        xorResult_64_RHS[i] = RANDNO_RHS_64[i] ^ key_LHS_64[i]; // XOR right 64 bits of RANDNO with left 64 bits of the key
    }
    // Step 3 : Divide these 64bits Parts into two equal 32bits parts
    const xorResult_64_LHS_32_LHS = xorResult_64_LHS.slice(0, 4);
    const xorResult_64_LHS_32_RHS = xorResult_64_RHS.slice(4);
    const xorResult_64_RHS_32_LHS = xorResult_64_RHS.slice(0, 4);
    const xorResult_64_RHS_32_RHS = xorResult_64_RHS.slice(4);
    // Step 4 : Do the corss XOR with the above 64bit's 32 bits parts
    let final_XOR_32_LHS = Buffer.alloc(4);
    let final_XOR_32_RHS = Buffer.alloc(4);
    for (let i = 0; i < 4; i++) {
        final_XOR_32_LHS[i] = xorResult_64_LHS_32_LHS[i] ^ xorResult_64_RHS_32_RHS[i];
        final_XOR_32_RHS[i] = xorResult_64_LHS_32_RHS[i] ^ xorResult_64_RHS_32_LHS[i];
    }
    // Step 5 : Generate the DRES value
    const SRES = Buffer.alloc(4);
    for (let i = 0; i < 4; i++) {
        SRES[i] = final_XOR_32_LHS[i] ^ final_XOR_32_RHS[i];
    }
    return SRES;
}
// Main Function
function simulateGSMProtocol() {
    const key = generate128bitKey();
    const RANDNO = generate128bitKey();
    // Apply A3 Algorithm 
    const AC_SRES = apply_A3_Algorithm(key, RANDNO);
    const mobile_SRES = apply_A3_Algorithm(key, RANDNO);
    // Compare the SRES values for authentication
    console.log(`AC SRES: ${AC_SRES.toString('hex')}`);
    console.log(`Mobile SRES: ${mobile_SRES.toString('hex')}`);
    console.log("Comparing the two sres value");
    if (AC_SRES.equals(mobile_SRES)) {
        console.log('Authentication successful.');
    }
    else {
        console.log('Authentication failed.');
    }
}
simulateGSMProtocol();
