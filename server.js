const express = require('express');
const bodyParser = require('body-parser');
const midtransClient = require('midtrans-client');

const app = express();
const port = 3000;

// Middleware untuk parse JSON request
app.use(bodyParser.json());

// Setup Midtrans
const midtrans = new midtransClient.Snap({
  isProduction: false, // Ganti ke true jika sudah produksi
  serverKey: 'SB-Mid-server-l6jADZxuAbEWq4zoTdIdDGGU', // Ganti dengan Server Key Anda
  clientKey: 'SB-Mid-client-vg4cnVugHB1XykgM', // Ganti dengan Client Key Anda
});

// Endpoint untuk membuat transaksi
app.post('/create-transaction', async (req, res) => {
  const { amount, order_id, itemname } = req.body; // Ambil data amount dan order_id dari body request

  const transactionDetails = {
    order_id: order_id, // ID transaksi yang unik
    gross_amount: amount, // Jumlah yang akan dibayar
    item_name: itemname,
  };

  // Membuat transaksi
  const transaction = {
    transaction_details: transactionDetails,
  };

  try {
    // Generate snap token
    const snapToken = await midtrans.createTransaction(transaction);
    res.json({ token: snapToken.token }); // Kirimkan token transaksi ke frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal membuat transaksi' });
  }
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello, welcome to the Node.js server! SERVER RUNNING!!');
  });