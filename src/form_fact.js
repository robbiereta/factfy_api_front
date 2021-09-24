import React, { useState } from "react";
import { useForm } from "react-hook-form";
import jquery from "jquery";
import moment from "moment";
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
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc
} from "firebase/firestore/lite";
import { v4 as uuidv4 } from "uuid";
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
var total;
var prods = "";
// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, "tickets");
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  console.log(cityList);
  var doubles = cityList.map(function (x) {
    var ticket = x.ticket;
    var id = x.id_ticket;
    var total = 0;
    var prods = "";
    console.log(id);
    ticket.map(function (w) {
      prods += w.descripcion + ",";
      total += Number(w.precio);
      console.log(total);
    });
  });
  return cityList;
}

getCities(db);

var notas = {
  partidas: []
};

var tickets = [];
var $ = jquery;


for (let index = 0; index < tickets.length; index++) {
  const element = tickets[index];
}

var fecha = moment().unix();
console.log(fecha);

const receipt = require("receipt");


const axios = require("axios");
var total;
var url;
var result;
var cambio;
async function recibo() {
  try {
    var id = uuidv4();
    var total3 = 0;

    tickets.map(function (w) {
      total3 += Number(w.precio);
    });
    const docRef = await addDoc(collection(db, "tickets"), {
      ticket: notas.partidas,
      id_ticket: id,
      Fecha_sec: fecha,
      fecha: new Date(),
      total: total3
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  try {
    var id = uuidv4();
    var total3 = 0;

    tickets.map(function (w) {
      total3 += Number(w.precio);
      console.log("total_recibo" + total3);
    });
    const docRef = await addDoc(collection(db, "notas_factura"), {
      ticket: tickets,
      id_ticket: id,
      Fecha_sec: fecha,
      fecha: new Date(),
      concepto: "Venta",
      total: total3,
      unidad: "ACT",
      claveprodserv: "01010101"
    });

    console.log("nota para factura global with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  var ivatotal = total3 * 0.16;
  var subtotal = total3 - ivatotal;
  var factura_templ = {
    emisor: {
      uuid: "f3313239-a434-4dfd-b10d-63b57e2ea559"
    },
    receptor: {
      uuid: "277ddda0-6254-11eb-a336-331a303b0a87"
    },
    factura: {
      fecha: "'" + new Date() + "'",
      tipo: "ingreso",
      generacion_automatica: true,
      subtotal: subtotal,
      impuesto_federal: ivatotal,
      total: subtotal + ivatotal,
      conceptos: notas.partidas
    }
  };
  console.log(factura_templ);
 

var data = JSON.stringify({
  "emisor": {
    "uuid": "6bb8f310-1f7a-4313-810b-5e4265581b03"
  },
  "receptor": {
    "uuid": "cd8b20e9-6d68-41af-8b25-acda2611ef55"
  },
  "factura": {
    "fecha": "2019-07-25 10:22:18",
    "tipo": "ingreso",
    "generacion_automatica": true,
    "subtotal": 2000,
    "impuesto_federal": 320,
    "total": 2320,
    "conceptos": [
      {
        "clave_producto_servicio": "76111500",
        "clave_unidad_de_medida": "E48",
        "cantidad": 1,
        "descripcion": "SERVICIO DE LIMPIEZA",
        "valor_unitario": 2000,
        "total": 2000
      }
    ]
  }
});

var config = {
  method: 'post',
  url: 'https://api.facturify.com/api/v1/factura',
  headers: { 
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBpLXNhbmRib3guZmFjdHVyaWZ5LmNvbVwvYXBpXC92MVwvYXV0aCIsImlhdCI6MTYzMjI2MDQzMCwiZXhwIjoxNjMyMzQ2ODMwLCJuYmYiOjE2MzIyNjA0MzAsImp0aSI6IkN5Q21qOEFxdkxDeEFlRWoiLCJzdWIiOjEwMDIsInBydiI6IjBhNWI5MDAwZDM0YTEzOTYxMThlNTQ4MzQyZWM0NDAxNmYwOGMzMzEifQ.aCurxhsbOjuLch2tWbwPSDwPrB4Gh8o7wuaRvcoHLdxB63hvXO4vMce4DY6MB3mlH6nrdEEGKAPaIuO-kWJkhw', 
    'Content-Type': 'application/json',
    
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});



  // result = prompt("¿con cuanto pago?");
  // cambio = result - total;
  // alert("el cambio es de :" + cambio);
  // jquery("#pago").text(result);
  // jquery("#cambio").text(cambio);
  // $("#recibo").click();
}
function global() {
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
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
      
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
          <h5>Alma Alicia Flores Zavala</h5>
          <h6>
            FOZA8801257C2 Carrera Torres 742 Heroe de Nacozari Ciudad Victoria
            Tamps. c.p.87030
          </h6>
          <h6 id="fecha">Fecha:</h6>
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
                  <h5>Total</h5>
                  <h5>Pago:</h5>
                  <h5>Cambio:</h5>
                </td>
                <td class="payment">
                  <h5 id="total">0</h5>
                  <h5 id="pago">0</h5>
                  <h5 id="cambio">0</h5>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div id="factura">
          <h3>Si necesita factura de este recibo favor de entrar a :</h3>
          <p>
            <h4>https://factura.space/bicivic/</h4>
          </p>
          <p>
            <h4>Introduce el siguiente codigo(Ticket id):</h4>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default function Fact() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => jsonCambio(data);
  const [basicModal, setBasicModal] = useState(false);
  function reload() {
    // var location = Location;
    // location.reload();
  }
  const toggleShow = () => setBasicModal(!basicModal);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="number" {...register("precio")} placeholder="Precio" />
        <input
          type="text"
          {...register("descripcion")}
          placeholder="producto"
        />
        <input type="number" {...register("cantidad")} placeholder="cantidad" />

        <MDBBtn color="success" type="submit" value="agregar">
          Agregar{""}
        </MDBBtn>
      </form>
      <div id="ticket_content"></div>
      <MDBBtn onClick={recibo}>Hacer recibo</MDBBtn>

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
                <MDBBtn color="secondary" onClick={reload}>
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

async function jsonCambio(data) {
  var imp = data.precio;
  var d1 = new Date();
  var d2 = Date.now();
  var precio = Number(imp);
  var can = Number(data.cantidad);
  var imp_prod = can * precio;

  var clave;
  var unidad;
  if (data.descripcion === "reparacion") {
    clave = "78181500";
    unidad = "E48";
  } else {
    clave = "25174700";
    unidad = "H87";
  }

  var newCon = {
    clave_producto_servicio: "01010101",
    clave_unidad_de_medida: "ACT",
    cantidad: 1,
    descripcion: "Venta",
    valor_unitario: Number(imp_prod) / 1.16,
    total: Number(imp_prod)
  };
  var newCon2 = {
    descripcion: data.descripcion,
    claveprodserv: clave,
    precio: Number(imp_prod),
    unidad: unidad,
    fecha: d1.toString(),
    cantidad: Number(data.cantidad)
  };
  notas.partidas.push(newCon);

  tickets.push(newCon2);
  console.log(notas.partidas);

  total = 0;
  notas.partidas.forEach(function (obj) {
    total += Number(obj.total);
  });

  console.log("Ultimo" + imp + "total:" + total);
  // db.insert(newCon, function (err, newDoc) {   // Callback is optional
  //   console.log(newDoc);
  // });

  jquery("#totalTicket").prepend(
    "<tr class='service'><td class='tableitem'><h4 class='itemtext'>" +
      data.cantidad +
      "</h4></td> <td class='tableitem'><h4 class='itemtext'>" +
      data.descripcion +
      "</h4></td><td class='tableitem'><h4 class='itemtext'>" +
      imp_prod +
      "</h5></td> </tr>"
  );
  jquery("#ticket_content").append(
    "<tr class='service'><td class='tableitem'><h4 class='itemtext'>" +
      data.cantidad +
      "</h4></td> <td class='tableitem'><h4 class='itemtext'>" +
      data.descripcion +
      "</h4></td><td class='tableitem'><h4 class='itemtext'>" +
      imp_prod +
      "</h4></td> </tr>"
  );
  jquery("#ticket_content").append("total:" + total);
  jquery("#fecha").text(fecha);
  jquery("#total").text(total);
}
