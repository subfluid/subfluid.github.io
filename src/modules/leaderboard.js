let parse_leader_entries = function(json)
{
  // returned entries
  let entries = new Array();
  // expected to be a json response from https://clouddata.scratch.mit.edu/logs?projectid=PROJECTID&limit=LIMIT&offset=OFFSET
  let history = json;
  // for each entry in cloud history
  for (let i = 0; i < history.length; i++)
  {
    let score = history[i];

    score.stats = new Array();
    // stats represents basic numerical stats of a play (csv-esque format)
    // indexing:
    // [0], map ID
    // [1], score
    // [2-7], epic+, epic, cool, okay, bad, miss
    // [8] MAX combo
    // [9] Song playback rate * 1000
    // N/A [10] pp ???????????????????????????????????????????????????????????????????

    // parse cloud string
    let v = score.value;
    let len = v.length>>1;
    let cumulative = "";
    for (let index = 0; index < len; index++)
    {
      let sub = v.substr(index*2, 2); // current
      let num = +sub;
      if (num === 0) // type delimiter
      {
        score.stats.push(cumulative);
        cumulative = "";
        continue;
      }
      cumulative += (num-1);
    }
    entries.push(score);
  }
  return entries;
}

module.export("parse_leader_entries", parse_leader_entries);