import React, { Component } from "react";
import http from "../services/httpService";
import _ from "lodash";
import SearchBox from "./searchBox";

class Table extends Component {
  state = { patients: [], searchQuery: "" };
  async componentDidMount() {
    const { data } = await http.get("/hello");
    const temp = [...data];
    const patients = temp.map(d => {
      //const s = { ...d };
      d.payload = JSON.parse(d.payload);
      d["payload_as_text"] = JSON.parse(d["payload_as_text"]);
      const date = d.timestamp.slice(0, 10);
      d.date = date;
      const time = d.timestamp.slice(12, 16);
      d.time = time;
      return d;
    });
    const sorted = _.orderBy(patients, ["timestamp"], ["asc"]);

    this.setState({ patients: sorted });
  }
  columns = [
    { path: "date", label: "Date" },
    { path: "time", label: "Time" },
    { path: "event_type", label: "Event Type" },
    { path: "payload.task_schedule_note", label: "Task Schedule" },
    { path: "payload.task_definition_description", label: "Task Definition" }
  ];
  handleSearch = query => {
    this.setState({ searchQuery: query });
  };
  render() {
    const { patients, searchQuery } = this.state;
    const columns = this.columns;
    let myPatient = patients;

    if (searchQuery) {
      myPatient = patients.filter(patient => patient["date"] > searchQuery);
    }

    return (
      <React.Fragment>
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              {columns.map(column => (
                <th key={column.path}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="table-success">
            {myPatient.map(patient => (
              <tr key={patient.id}>
                {columns.map(column => (
                  <td key={column.path}>{_.get(patient, column.path)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Table;
