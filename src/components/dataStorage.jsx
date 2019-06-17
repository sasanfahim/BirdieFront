import React, { Component } from "react";
import Table from "./table";
import http from "../services/httpService";
import server from "../services/serverDataAdapter";
class DataStorage extends Component {
  state = { patients: [], searchQuery: "" };
  async componentDidMount() {
    const { data } = await http.get("/hello");
    const temp = [...data];
    const sorted = server(temp);
    this.setState({ patients: sorted });
  }
  handleSearch = query => {
    this.setState({ searchQuery: query });
  };
  render() {
    const { patients, searchQuery } = this.state;
    return (
      <Table
        patients={patients}
        searchQuery={searchQuery}
        query={this.handleSearch}
      />
    );
  }
}

export default DataStorage;
