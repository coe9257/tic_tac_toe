const ticTacToeGame = createTicTacToeGame();

document.addEventListener("click", function(event){
    if (event.target.classList.contains('squares')) {
        const status = ticTacToeGame.game_check();
        if (status == true) {
            ticTacToeGame.test_square_empty(event.target);
        }
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
    let select_piece_html = null;

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

    function start_over(winner) {
        document.querySelector('h1').textContent = `PLAYER SELECT X OR O`;
        player_pick = null;
        computer_pick = null;
        game_move_status = null;

        for (const key in board) {
            if (board.hasOwnProperty(key)) {
                board[key] = "";
            } 
        }

        if (select_piece_html != null) {
            document.querySelector('.start_game_container').appendChild(select_piece_html);
            select_piece_html = null;
        }

        const squares = document.querySelectorAll('.squares');

        squares.forEach(function (element) {
            element.textContent = "";
        })
    }

    function check_win_condition() {

        const winConditions = [
            ["row_1_square_1", "row_1_square_2", "row_1_square_3"],
            ["row_2_square_1", "row_2_square_2", "row_2_square_3"],
            ["row_3_square_1", "row_3_square_2", "row_3_square_3"],
            ["row_1_square_1", "row_2_square_1", "row_3_square_1"],
            ["row_1_square_2", "row_2_square_2", "row_3_square_2"],
            ["row_1_square_3", "row_2_square_3", "row_3_square_3"],
            ["row_1_square_1", "row_2_square_2", "row_3_square_3"],
            ["row_1_square_3", "row_2_square_2", "row_1_square_1"]
        ];

        for (const condition of winConditions) {
            const [a, b, c] = condition;
            if (board[a] === "X" && board[b] === "X" && board[c] === "X") {
                return "X"; // Player "X" won
            } else if (board[a] === "O" && board[b] === "O" && board[c] === "O") {
                return "O"; // Player "O" won
            }
        }

        const isDraw = Object.values(board).every(symbol => symbol === "X" || symbol === "O");

        if (isDraw) {
            document.querySelector('h1').textContent = `IT'S A DRAW!`;
            setTimeout(() => start_over(null), 3000);
            return null;
        }

        return null;
    }

    function start_game_player_selection(className) {
        if (className == "x_icon_button") {
            player_pick = "X";
            computer_pick = "O";
        }else {
            player_pick = "O";
            computer_pick = "X";
        };
        let parent_container = document.querySelector('.start_game_container');
        let child = document.querySelector('.icon_container');
        select_piece_html = child;
        parent_container.removeChild(child);
        game_move_status = true;
        start_game();
    }

    function player_move(square) {
        let class_name_specific = square.classList[0];
        square.textContent = `${player_pick}`;
        board[class_name_specific] = `${player_pick}`;
        let win_condition = check_win_condition()
        if (win_condition == null) {
            computer_move();
        }else if (win_condition != null) {
            document.querySelector('h1').textContent = `PLAYER ${player_pick} IS THE WINNER!`;
            setTimeout(() => start_over(win_condition), 3000);
        }
    }

    function computer_move() {
        let array = [];
        const squares = document.querySelectorAll('.squares');
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
            board[className_computer_pick] = `${computer_pick}`;
        }
        
        let round_check = check_win_condition();
        
        if (round_check != null) {
            document.querySelector('h1').textContent = `PLAYER ${computer_pick} IS THE WINNER!`;
            setTimeout(() => start_over(round_check), 3000);
        };
    }

    function test_square_empty(event) {
        const element = query_selector_element(event);
        let element_text = element.textContent;
        if (element_text == "") {
            player_move(element)
        }
    }

    function query_selector_element(event) {
        let className = event.classList[0];
        if (className != "") {
            return document.querySelector(`.${className}`);
        }
    }

    function start_game() {
        document.querySelector('h1').textContent = `TIC TAC TOE!`
    }

    function math_random(number) {
        const randomNumber = Math.floor(Math.random() * `${number}`) + 1;
        return randomNumber;
    }

    function game_check() {
        if (game_move_status == null) {
            return false;
        } else if (game_move_status == false) {
            return false;
        }else {
            return true;
        }
    }

    return {
        start_game_player_selection,
        player_choice: player_move,
        test_square_empty,
        query_selector_element,
        start_game,
        computer_move,
        math_random,
        check_win_condition,
        game_check,
        start_over
    }
}

function createElement(type, styles) {
    const element = document.createElement(`type`);
        element.setAttribute(type, `${styles}`);
        return element;
}