let nintendoGames = [
    { id: 1, title: "Zelda: Breath of the Wild", year: 2017 },
    { id: 2, title: "Super Mario Odyssey", year: 2017 },
    { id: 3, title: "Mario Kart 8 Deluxe", year: 2017 },
];

function renderGames() {
    const $list = $("#gamesList").empty();
    nintendoGames.forEach((game) => {
        $list.append(`
            <li>
                ${game.title} (${game.year})
                <button class="edit" data-id="${game.id}">Edit</button>
                <button class="delete" data-id="${game.id}">Delete</button>
            </li>
        `);
    });
}

$("#gameForm").on("submit", function (e) {
    e.preventDefault();
    const id = $("#gameForm").data("id");
    const title = $("#title").val();
    const year = $("#year").val();

    if (id) {
        const game = nintendoGames.find((g) => g.id === id);
        game.title = title;
        game.year = year;
        $("#gameForm").removeData("id");
    } else {
        nintendoGames.push({ id: Date.now(), title, year });
    }

    $(this)[0].reset();
    renderGames();
});

$(document).on("click", ".edit", function () {
    const game = nintendoGames.find((g) => g.id === $(this).data("id"));
    $("#title").val(game.title);
    $("#year").val(game.year);
    $("#gameForm").data("id", game.id);
});

$(document).on("click", ".delete", function () {
    nintendoGames = nintendoGames.filter((g) => g.id !== $(this).data("id"));
    renderGames();
});

$(document).ready(renderGames);
