const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "vyf2tw9c6zh5v3fh",
  publicKey: "8qy895kzjjdrztkw",
  privateKey: "676b935ef68a22d2ec41bc62434b3ed9",
});

const getToken = (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
};

const paymentProcess = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;
  gateway.transaction
    .sale({
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      //   deviceData: deviceDataFromTheClient,
      options: {
        submitForSettlement: true,
      },
    })
    .then((result) => {
        res.send(result);
    });
};

module.exports = { getToken, paymentProcess };
