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
const Facturapi = require("facturapi");
const receipt = require("receipt");
const facturapi = new Facturapi("sk_live_NpE3r9Rl4KadW4JQNm5WM17oXQVng6xZ");

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

var factura_templ = {
  Version: "3.3",
  Serie: "A",
  Folio: "2",
  Fecha: "2021-09-20T12:00:00",
  FormaPago: "01",
  SubTotal: "1.00",
  Moneda: "MXN",
  Total: "1.16",
  MetodoPago: "PUE",
  LugarExpedicion: "58297",
  TipoDeComprobante: "I",
  Emisor: {
    Rfc: "ZUÑ920208KL4",
    Nombre: "ZAPATERIA URTADO ÑERI SA DE CV",
    RegimenFiscal: "601"
  },
  Receptor: {
    Rfc: "XAXX010101000",
    Nombre: "PUBLICO EN GENERAL",
    UsoCFDI: "G01"
  },
  Conceptos: {
    Concepto: [
      {
        ClaveProdServ: "01010101",
        ClaveUnidad: "E48",
        NoIdentificacion: "00001",
        Cantidad: "1",
        Unidad: "Unidad de Servicio",
        Descripcion: "Prueba Timbrado",
        ValorUnitario: "1.00",
        Importe: "1.00",
        Impuestos: {
          Traslados: {
            Traslado: [
              {
                Base: "1",
                Impuesto: "002",
                TipoFactor: "Tasa",
                TasaOCuota: "0.160000",
                Importe: "0.16"
              }
            ]
          }
        }
      }
    ]
  },
  Impuestos: {
    TotalImpuestosTrasladados: "0.16",
    Traslados: {
      Traslado: [
        {
          Impuesto: "002",
          TipoFactor: "Tasa",
          TasaOCuota: "0.160000",
          Importe: "0.16"
        }
      ]
    }
  }
};

let encoded = base64json.stringify(factura_templ, null, 2);
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
    //agregar aqui los campos para las columnas
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
          type="date"
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
