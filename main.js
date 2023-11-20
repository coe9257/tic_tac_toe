const ticTacToeGame = createTicTacToeGame();

document.addEventListener("click", function(event){
    if (event.target.classList.contains('squares')) {
        ticTacToeGame.test_square_empty(event.target);
    }
});

document.addEventListener("click", function(event) {
    let className = event.target.className;
    if (className == "x_icon_button" || className == "o_icon_button") {
        ticTacToeGame.start_game_player_selection(className)
    }
})

function createTicTacToeGame(className) {

    let player_pick = null;
    let computer_pick = null;
    let game_move_status = null;

    const board = {
        row_1_square_1: "",
        row_1_square_2: "",
        row_1_square_3: "",
        row_2_square_1: "",
        row_2_square_2: "",
        row_2_square_3: "",
        row_3_square_1: "",
        row_3_square_2: "",
        row_3_square_3: "",
    }

    function start_game_player_selection(className) {
        console.log(className, className == "x_icon_button");
        if (className == "x_icon_button") {
            player_pick = "X";
            computer_pick = "O";
        }else {
            player_pick = "O";
            computer_pick = "X";
        };
        let parent_container = document.querySelector('.start_game_container');
        let child = document.querySelector('.icon_container');
        console.log(parent_container, child);
        parent_container.removeChild(child);
        start_game();
    }

    function player_choice(square) {
        let class_name_specific = square.classList[0];
        square.textContent = "X";
        board[class_name_specific] = "X";
        computer_move();
    }

    function computer_move() {
        let array = [];
        const squares = document.querySelectorAll('.squares');
        console.log(squares);
        squares.forEach(function (element) {
            if (element.textContent == "") {
                array.push(element);
            }
        });
        if (array.length != 0) {
            const number = math_random(array.length);
            const element_choice = array[number - 1];
            // console.log(`element_choice: `, element_choice, ` array[number]: ${array[number]}`);
            element_choice.textContent = computer_pick;
            const className_computer_pick = element_choice.classList[0];
            board[className_computer_pick] = "O";
            console.log(board);
        }
    }

    function test_square_empty(event) {
        const element = query_selector_element(event);
        let element_text = element.textContent;
        if (element_text == "") {
            player_choice(element)
        }
    }

    function query_selector_element(event) {
        let className = event.classList[0];
        if (className != "") {
            return document.querySelector(`.${className}`);
        }
    }

    function start_game() {
        document.querySelector('h1').textContent = `PLAYER MOVE!`
    }

    function math_random(number) {
        const randomNumber = Math.floor(Math.random() * `${number}`) + 1;
        return randomNumber;
    }

    return {
        start_game_player_selection,
        player_choice,
        test_square_empty,
        query_selector_element,
        start_game,
        computer_move,
        math_random
    }
}

function createElement(type, styles) {
    const element = document.createElement(`type`);
        element.setAttribute(type, `${styles}`);
        return element;
}