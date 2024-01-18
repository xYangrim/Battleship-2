// let compPastAttacks = [[0,1], [0,2]];
// let isInPastAttacks = false;

// function checkPastAttacks(a, b, arr) {
//     isInPastAttacks =  arr.some(pos => pos[0] === a && pos[1] === b)
//     return isInPastAttacks;
// }

// isInPastAttacks = checkPastAttacks(0,3, compPastAttacks)

// // console.log(checkPastAttacks(0,1,compPastAttacks))

// console.log(isInPastAttacks)

// let test = false;

// console.log(!test);


function test() {
    if(true) {
        if(true) {
            console.log(`1st nested if - true!`);
        }

        if(true) {
            console.log(`2nd nested if - true!`);
        }
    }
}

console.log(test());