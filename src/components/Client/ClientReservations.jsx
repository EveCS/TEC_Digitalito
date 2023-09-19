import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useForm } from 'react-hook-form';
import "./reservations.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { addDoc, collection, getDocs, updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase_config";
import QRCode from 'qrcode.react';
import qrcode from 'qrcode';
import emailjs from 'emailjs-com';
//import pako from 'pako';
import  { addAttachment }  from 'emailjs-com';



export function ClientReservations() {
    let navigate = useNavigate();
    const location = useLocation();
    const ID = location.state.id;
    const correo = location.state.correo
    const contraseña = location.state.contraseña
    const carnee = location.state.carnee
    const nombre = location.state.nombre
    const apellido = location.state.apellido
    const [apartados, setApartados] = useState([]);
    const collecionApartados = collection(db, "reservaciones");
    const [qrContent, setQrContent] = useState('');
  
    var idApartado = "";
    const { id } = useParams();
    var i = 0;


    useEffect(() => {
        const getApartados = async () => {
            const data = await getDocs(collecionApartados);
            const apartados = data.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter((apartado) => apartado.activa && !apartado.confirmada && apartado.carnee==carnee);
        setApartados(apartados);
    };
        getApartados();
    }, []);

  useEffect(() => {
    console.log(apartados);
  }, [apartados]);

  function setIdApartado (id){
    idApartado=id;
    console.log(idApartado);
  };

  function sendEmail(qrcodeData,hora,horaFinal,cubiculo,fecha) {
    const emailParams = {
      to_name: nombre,
      qrimagen: qrcodeData,
      cliente: correo,
      hora: hora,
      horaFinal: horaFinal,
      cubiculo: cubiculo,
      fecha: fecha
    };
    emailjs.send("service_719vdkn", "template_6rmafow",emailParams, "NUDhBCc5PbaQ9mPz3")
    .then(function(response) {
        console.log("SUCCESS", response);
    }, function(error) {
        console.log("FAILED", error);
    });
}



  async function confirmApartado () {
    const apartado = await doc(collecionApartados, idApartado);
    for(let i in apartados){
      console.log(apartados[i].id);
      if(apartados[i].id==idApartado && apartados[i].confirmada==false && apartados[i].activa==true){
        await updateDoc(apartado, {confirmada: true});
        const data = `ID de reserva: ${idApartado}\nFecha: ${((apartados[i].hora).toDate()).toLocaleDateString()}\nHora de Inicio: ${((apartados[i].hora).toDate()).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric', hour12: true })}\nHora de Fin: ${((apartados[i].horaFinal).toDate()).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric', hour12: true })}\nCarnee: ${apartados[i].carnee}`;
        const qrCodeUrl = await qrcode.toDataURL(data);
        setQrContent(qrCodeUrl); // el generador del QR es el idApartado
        //const documento = new jsPDF();
        //documento.text(`ID de reserva: ${idApartado}\nFecha: ${((apartados[i].hora).toDate()).toLocaleDateString()}\nHora de Inicio: ${((apartados[i].hora).toDate()).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric', hour12: true })}\nHora de Fin: ${((apartados[i].horaFinal).toDate()).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric', hour12: true })}\nCarnee: ${apartados[i].carnee}`, 10, 10);
        //documento.addImage(qrCodeUrl, 'PNG', 10, 10);
        //const pdfDataUrl = URL.createObjectURL(documento);
        //const doc64 = documento.output('datauristring');
        //const base64Data = doc64.split(',')[1];
        //const pdfBlob = URL.createObjectURL(new Blob([documento], { type: 'application/pdf' }));
        //const compressedPdf = pako.deflate(blob.output('arraybuffer'));
        var hora = ((apartados[i].hora).toDate()).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric', hour12: true })
        var horaFinal= ((apartados[i].horaFinal).toDate()).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric', hour12: true })
        var cubiculo = apartados[i].cubiculo
        var fecha = ((apartados[i].hora).toDate()).toLocaleDateString()
        sendEmail(qrCodeUrl,hora,horaFinal,cubiculo,fecha);

        alert("Reservación confirmada exitosamente, información enviada a su correo");
        navigate('/ClientMenu',{state:{id: ID, correo: correo, contraseña: contraseña, carnee: carnee, nombre: nombre, apellido: apellido}});
      }
      else {
        console.log("No existe esta reservacion o ya fue confirmada");
      }
    } 
  };

  function regresar () {
    navigate('/ClientMenu',{state:{id: ID, correo: correo, contraseña: contraseña, carnee: carnee, nombre: nombre, apellido: apellido}});
  };

  async function cancelApartado () {
    const apartado = await doc(collecionApartados, idApartado);
    for(let i in apartados){
      console.log(apartados[i].id);
      if(apartados[i].id==idApartado && apartados[i].confirmada==false && apartados[i].activa==true){
        await updateDoc(apartado, {activa: false});
        alert("Reservación cancelada exitosamente");
        navigate('/ClientMenu',{state:{id: ID, correo: correo, contraseña: contraseña, carnee: carnee, nombre: nombre, apellido: apellido}});
      }
      else {
        console.log("No existe esta reservacion o ya fue confirmada");
      }
    } 
  };

    return (
        <Fragment>
            <div className=" p-3 mb-2 bg-dark vh-100">
                <div className="jumbotron justify-content-center w-50 mx-auto my-2">
                    <h1 className="fw-bold mb-5 text-center text-white">Cubículos Reservados</h1>
                    <div className="reservations">
                    {apartados.map((apartado) => (
                    <div key={apartado.id.toString()} className="reservation">
                    <h6>ID Cubículo: {apartado.cubiculo}</h6>
                    <h6>Estudiante: {apartado.estudiante}</h6>
                    <h6>Fecha: {((apartado.hora).toDate()).toLocaleDateString()}</h6>
                    <h6>Hora inicio: {((apartado.hora).toDate()).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric', hour12: true })}</h6>
                    <h6>Hora final: {((apartado.horaFinal).toDate()).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric', hour12: true })}</h6>
                    <div>
                    </div>
                    <input type="radio" value={apartado.id} name="reserva" onClick={(e)=>{setIdApartado(apartado.id)}}/>
                    </div>
                  ))}                   
                    </div>
                    <div className="row g-3 my-2 mb-5">
                        <div className="col">
                            <button className="w-100 btn btn-lg btn-primary" onClick={(e)=>{confirmApartado(idApartado)}}>Confirmar</button>
                                                
                        </div>

                        <div className="col">
                            <button className="w-100 btn btn-lg btn-secondary" onClick={(e)=>{cancelApartado(idApartado)}}>Cancelar</button>
                        </div>
                    </div>
                    <div className="col">
                            <button className="w-100 btn btn-lg btn-secondary" onClick={(e)=>{regresar()}}>Regresar</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}