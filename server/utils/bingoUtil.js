// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min)) + min;
// }
// function checkArray(number, array) {
//     // console.log("Checking array for" + number);
//     for (var count = 0; count < array.length; count++) {
//         if (array[count] == number) {
//             return true;
//         }
//     }
//     return false;
// }
class randomModel {
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    checkArray(number, array) {
        for (let count = 0; count < array.length; count++) {
            if (array[count] == number) {
                return true;
            }
        }
        return false;
    }
}



module.exports = randomModel;