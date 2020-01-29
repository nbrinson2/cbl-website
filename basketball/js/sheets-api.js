let dates = new Array();
let todaysDate = new Date();
let formattedDate = `${todaysDate.getMonth() + 1}/${todaysDate.getDate()}/${todaysDate.getFullYear()}`;
formattedDate = formattedDate.split("/");

let todaysMonth = this.parseInt(formattedDate[0]);
let todaysDay = this.parseInt(formattedDate[1]);
let todaysYear = this.parseInt(formattedDate[2]);

// Check for end of the month in regards to upcoming games
if (todaysDay > (this.lastDayOfMonth(todaysYear,todaysMonth) - 7)) {
    todaysMonth = todaysMonth + 1;
    todaysDay = 1;
}

const monthNames = ["jan", "feb", "mar", "apr", "may", "june",
    "july", "aug", "sept", "oct", "nov", "dec"
];
const monthNamesFull = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
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
        //console.log("Testing");
    }
    //console.log(dates);
    //console.log(games);
}

function compare(a, b) {
    const timeA = this.parseInt(a.time[0]);
    const timeB = this.parseInt(b.time[0]);

    let comparison = 0;
    if (timeA > timeB) {
        comparison = 1;
    } else if (timeA < timeB) {
        comparison = -1;
    }
    return comparison;
}

function lastDayOfMonth (year, month) {
    return new Date(year, month + 1, 0).getDate();
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

        upcomingGames.sort(compare);

    });

    let upcomingGamesDateSplit = upcomingGames[0].date.split("/");

    // Display data from sheet api on index.html
    document.querySelector("#upcoming-games-date").innerHTML = `${monthNamesFull[upcomingGamesDateSplit[0] - 1]} ${upcomingGamesDateSplit[1]}, ${upcomingGamesDateSplit[2]}`;
    document.querySelector("#teams-six-court-a").innerHTML = `${upcomingGames[0].homeTeam} vs. ${upcomingGames[0].awayTeam}`;
    document.querySelector("#teams-six-court-b").innerHTML = `${upcomingGames[1].homeTeam} vs. ${upcomingGames[1].awayTeam}`;
    document.querySelector("#teams-seven-court-a").innerHTML = `${upcomingGames[2].homeTeam} vs. ${upcomingGames[2].awayTeam}`;
    document.querySelector("#teams-seven-court-b").innerHTML = `${upcomingGames[3].homeTeam} vs. ${upcomingGames[3].awayTeam}`;
    document.querySelector("#teams-eight-court-a").innerHTML = `${upcomingGames[4].homeTeam} vs. ${upcomingGames[4].awayTeam}`;
    document.querySelector("#teams-eight-court-b").innerHTML = `${upcomingGames[5].homeTeam} vs. ${upcomingGames[5].awayTeam}`;
    document.querySelector("#teams-nine-court-a").innerHTML = `${upcomingGames[6].homeTeam} vs. ${upcomingGames[6].awayTeam}`;
    document.querySelector("#teams-nine-court-b").innerHTML = `${upcomingGames[7].homeTeam} vs. ${upcomingGames[7].awayTeam}`;

    let dateClass = document.querySelectorAll(".date");
    let courtAClass = document.querySelectorAll(".court-a");
    let courtBClass = document.querySelectorAll(".court-b");
    let timeSlotSixClass = document.querySelectorAll(".time-slot-six");
    let timeSlotSevenClass = document.querySelectorAll(".time-slot-seven");
    let timeSlotEightClass = document.querySelectorAll(".time-slot-eight");
    let timeSlotNineClass = document.querySelectorAll(".time-slot-nine");

    for (let index = 0; index < timeSlotSixClass.length; index++) {
        timeSlotSixClass[index].innerHTML = upcomingGames[0].time;
        timeSlotSevenClass[index].innerHTML = upcomingGames[2].time;
        timeSlotEightClass[index].innerHTML = upcomingGames[4].time;
        timeSlotNineClass[index].innerHTML = upcomingGames[6].time;

    }

    for (let index = 0; index < courtAClass.length; index++) {
        courtAClass[index].innerHTML = `CLA - ${upcomingGames[0].court}`;
        courtBClass[index].innerHTML = `CLA - ${upcomingGames[1].court}`;
        //console.log(courtAClass[index]);
    }

    for (let index = 0; index < dateClass.length; index++) {
        dateClass[index].children[0].children[0].innerHTML = `${monthNames[upcomingGamesDateSplit[0] - 1]}`;
        dateClass[index].children[0].innerHTML = `${upcomingGamesDateSplit[1]} ${dateClass[index].children[0].innerHTML}`
    }

    //console.log(upcomingGames);
}