import mercadopago from "mercadopago";
import { MERCADOPAGO_API_KEY } from "../config.js";

export const createOrder = async (req, res) => {
  mercadopago.configure({
    access_token: MERCADOPAGO_API_KEY,
  });

  const result = await mercadopago.preferences.create({
    items: [
      {
        title: "Laptop Lenovo",
        unit_price: 500,
        currency_id: "ARS",
        quantity: 1,
      },
    ],
    back_urls: {
      success: "http://localhost:3000/success",
      failure: "http://localhost:3000/failure",
      pending: "http://localhost:3000/pending",
    },
    notification_url: "https://8a9b-190-227-13-71.sa.ngrok.io/webhook",
  });

  console.log(result);

  res.send(result.body);
};

export const reciveWebhook = async (req, res) => {
  const payment = req.query;

  try {
    if (payment.type === payment) {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log(data);
      //store in db
    }
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500).json({ error: error.message });
  }
};
