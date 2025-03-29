<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold text-center mb-6 text-gray-800">Aseguradora</h1>

    <form @submit.prevent="addPoliza" class="bg-white shadow-lg p-6 rounded-lg">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label for="numeroPoliza" class="block text-sm font-medium text-gray-700">Número de Póliza </label>
          <input 
            v-model="nuevaPoliza.numeroPoliza" 
            id="numeroPoliza" 
            placeholder="Número de Póliza" 
            class="border p-2 w-full rounded-md" 
            required
          />
        </div>
        <div>
          <label for="titular" class="block text-sm font-medium text-gray-700">Titular </label>
          <input 
            v-model="nuevaPoliza.titular" 
            id="titular" 
            placeholder="Titular" 
            class="border p-2 w-full rounded-md" 
            required
          />
        </div>
        <div>
          <label for="monto" class="block text-sm font-medium text-gray-700">Monto </label>
          <input 
            v-model="nuevaPoliza.monto" 
            id="monto" 
            placeholder="Monto" 
            type="number" 
            class="border p-2 w-full rounded-md" 
            required
          />
        </div>
        <div>
          <label for="tipoSeguro" class="block text-sm font-medium text-gray-700">Tipo de Seguro </label>
          <select 
            v-model="nuevaPoliza.tipoSeguro" 
            id="tipoSeguro" 
            class="border p-2 w-full rounded-md"
          >
            <option value="Auto">Auto</option>
            <option value="Vida">Vida</option>
            <option value="Hogar">Hogar</option>
            <option value="Salud">Salud</option>
          </select>
        </div>
      </div>
      <div class="mt-4 text-center">
        <button 
          type="submit" 
          class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Agregar Póliza
        </button>
      </div>
    </form>

    <div class="mt-6">
      <ul>
        <li v-for="poliza in polizas" :key="poliza._id" class="border p-4 flex justify-between items-center bg-gray-50 rounded-lg mb-4">
          <span class="text-sm text-gray-700">
            <strong>{{ poliza.numeroPoliza }}</strong> - {{ poliza.titular }} - {{ poliza.tipoSeguro }} - ${{ poliza.monto }}
          </span>
          <button 
            @click="actualizarPoliza(poliza)" 
            class="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Actualizar
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      polizas: [],
      nuevaPoliza: { numeroPoliza: '', titular: '', monto: '', tipoSeguro: 'Auto' },
    };
  },
  methods: {
    async obtenerPolizas() {
      const response = await axios.get('http://localhost:5000/polizas');
      this.polizas = response.data;
    },
    async addPoliza() {
      await axios.post('http://localhost:5000/polizas', this.nuevaPoliza);
      this.obtenerPolizas();
    },
    async actualizarPoliza(poliza) {
      const nuevoMonto = prompt('Nuevo monto:', poliza.monto);
      if (nuevoMonto) {
        await axios.put(`http://localhost:5000/polizas/${poliza._id}`, { monto: nuevoMonto });
        this.obtenerPolizas();
      }
    }
  },
  mounted() {
    this.obtenerPolizas();
  }
};
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
  background-color: #f7fafc;
}

.container {
  max-width: 800px;
}

button:focus {
  outline: none;
}
</style>
