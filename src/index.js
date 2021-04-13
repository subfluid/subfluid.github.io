

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
        let row = body.insertRow();
        row.insertCell().innerHTML = entry.stats[0];
        row.insertCell().innerHTML = new Date(entry.timestamp).toUTCString();
        row.insertCell().innerHTML = entry.user;
        for (let j = 1; j < 9; j++)
        {
          let cell = row.insertCell();
          console.log(entry.stats[j]);
          cell.innerHTML = entry.stats[j];
        }
      }
    }
  });
}

$(function(){
  $("#getrecent").click(update_table())
})