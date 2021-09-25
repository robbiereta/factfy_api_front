import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import jquery from "jquery";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter
} from "mdb-react-ui-kit";

import "./styles.css";
import "./styles.css";
import DropDown from "./select";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where
} from "firebase/firestore/lite";
const axios = require("axios").default;
const base64json = require("base64json");
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
var base64 = require("base-64");
var notas = {
  partidas: []
};
var output;
var tickets = [];
var $ = jquery;
var elements;
for (let index = 0; index < tickets.length; index++) {
  const element = tickets[index];
}
var fecha = moment().format("MMMM Do YYYY, h:mm:ss a");

const receipt = require("receipt");

function nuevoCorte(params) {
  var fechaCorte = Date.now();
}
var url;
var folio;
var fecha_fin;
var fecha_inicio;

async function recibo() {
  const receipt2 = await facturapi.receipts.create({
    payment_form: Facturapi.PaymentForm.EFECTIVO,
    items: notas.partidas
  });
  url = "<h6>" + receipt2.self_invoice_url + "</h61>";
  folio = receipt2.folio_number;
  console.log(url);

  $("#factura").append(url);
  $("#recibo").click();
}
var lista = {
  recibos: []
};

async function global() {
  const citiesCol = collection(db, "notas_factura");
  console.log(fecha_inicio);
  const q = query(
    collection(db, "notas_factura"),
    where("concepto", "==", "Venta")
  );
  const citySnapshot = await getDocs(q);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  console.log(cityList);

  var doubles = cityList.map(function (x) {
    var ticket = x.ticket;
    var id = x.id_ticket;
    var fecha = x.Fecha;

    if (fecha > fecha_fin) {
      var total = 0;
      var prods = "";

      ticket.map(function (w) {
        prods += w.descripcion + ",";
        total += Number(w.precio);
        console.log("t:" + total);
      });
      var newCon = {
        id: id,
        total: total,
        prods: prods,
        fecha: fecha
      };
      lista.recibos.push(newCon);
    }
    console.log(lista.recibos);
  });
  var axios = require("axios");
  var data = JSON.stringify({
    emisor: {
      uuid: "507d0fa0-9496-424d-9b43-a01a25843f98"
    },
    receptor: {
      uuid: "c9d2ba34-53f9-45cd-83ff-f29ebc3e39e2"
    },
    factura: {
      fecha: "2019-07-25 10:22:18",
      tipo: "ingreso",
      generacion_automatica: true,
      subtotal: 2000,
      impuesto_federal: 320,
      total: 2320,
      conceptos: [
        {
          clave_producto_servicio: "76111500",
          clave_unidad_de_medida: "E48",
          cantidad: 1,
          descripcion: "SERVICIO DE LIMPIEZA",
          valor_unitario: 2000,
          total: 2000
        }
      ]
    }
  });

  var config = {
    method: "post",
    url: "https://api-sandbox.facturify.com/api/v1/factura",
    headers: {
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBpLXNhbmRib3guZmFjdHVyaWZ5LmNvbVwvYXBpXC92MVwvYXV0aCIsImlhdCI6MTYzMjI2MDQzMCwiZXhwIjoxNjMyMzQ2ODMwLCJuYmYiOjE2MzIyNjA0MzAsImp0aSI6IkN5Q21qOEFxdkxDeEFlRWoiLCJzdWIiOjEwMDIsInBydiI6IjBhNWI5MDAwZDM0YTEzOTYxMThlNTQ4MzQyZWM0NDAxNmYwOGMzMzEifQ.aCurxhsbOjuLch2tWbwPSDwPrB4Gh8o7wuaRvcoHLdxB63hvXO4vMce4DY6MB3mlH6nrdEEGKAPaIuO-kWJkhw",
      "Content-Type": "application/json"
    },
    data: data
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}

var ticket = (
  <div id="ticket">
    <div id="invoice-POS">
      <div id="mid">
        <div class="info">
          <p>Alma Alicia Flores Zavala</p>
          <p>
            FOZA8801257C2 Carrera Torres 742 Heroe de Nacozari Ciudad Victoria
            Tamps. c.p.87030
          </p>
        </div>
      </div>

      <div id="bot">
        <div id="table">
          <table id="tableElement">
            <tbody>
              <tr class="tabletitle">
                <td class="item">Cantidad</td>
                <td class="Hours">Producto</td>
                <td class="Rate">Importe</td>
              </tr>

              <tr class="tabletitle" id="totalTicket">
                <td class="Rate">
                  <p>Total</p>
                </td>
                <td class="payment">
                  <p id="total">0</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div id="factura">
          <h3>Si necesita factura de este recibo favor de entrar a :</h3>
        </div>
      </div>
    </div>
  </div>
);

export default function Global() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => jsonCambio(data);
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("fecha_inicio")}
          placeholder="fecha inicio"
        />
        <DateTimePicker />
        <input type="text" {...register("fecha_fin")} placeholder="fecha fin" />

        <MDBBtn color="success" type="submit" value="agregar">
          Agregar{""}
        </MDBBtn>
      </form>
      <div id="ticket_content"></div>
      <MDBBtn onClick={global}>Hacer Factura global</MDBBtn>

      <>
        <MDBBtn id="recibo" onClick={toggleShow}>
          Ver recibo
        </MDBBtn>
        <MDBModal
          show={basicModal}
          getOpenState={(e: any) => setBasicModal(e)}
          tabIndex="-1"
        >
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Recibo</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShow}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>{ticket}</MDBModalBody>

              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={toggleShow}>
                  Cerrar
                </MDBBtn>
                <MDBBtn onClick={print}>Imprimir</MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </>
    </div>
  );
}
function print(ticket) {
  var printContents = document.getElementById("ticket").innerHTML;
  var originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;

  window.print();

  document.body.innerHTML = originalContents;
}
var total;
var rec;

async function jsonCambio(data) {
  fecha_inicio = data.fecha_inicio;
  fecha_fin = data.fecha_fin;
  var finicio = Date.parse(fecha_inicio);
  var ffin = Date.parse(fecha_fin);
  var total2 = 0;

  console.log("total:" + total2);
  alert("El Total de este dia es de :" + total2);
  jquery("#root").append("Total de hoy:" + total2);
}
