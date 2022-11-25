const nodemailer = require('nodemailer');

const enviarMail = async function (destinatario, motivo){
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
        to: destinatario,
        subject: 'Comentario rechazado por el profesor',
        html: '<h3><u>IMPORTANTE:</u></h3><p>Tenga en cuenta que este correo electrónico se envía automáticamente desde un buzón automático que <b>NO</b> acepta respuestas.</p><br></br><h4><b>Su contratacion fue rechazada por no poder ajustarse a los requisitos del profesor.</b></h4><br></br><p>MOTIVO: </p>' + motivo,
        //html: '<img src="'+imgInscripcion+'" /><a href="'+linkMP+'"><img src="'+imgMP+'" /></a><a href="'+linkPago+'"><img src="'+imgRegistro+'" /></a>',
        
    };
    console.log("mail",mailOptions)
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

exports.enviarMailRechazo = async function (req, res,){
    // Definimos el transporter
    let destinatario = req.body.destinatario
    let motivo = req.body.motivo
    
    await enviarMail(destinatario, motivo);
};

