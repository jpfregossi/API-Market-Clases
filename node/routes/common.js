const Clase = require("../models/Clase");
const Feedback = require("../models/Feedback");
const Contratacion = require("../models/Contratacion");
const nodemailer = require('nodemailer');


const getTutorClases = async (id) => {
    console.log("ID: ", id);
    try {
        let clases = await Clase.find({ teacher_id: id });

        let response = [];

        for (let clase of clases) {
            let { __v, ...claseLimpia } = clase._doc;

            let feedbacks = await Feedback.find({ clase_id: clase._id });
            let contratacionesAll = await Contratacion.find({ clase_id: clase._id });

            let contrataciones = [];
            for (let contratacion of contratacionesAll) {
                let feedback = feedbacks.find(f => f.user_id.toString() === contratacion.alumno_id.toString());
                let { __v, ...contratacionLimpia } = contratacion._doc;
                let nuevaContratacion = { ...contratacionLimpia, feedback };
                contrataciones.push(nuevaContratacion);
            }

            let nuevaClase = {
                ...claseLimpia, contrataciones
            };
            response.push(JSON.parse(JSON.stringify(nuevaClase)));
        }

        return response;
    } catch (err) {
        console.log("Error: ", err);
        return null;
    }
}

const enviar = async function ( destinatario, subject, body){    
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        secure: true,
        port:465,
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'bottesteador@gmail.com',
            pass: 'kfzcxmbhlyqwtuka'
        }
    });
    // Definimos el email
    var mailOptions = {
        from: 'bottesteador@gmail.com',
        to: destinatario.toString(),
        subject: subject,
        html: body,        
    };
    console.log("mail enviado: ",mailOptions)
    // Enviamos el email
    try
    {
        let info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
    }
    catch(error)
    {
        console.log("Error envio mail: ",error);            
    }
};

const enviarMail = async function ( tipo, destinatario, motivo){
    console.log("destinatario: ", destinatario.toString());

    const bodyRechazo = '<h3><u>IMPORTANTE:</u></h3><p>Tenga en cuenta que este correo electrónico se envía automáticamente desde un buzón automático que <b>NO</b> acepta respuestas.</p><br></br><h4><b>Su comentario fue rechazad0 por no poder ajustarse a los requisitos del profesor.</b></h4><br></br><p>MOTIVO: </p>' + motivo;
    const bodyCancelacion = '<h3><u>IMPORTANTE:</u></h3><p>Tenga en cuenta que este correo electrónico se envía automáticamente desde un buzón automático que <b>NO</b> acepta respuestas.</p><br></br><h4><b>Su contratacion fue rechazada por motivos del profesor:</b></h4><br></br><p>MOTIVO: </p>' + motivo;
    const bodyForgot= '<h3><u>IMPORTANTE:</u></h3><p>Usted ha solicitado re-establecer su contraseña? </p><p>Ingrese al siguiente link para iniciar el recupero:</p><p>Ingrese al siguiente link para iniciar el recupero:</p><p><a href="' + motivo + '">' + motivo + '</a></p>';

    let body;
    let subject;

    switch (tipo) {
        case 'RECHAZO':
          body = bodyRechazo;
          subject = "Comentario rechazado por el profesor";
          break;
        case 'CANCELACION':
            body = bodyCancelacion;
            subject = "Clase cancelada por el profesor";
          break;
        case 'FORGOT':
            body = bodyForgot;
            subject = "Solicitud de reestablecimiento de contraseña";
          break;
        default:
          console.log('Tipo de solicitud de mail inválido');
      }

    await enviar(destinatario, subject, body);
};

module.exports = {
    getTutorClases,
    enviarMail
};