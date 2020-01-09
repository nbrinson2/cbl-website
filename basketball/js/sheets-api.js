let dates = new Array();
let todaysDate = new Date();
let formattedDate = `${todaysDate.getMonth() + 1}/${todaysDate.getDate()}/${todaysDate.getFullYear()}`;

formattedDate = formattedDate.split("/");
let todaysMonth = this.parseInt(formattedDate[0]);
let todaysDay = this.parseInt(formattedDate[1]);
let todaysYear = this.parseInt(formattedDate[2]);
const monthNames = ["jan", "feb", "mar", "apr", "may", "june",
    "july", "aug", "sept", "oct", "nov", "dec"
];

let games = new Array();
let upcomingGames = new Array();
let game = {
    date: "",
    time: "",
    homeTeam: "",
    awayTeam: "",
    court: ""
}

function myCallback(spreadsheetdata) {
    let i = 5;
    try {
        while (spreadsheetdata.feed.entry[i].content.$t) {

            // Look for unique dates in spreadsheet
            if (dates.includes(spreadsheetdata.feed.entry[i].content.$t)) {
                game.date = spreadsheetdata.feed.entry[i].content.$t;
                game.time = spreadsheetdata.feed.entry[i + 1].content.$t
                game.homeTeam = spreadsheetdata.feed.entry[i + 2].content.$t;
                game.awayTeam = spreadsheetdata.feed.entry[i + 3].content.$t
                game.court = spreadsheetdata.feed.entry[i + 4].content.$t;
                games.push(game);
                game = {};

                i = i + 5;
                continue;
            } else {
                dates.push(spreadsheetdata.feed.entry[i].content.$t);
                game.date = spreadsheetdata.feed.entry[i].content.$t;
                game.time = spreadsheetdata.feed.entry[i + 1].content.$t
                game.homeTeam = spreadsheetdata.feed.entry[i + 2].content.$t;
                game.awayTeam = spreadsheetdata.feed.entry[i + 3].content.$t
                game.court = spreadsheetdata.feed.entry[i + 4].content.$t;
                games.push(game);
                game = {};

                i = i + 5;
            }

        }
    } catch (error) {
        console.log("barry");
    }
    console.log(dates);
    console.log(games);

    document.querySelector(".game-day-of-the-month").innerHTML = spreadsheetdata.feed.entry[7].content.$t[2];
}

window.onload = function identifyUpcomingGames() {
    games.forEach(game => {

        let monthDayYear = game.date.split("/");

        // Check for the next week's upcoming games
        if (this.parseInt(monthDayYear[0]) === todaysMonth &&
            this.parseInt(monthDayYear[1]) >= todaysDay &&
            this.parseInt(monthDayYear[1]) < (todaysDay + 7)) {
            upcomingGames.push(game);
        }
    });

    // Display data from sheet api on index.html
    document.querySelector("#court-one-teams-six").innerHTML = `${upcomingGames[0].homeTeam} vs. ${upcomingGames[0].awayTeam}`;
    document.querySelector(".time-slot-six").innerHTML = `${upcomingGames[0].time}`;
    document.querySelector(".court-one").innerHTML = `CLA - ${upcomingGames[0].court}`;

    let dateClass = document.getElementsByClassName(".date");
    for (let index = 0; index < dateClass.length; index++) {
        dateClass[index].innerHTML = "fairy";
    }
    //document.querySelector(".date").children[0].innerHTML = "Fairy";
    // `${(upcomingGames[0].date.split("/"))[1]}` + document.querySelector(".individual-game-day").innerHTML;
    document.querySelector(".individual-game-month").innerHTML = `${monthNames[(upcomingGames[0].date.split("/"))[0] - 1]}`;




    console.log(upcomingGames);
}