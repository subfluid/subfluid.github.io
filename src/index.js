


let calculate_accuracy = function(stats){
  let weight = 0;
  let total = 0;
  let weights = [1, 1, 2/3, 1/3, 1/6, 0];
  for (let i = 0; i < 6; i++)
  {
    let count = +stats[i+2];
    weight+=count*weights[i];
    total+=count;
  }
  let str = `${(weight/total*100).toFixed(2)}%`;
  console.log("acc: " + str);
  return str;
}

let update_table = function(){
  let limit = 100;
  let projectid = 514929906; // for now, a random project id for testing.
  $.ajax({
    // bless cors-everywhere
    url: `https://cors-everywhere.herokuapp.com/https://clouddata.scratch.mit.edu/logs?projectid=${projectid}&limit=${limit}&offset=0`,
    type: "GET",
    dataType: "json",
    cache: false,
    success: function(res){
      console.log(res);
      let entries = module.require("parse_leader_entries")(res);
      console.log(entries.length);
      let table = document.getElementById("leaderboard");
      let body = table.getElementsByTagName("tbody")[0];
      $("#leaderboard tbody tr").remove();
      for (let i = 0; i < entries.length; i++)
      {
        let entry = entries[i];
        if (entry.stats.length > 0) // basic check to see if badly formatted score or initialized cloud var
        {
          let row = body.insertRow();
          row.insertCell().innerHTML = entry.stats[0];
          row.insertCell().innerHTML = new Date(entry.timestamp).toUTCString();
          row.insertCell().innerHTML = entry.user;
          row.insertCell().innerHTML = entry.stats[1]
          row.insertCell().innerHTML = calculate_accuracy(entry.stats);
          for (let j = 2; j < 9; j++)
          {
            let cell = row.insertCell();
            cell.innerHTML = entry.stats[j];
          }
        }
      }
    }
  });
}

$(function(){
  $("#getrecent").click(update_table())
})