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

const enviarMail = async function ( tipo, destinatario, motivo){
    console.log("destinatario: ", destinatario.toString());

    const bodyRechazo = '<h3><u>IMPORTANTE:</u></h3><p>Tenga en cuenta que este correo electrónico se envía automáticamente desde un buzón automático que <b>NO</b> acepta respuestas.</p><br></br><h4><b>Su comentario fue rechazad0 por no poder ajustarse a los requisitos del profesor.</b></h4><br></br><p>MOTIVO: </p>' + motivo;
    const bodyCancelacion = '<h3><u>IMPORTANTE:</u></h3><p>Tenga en cuenta que este correo electrónico se envía automáticamente desde un buzón automático que <b>NO</b> acepta respuestas.</p><br></br><h4><b>Su contratacion fue rechazada por motivos del profesor:</b></h4><br></br><p>MOTIVO: </p>' + motivo;
    
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
        subject: 'Comentario rechazado por el profesor',
        html: (tipo === "RECHAZO") ? bodyRechazo : bodyCancelacion,
        //html: '<img src="'+imgInscripcion+'" /><a href="'+linkMP+'"><img src="'+imgMP+'" /></a><a href="'+linkPago+'"><img src="'+imgRegistro+'" /></a>',
        
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

module.exports = {
    getTutorClases,
    enviarMail
};