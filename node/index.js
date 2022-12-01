const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const claseRoute = require("./routes/clase");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const commentsratingsRoute = require("./routes/commentsratings");
const feedbackRoute = require("./routes/feedback");
const newsletterRoute = require("./routes/newsletter");
const tutorRoute = require("./routes/tutor");
var MailController = require('./controllers/mail.controller');
const cors = require("cors");

dotenv.config();

// String protegido en .env
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());

//permite usar .json al enviar datos por POST
app.use(express.json());

// cuando se ingrese a /api/auth se usara el authRoute
app.use("/api/auth", authRoute);

// cuando se ingrese a /api/user se usara el userRoute
app.use("/api/users", userRoute);
app.use("/api/clases", claseRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/mails", newsletterRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/commentsratings", commentsratingsRoute); // TODO retirar una vez quede funcionando feedback
app.use("/api/feedback", feedbackRoute);
app.use("/api/tutor", tutorRoute);



app.use('/api/sendMail',MailController.enviarMailRechazo);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});