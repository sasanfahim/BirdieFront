import React, { Component } from "react";
import _ from "lodash";
import SearchBox from "./searchBox";

class Table extends Component {
  columns = [
    { path: "date", label: "Date" },
    { path: "time", label: "Time" },
    { path: "event_type", label: "Event Type" },
    { path: "payload.task_schedule_note", label: "Task Schedule" },
    { path: "payload.task_definition_description", label: "Task Definition" }
  ];

  render() {
    const { patients, searchQuery, query } = this.props;
    const columns = this.columns;
    let myPatient = patients;

    if (searchQuery) {
      myPatient = patients.filter(patient => patient["date"] > searchQuery);
    }

    return (
      <React.Fragment>
        <SearchBox value={searchQuery} onChange={query} />
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
