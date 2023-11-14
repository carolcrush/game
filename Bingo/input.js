const music = new Audio('./bingo.mp3');
const bingoConditions = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [5, 10, 15, 20, 25],
    [1, 7, 13, 19, 25],
    [5, 9, 13, 17, 21],
  ];

function getNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

let preNumbers = [[], [], [], [], []];

for (let id = 1; id < 26; id++) {
    let column;
    if (id % 5 === 1) {
        column = 0;
    } else if (id % 5 === 2) {
        column = 1;
    } else if (id % 5 === 3) {
        column = 2;
    } else if (id % 5 === 4) {
        column = 3;
    } else {
        column = 4;
    }

    if (id === 13) {
        continue;
    }

    do {
        currentNumber = getNumber(column * 20 + 1, column * 20 + 20);
    } while (preNumbers[column].includes(currentNumber));

    preNumbers[column].push(currentNumber);
    document.querySelector(`#cell${id}`).textContent = currentNumber;
}

function inputNumber() {
    const preNumberElement = document.querySelector("#historyNumber");
    const pastNumbers = preNumberElement.innerHTML;
    const inputNumber = document.querySelector("#number").value;

    if (inputNumber <= 0 || inputNumber >= 100 || isNaN(inputNumber)) {
        alert("Please put in an integer number within 0 and 100!");
        document.querySelector("#number").value = '';
        return;
    }

    for (let id = 1; id < 26; id++) {
        const tdElement = document.querySelector(`#cell${id}`);
        if (inputNumber == tdElement.textContent) { 
            tdElement.style.backgroundColor = "red"; 
        }
    }
    document.querySelector("#number").value = '';
    preNumberElement.innerHTML = pastNumbers + inputNumber + ' ';
    checkBingoCondition();
}

function checkBingoCondition() {
    for (const condition of bingoConditions) {
        const colors = condition.map(cell => {
            const computedStyle = window.getComputedStyle(document.querySelector(`#cell${cell}`));
            console.log(computedStyle.backgroundColor)
            return computedStyle.backgroundColor;
        });

        if (
            colors.every((color, _, arr) =>
                color === arr[0] && color == 'rgb(255, 0, 0)'
            )
        ) {
            music.play();
        }
    }
}

for (let id = 1; id < 26; id++) {
    const preNumberElement = document.querySelector('#historyNumber');
    const tdElement = document.querySelector(`#cell${id}`);
    tdElement.addEventListener("click", function() {
        tdElement.style.backgroundColor = "red";
        const pastNumbers = preNumberElement.innerHTML;
        const clickNumber = tdElement.textContent;
        preNumberElement.innerHTML = pastNumbers + clickNumber + ' ';
        checkBingoCondition();
    });
}

window.document.onkeydown = function(event){
    if (event.key === 'Enter') {
        inputNumber();
    }
}

document.querySelector("#button").addEventListener("click", function() {
    inputNumber();
});