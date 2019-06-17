import _ from "lodash";
export default function modifyServerData(temp) {
  const patients = temp.map(d => {
    d.payload = JSON.parse(d.payload);
    d["payload_as_text"] = JSON.parse(d["payload_as_text"]);
    const date = d.timestamp.slice(0, 10);
    d.date = date;
    const time = d.timestamp.slice(12, 16);
    d.time = time;
    return d;
  });
  const sorted = _.orderBy(patients, ["timestamp"], ["asc"]);
  return sorted;
}
