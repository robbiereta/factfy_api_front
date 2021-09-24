import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc
} from "firebase/firestore/lite";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwaatnrPGX1cmd_iPQawQy6to-3weRfgM",
  authDomain: "test2-b0c78.firebaseapp.com",
  databaseURL: "https://test2-b0c78-default-rtdb.firebaseio.com",
  projectId: "test2-b0c78",
  storageBucket: "test2-b0c78.appspot.com",
  messagingSenderId: "1020612965446",
  appId: "1:1020612965446:web:eb1e62394169e72485c647",
  measurementId: "G-XYPBVB6JF6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const axios = require("axios");

var folio;
var lista = {
  recibos: []
};
var total;
var prods = "";

async function recibo() {
  // Make a request for a user with a given ID
  async function getCities(db) {
    const citiesCol = collection(db, "tickets");
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map((doc) => doc.data());

    var doubles = cityList.map(function (x) {
      var ticket = x.ticket;
      var id = x.id_ticket;
      var fecha = x.fecha;
      var fecha_sec = x.Fecha_sec;
      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      var date = new Date(x.fecha * 1000);
      var day = date.getDate();
      var mes = date.getMonth() + 1;
      var year = date.getFullYear();
      // Hours part from the timestamp
      var hours = date.getHours();
      // Minutes part from the timestamp
      var minutes = "0" + date.getMinutes();
      // Seconds part from the timestamp
      var seconds = "0" + date.getSeconds();

      // Will display time in 10:30:23 format
      var formattedTime =
        "dia:" +
        day +
        "/" +
        mes +
        " hora:" +
        hours +
        ":" +
        minutes.substr(-2) +
        ":" +
        seconds.substr(-2);

      console.log(formattedTime);
      var total = 0;
      var prods = "";
      console.log("fecha" + fecha);
      ticket.map(function (w) {
        prods += w.descripcion + ",";
        total += Number(w.precio);
        console.log(total);
      });
      var newCon = {
        id: id,
        total: total,
        prods: prods,
        fecha: formattedTime,
        fecha_sec: fecha_sec
      };
      lista.recibos.push(newCon);
      //agregar aqui los campos para las columnas
    });

    return cityList;
  }
  getCities(db);

  console.log(lista.recibos);
}

recibo();

const columns = [
  { field: "prods", headerName: "productos", width: 250 },
  { field: "total", headerName: "total", width: 250 },
  { field: "id", headerName: "id", width: 250 },
  { field: "fecha", headerName: "fecha", width: 250 },
  { field: "fecha_sec", headerName: "fecha_sec", width: 250 }
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
