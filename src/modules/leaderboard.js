let parse_leader_entries = function(json)
{
  // returned entries
  let entries = new Array();
  // expected to be a json response from https://clouddata.scratch.mit.edu/logs?projectid=PROJECTID&limit=LIMIT&offset=OFFSET
  let history = JSON.parse(json);
  // for each entry in cloud history
  for (let i = 0; i < history.length; i++)
  {
    let score = history[i];

    score.stats = new Array();
    // stats represents basic numerical stats of a play (csv-esque format)
    // indexing:
    // [0], score
    // [1-6], epic+, epic, cool, okay, bad, miss
    // N/A [7] possibly 'unstable rate' or some other cool stat (not implemented yet)
    // N/A [8] pp ???????????????????????????????????????????????????????????????????

    // parse cloud string
    let v = score.value;
    let len = v.length>>1;
    let cumulative = "";
    for (let j = 0; j < len; j++)
    {
      let sub = v.substr(j*2, 2); // current
      let num = parseInt(sub);
      if (num == 0) // type delimiter
      {
        score.stats.push(cumulative);
        cumulative = "";
      }
      if (num < 11)
        cumulative += Number.toString(num-1);
    }

    entries.push(score);
  }
  return entries;
}

module.export("parse_leader_entries", parse_leader_entries);