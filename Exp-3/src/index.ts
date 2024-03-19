import * as readline from 'readline';

// Creating the interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function isOrthogonal(A: string, B: string): void {
    // Convert binary strings to Array of +1 and -1
    const arrayA: number[] = Array.from(A, (bit: string) => bit === '1' ? +1 : -1);
    const arrayB: number[] = Array.from(B, (bit: string) => bit === '1' ? +1 : -1);
    
    // Input validation
    if(arrayA.length !== arrayB.length) {
        throw new Error("Input strings must be of the same length");
    }

    // Multiplication of corresponding elements
    let sum: number = 0;
    for (let i = 0; i < arrayA.length; i++) {
        sum = sum + arrayA[i] * arrayB[i];
    }

    // Check for orthogonality
    if (sum === 0) {
        console.log("Strings are orthogonal");
    } else {
        console.log("The strings are not orthogonal");
    }
}

// Taking input from the user and calling the function
rl.question("Enter Value of A: ", function (A: string) {
    rl.question("Enter Value for B: ", function (B: string) {
        try {
            isOrthogonal(A, B);  
        } catch (error) {
            console.error((error as Error).message);
        }
        rl.close();
    });
});
