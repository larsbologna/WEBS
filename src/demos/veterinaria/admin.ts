import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  name: 'Huellitas Veterinaria', accent: '#0f766e', kind: 'services', perDay: [14, 24], hours: [9, 20], closedDows: [0],
  channels: ['Web', 'WhatsApp', 'Teléfono', 'Guardia'], staff: ['Dra. Ríos', 'Dr. Luna', 'Dra. Peralta'],
  services: [
    { name: 'Consulta clínica', price: 18000, weight: 5 }, { name: 'Vacunación', price: 14000, weight: 4 }, { name: 'Peluquería', price: 22000, weight: 2 },
    { name: 'Ecografía', price: 32000, weight: 1 }, { name: 'Análisis clínicos', price: 26000, weight: 1.5 }, { name: 'Castración', price: 95000, weight: 0.4 }, { name: 'Limpieza dental', price: 48000, weight: 0.4 },
  ],
  products: [
    { name: 'Vacuna séxtuple (dosis)', cat: 'Vacunas', cost: 5200, price: 0, stock: 34, min: 20 },
    { name: 'Vacuna antirrábica (dosis)', cat: 'Vacunas', cost: 2900, price: 0, stock: 12, min: 15 },
    { name: 'Triple felina (dosis)', cat: 'Vacunas', cost: 4800, price: 0, stock: 16, min: 10 },
    { name: 'Antiparasitario comprimido', cat: 'Medicamentos', cost: 2100, price: 0, stock: 60, min: 30 },
    { name: 'Pipetas antipulgas', cat: 'Medicamentos', cost: 3600, price: 0, stock: 8, min: 15 },
    { name: 'Jeringas y agujas (x100)', cat: 'Descartables', cost: 7800, price: 0, stock: 5, min: 3, unit: 'cajas' },
    { name: 'Anestesia inhalatoria', cat: 'Quirófano', cost: 38000, price: 0, stock: 2, min: 2, unit: 'frascos' },
    { name: 'Alimento de internación', cat: 'Internación', cost: 9500, price: 0, stock: 6, min: 4, unit: 'bolsas' },
  ],
  expenses: [
    { concept: 'Alquiler de la clínica', cat: 'Alquiler', amount: 1200000, day: 5 },
    { concept: 'Vacunas y medicamentos', cat: 'Proveedores', amount: 1450000, day: 9, provider: 'Droguería Vet Sur' },
    { concept: 'Laboratorio de análisis', cat: 'Proveedores', amount: 380000, day: 16, provider: 'Lab. VetDiagnóstico' },
    { concept: 'Sueldos (3 veterinarios + auxiliar)', cat: 'Sueldos', amount: 4600000, day: 4 },
    { concept: 'Residuos patogénicos', cat: 'Servicios', amount: 85000, day: 12 },
    { concept: 'Luz', cat: 'Servicios', amount: 160000, day: 15 },
    { concept: 'Matrícula y habilitación', cat: 'Impuestos', amount: 90000, day: 22 },
    { concept: 'IIBB', cat: 'Impuestos', amount: 260000, day: 20 },
  ],
}
export default cfg
