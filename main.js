const ticTacToeGame = createTicTacToeGame();

document.addEventListener("click", function(event){
    if (event.target.classList.contains('squares')) {
        ticTacToeGame.test_square_empty(event.target);
    }
});

function createTicTacToeGame(className) {

    let player_choice = null;

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

    function player_select(square) {
        // console.log(square);
    }

    function computer_select() {

    }

    function test_square_empty(event) {
        const element = query_selector_element(event);
        let element_text = element.textContent;
        if (element_text == "") {
            player_select(element)
        }
    }

    function query_selector_element(event) {
        let className = event.classList[0];
        if (className != "") {
            return document.querySelector(`.${className}`);
        }
    }

    function start_game() {
        const body  = document.querySelector('body');
        const element = createElement(`h1`, `text-align: center; color: black`);
            body.appendChild(element);
    }

    return {
        test_square_empty,
        player_select,
        computer_select
    }
}

function createElement(type, styles) {
    const element = document.createElement(`type`);
        element.setAttribute(type, `${styles}`);
        return element;
}