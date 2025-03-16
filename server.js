// Importar dependencias
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Configurar la aplicación Express
const app = express();
app.use(express.json());
app.use(cors());

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error en la conexión", err));

// Definir el esquema de póliza
const polizaSchema = new mongoose.Schema({
    numeroPoliza: { type: String, unique: true, required: true },
    tipoSeguro: { type: String, enum: ["Auto", "Vida", "Hogar", "Salud"], required: true },
    titular: { type: String, required: true },
    monto: { type: Number, required: true }
});

const Poliza = mongoose.model('Poliza', polizaSchema);

// Rutas CRUD
app.post('/polizas', async (req, res) => {
    try {
        const poliza = new Poliza(req.body);
        await poliza.save();
        res.status(201).json(poliza);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/polizas', async (req, res) => {
    const polizas = await Poliza.find();
    res.json(polizas);
});

app.get('/polizas/:id', async (req, res) => {
    try {
        const poliza = await Poliza.findById(req.params.id);
        if (!poliza) return res.status(404).json({ error: "Póliza no encontrada" });
        res.json(poliza);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/polizas/:id', async (req, res) => {
    try {
        const poliza = await Poliza.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!poliza) return res.status(404).json({ error: "Póliza no encontrada" });
        res.json(poliza);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/polizas/:id', async (req, res) => {
    try {
        const poliza = await Poliza.findByIdAndDelete(req.params.id);
        if (!poliza) return res.status(404).json({ error: "Póliza no encontrada" });
        res.json({ message: "Póliza eliminada" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Configuración del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
