import React from "react";
import { DataGrid } from "@material-ui/data-grid";
const axios = require("axios");
axios.defaults.baseURL = "https://regsserver.herokuapp.com/tickets";
const Facturapi = require("facturapi");
const facturapi = new Facturapi("sk_live_NpE3r9Rl4KadW4JQNm5WM17oXQVng6xZ");
var folio;
var lista = {
  recibos: []
};
var total;
var prods = "";
async function recibo() {
  // Make a request for a user with a given ID
  axios
    .get("/all")
    .then(function (response) {
      var doubles = response.data.map(function (x) {
        var ticket = x.ticket;
        var id = JSON.stringify(x._id);
        total = 0;
        prods = "";
        ticket.map(function (w) {
          prods += w.descripcion + ",";
          total += Number(w.precio);
          console.log("total:" + total);
        });
        var newCon = {
          id: id,
          total: total,
          prods: prods
        };
        lista.recibos.push(newCon);
        //agregar aqui los campos para las columnas
      });

      console.log(lista.recibos);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}

recibo();

const columns = [
  { field: "prods", headerName: "productos", width: 250 },
  { field: "total", headerName: "total", width: 250 },
  { field: "id", headerName: "id", width: 250 }
];
const rows = lista.recibos;
export default function Recibo() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <h1>Recibos</h1>
      {/* <button onClick={global}>Global</button> */}
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={50}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
