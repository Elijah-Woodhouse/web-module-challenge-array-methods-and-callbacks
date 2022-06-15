const {fifaData} = require('./fifa.js')
//console.log(fifaData);

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces
of data note.

💡 HINT: You may want to filter the data first 😉*/
const filterYear = fifaData.filter((worldCupFinal) => {
  return worldCupFinal.Year >= 2014 && worldCupFinal.Stage === 'Final';
})

// console.log(filterYear);
//(a) Home Team name for 2014 world cup final
console.log(filterYear[0]["Home Team Name"]);

//(b) Away Team name for 2014 world cup final
console.log(filterYear[0]["Away Team Name"]);

//(c) Home Team goals for 2014 world cup final
console.log(filterYear[0]["Home Team Goals"]);

//(d) Away Team goals for 2014 world cup final
console.log(filterYear[0]["Away Team Goals"]);

//(e) Winner of 2014 world cup final */
console.log(filterYear[0]["Win conditions"]);


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use getFinals to do the following:
1. Receive an array as a parameter that will take the fifa
data as its argument
2. Return an array of objects with the data of the teams that
made it to the final stage

💡 HINT - you should be looking at the stage key inside of the
objects
*/

function getFinals(array) {
  const filterData = fifaData.filter((worldCupFinal) => {
    return worldCupFinal.Stage === 'Final';
  })
  console.log(filterData);
  return filterData;
 }

 getFinals(fifaData);



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the
following:
1. Receive an array as the first parameter that will take
fifaData as an argument
2. Receive a callback function as the second parameter that
will take getFinals from task 2 as an argument
3. Return an array called years containing all of the years in
the getFinals data set*/


function getYears(data, functionCB){
  const arrayOfPops = functionCB(data).map(years => years.Year);
  //console.log(arrayOfPops);
  return arrayOfPops;
}

getYears(fifaData, getFinals);


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:
1. Receive an array as the first parameter that will take fifaData
as an argument
2. Receive a callback function as the second parameter that will take
getFinals from task 2 as an argument
3. Determines the winner (home or away) of each `finals` game.
💡 HINT: Don't worry about ties for now (Please see the README file for
info on ties for a stretch goal.)
4. Returns the names of all winning countries in an array called `winners` */



// function getWinners(data, functionCB) {
//   var winningTeamNames = [];
//   const filterData = functionCB(data).filter((worldCupWinners) => {
//     return worldCupWinners["Home Team Goals"] > worldCupWinners["Away Team Goals"];
//   })
//   const filterData2 = functionCB(data).filter((worldCupWinners2) => {
//     return worldCupWinners2["Away Team Goals"] > worldCupWinners2["Home Team Goals"];
//   })
//   for (let i = 0; i < filterData.length; i++){
//     winningTeamNames.push(filterData[i]["Home Team Name"]);
//   }
//   for (let i = 0; i < filterData2.length; i++){
//     winningTeamNames.push(filterData2[i]["Away Team Name"]);
//   }
//
//   console.log(winningTeamNames);
//   return winningTeamNames;
// }

function getWinners(data, functionCB) {
  const array = functionCB(data).map(winners => winners["Home Team Goals"] > winners["Away Team Goals"] ?
   winners["Home Team Name"] : winners["Away Team Name"]);
  //console.log(array);
  return array;
}

getWinners(fifaData, getFinals);


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array as the first parameter that will take fifaData
as an argument
2. Receive a callback function as the second parameter that will take
getFinals from task 2 as an argument
3. Receive a callback function as the third parameter that will
take getYears from task 3 as an argument
4. Receive a callback function as the fourth parameter that will take
getWinners from task 4 as an argument
5. Return an array of strings that say "In {year}, {country} won
the world cup!"

💡 HINT: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(data, getFinalsCB, getYearsCB, getWinnersCB) {
  var winners = getWinnersCB(data, getFinalsCB);
  var years = getYearsCB(data, getFinalsCB);
  //console.log(winners.map((item, index) => `In ${years[index]}, ${item} won the world cup!`));
  return winners.map((item, index) => `In ${years[index]}, ${item} won the world cup!`);
  }

getWinnersByYear(fifaData, getFinals, getYears, getWinners);



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following:
 1. Receive a callback function in a parameter that will take getFinals
 (from task 2) as an argument and ensure you pass in the fifaData as its
 argument

 💡 HINT: Example of invocation: getAverageGoals(getFinals(fifaData));

 2. Return the the average number of the total home team goals and away team
 goals scored per match and round to the second decimal place.

 💡 HINT: use .reduce, .toFixed (refer to MDN for syntax), and do this in 2
 steps)


*/

function getAverageGoals(getFinalsCB) {
  var finalsArray = getFinalsCB;
  const reduceFinalsGoals = finalsArray.reduce((total, goals) => {
    return total += goals["Home Team Goals"] + goals["Away Team Goals"];
  }, 0);
return (reduceFinalsGoals / finalsArray.length).toFixed(2);
 }

getAverageGoals(getFinals());


/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪
Create a function called `getCountryWins` that takes the parameters `data` and
`team initials` and returns the number of world cup wins that country has had.

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

//use Call back function for data parameter
// get Finals goes into CB function as Data

// function getWinners1(data, functionCB) {
//   const array = functionCB(data).map(winners => winners["Home Team Goals"] > winners["Away Team Goals"] ?
//    winners["Home Team Initials"] : winners["Away Team Initials"]);
//    console.log(array);
//   return array;
// }
//
// getWinners1(fifaData, getFinals);

function getCountryWins(data, functionCB, teamInitials) {
  var counter = 0;
  const array = functionCB(data).map(winners => winners["Home Team Goals"] > winners["Away Team Goals"] ?
  winners["Home Team Initials"] : winners["Away Team Initials"]);
  console.log(array);
  for (let i = 0; i < array.length; i++){
    if (array[i] === teamInitials) {
      counter += 1;
    }
  }
  console.log(counter);
  return counter;
}

getCountryWins(fifaData, getFinals, "URU");


/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪
Write a function called getGoals() that accepts a
parameter `data` and returns
the team with the most goals score per appearance
(average goals for) in the World Cup finals */

// maybe take data from winning team name and put them through
// this first function?
/*
create a loop to see if a team has played a game in the finals.
If that specified team has played in the game then
return the goals to a counter.
display data in a new array as an object of:
"team name" : # of goals scored averaged.

Then use this function as a callback to getGoals function
to see which team has scored the most goals.
*/


function getGoals(getFinalsCB){
  const array = getFinalsCB.map();
}


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and
calculates the team with the most goals scored against them per appearance
(average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
