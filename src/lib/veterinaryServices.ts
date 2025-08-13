// Comprehensive veterinary services configuration
// This file ensures consistency across all parts of the application

export interface VeterinaryService {
  id: string;
  nombre: string;
  precio: number;
  icono: string;
  descripcion: string;
  categoria: string;
  activo: boolean;
}

// Default comprehensive services matching the official veterinary clinic services
export const defaultVeterinaryServices: VeterinaryService[] = [
  // Atención médica
  {
    id: "consulta_general",
    nombre: "Consulta General",
    precio: 80,
    icono: "Stethoscope",
    descripcion: "Consultas generales y especializadas",
    categoria: "Atención médica",
    activo: true,
  },
  {
    id: "medicina_preventiva",
    nombre: "Medicina Preventiva",
    precio: 65,
    icono: "Syringe",
    descripcion: "Vacunas y desparasitación",
    categoria: "Atención médica",
    activo: true,
  },
  {
    id: "certificados_viaje",
    nombre: "Certificados de Salud",
    precio: 50,
    icono: "FileText",
    descripcion: "Certificados de salud para viajes",
    categoria: "Atención médica",
    activo: true,
  },
  {
    id: "emergencia",
    nombre: "Atención de Urgencias",
    precio: 150,
    icono: "AlertCircle",
    descripcion: "Atención de urgencias las 24 horas",
    categoria: "Atención médica",
    activo: true,
  },
  
  // Diagnóstico
  {
    id: "ecografias",
    nombre: "Ecografías",
    precio: 120,
    icono: "MonitorSpeaker",
    descripcion: "Ecografías abdominales y reproductivas",
    categoria: "Diagnóstico",
    activo: true,
  },
  {
    id: "radiografia",
    nombre: "Radiografía Digital",
    precio: 90,
    icono: "Scan",
    descripcion: "Radiografía digital de alta calidad",
    categoria: "Diagnóstico",
    activo: true,
  },
  {
    id: "laboratorio",
    nombre: "Laboratorio Clínico",
    precio: 80,
    icono: "TestTube",
    descripcion: "Laboratorio clínico completo",
    categoria: "Diagnóstico",
    activo: true,
  },
  {
    id: "endoscopia",
    nombre: "Endoscopia",
    precio: 200,
    icono: "Search",
    descripcion: "Endoscopia digestiva, respiratoria y urológica",
    categoria: "Diagnóstico",
    activo: true,
  },

  // Cirugía
  {
    id: "esterilizacion",
    nombre: "Esterilizaciones",
    precio: 250,
    icono: "Activity",
    descripcion: "Esterilizaciones y castraciones",
    categoria: "Cirugía",
    activo: true,
  },
  {
    id: "cirugia_tejidos_blandos",
    nombre: "Cirugía de Tejidos Blandos",
    precio: 300,
    icono: "Scissors",
    descripcion: "Cirugías de tejidos blandos",
    categoria: "Cirugía",
    activo: true,
  },
  {
    id: "cirugia_laparoscopica",
    nombre: "Cirugía Laparoscópica",
    precio: 400,
    icono: "Activity",
    descripcion: "Cirugías laparoscópicas y endoscópicas",
    categoria: "Cirugía",
    activo: true,
  },
  {
    id: "cirugia_urgencia",
    nombre: "Cirugía de Urgencia",
    precio: 350,
    icono: "AlertTriangle",
    descripcion: "Cirugías de urgencia",
    categoria: "Cirugía",
    activo: true,
  },
  {
    id: "anestesia_monitoreo",
    nombre: "Anestesia Monitoreada",
    precio: 100,
    icono: "Monitor",
    descripcion: "Manejo anestésico monitoreado",
    categoria: "Cirugía",
    activo: true,
  },

  // Estética y cuidado
  {
    id: "bano_estetico",
    nombre: "Baño Estético",
    precio: 40,
    icono: "Droplets",
    descripcion: "Baño estético y medicado",
    categoria: "Estética y cuidado",
    activo: true,
  },
  {
    id: "corte_pelo",
    nombre: "Corte de Pelo",
    precio: 35,
    icono: "Scissors",
    descripcion: "Corte de pelo profesional",
    categoria: "Estética y cuidado",
    activo: true,
  },
  {
    id: "limpieza_unas_oidos",
    nombre: "Limpieza de Uñas y Oídos",
    precio: 25,
    icono: "Heart",
    descripcion: "Corte de uñas y limpieza de oídos",
    categoria: "Estética y cuidado",
    activo: true,
  },
  {
    id: "tratamiento_dermatologico",
    nombre: "Tratamiento Dermatológico",
    precio: 80,
    icono: "Stethoscope",
    descripcion: "Deslanado y tratamientos dermatológicos",
    categoria: "Estética y cuidado",
    activo: true,
  },

  // Hospitalización
  {
    id: "cuidados_intensivos",
    nombre: "Cuidados Intensivos",
    precio: 200,
    icono: "Monitor",
    descripcion: "Cuidados intensivos y monitoreo constante",
    categoria: "Hospitalización",
    activo: true,
  },
  {
    id: "fluidoterapia",
    nombre: "Fluidoterapia",
    precio: 80,
    icono: "Droplets",
    descripcion: "Fluidoterapia y soporte nutricional",
    categoria: "Hospitalización",
    activo: true,
  },
  {
    id: "hospitalizacion_postquirurgica",
    nombre: "Hospitalización Post-quirúrgica",
    precio: 150,
    icono: "Bed",
    descripcion: "Hospitalización postquirúrgica",
    categoria: "Hospitalización",
    activo: true,
  },

  // Tienda y nutrición
  {
    id: "alimentos_balanceados",
    nombre: "Alimentos Balanceados",
    precio: 60,
    icono: "ShoppingBag",
    descripcion: "Alimentos balanceados y dietas especiales",
    categoria: "Tienda y nutrición",
    activo: true,
  },
  {
    id: "suplementos",
    nombre: "Suplementos Nutricionales",
    precio: 45,
    icono: "Pill",
    descripcion: "Suplementos nutricionales",
    categoria: "Tienda y nutrición",
    activo: true,
  },
  {
    id: "accesorios",
    nombre: "Accesorios para Mascotas",
    precio: 30,
    icono: "Gift",
    descripcion: "Accesorios para mascotas",
    categoria: "Tienda y nutrición",
    activo: true,
  },
];

// Service categories
export const serviceCategories = [
  "Atención médica",
  "Diagnóstico", 
  "Cirugía",
  "Estética y cuidado",
  "Hospitalización",
  "Tienda y nutrición",
  "Otros"
];

// Function to get services from localStorage or initialize with defaults
export const getVeterinaryServices = (): VeterinaryService[] => {
  try {
    const savedServices = localStorage.getItem("veterinary_services");
    if (savedServices) {
      const services = JSON.parse(savedServices);
      // Validate that services have the required structure
      if (Array.isArray(services) && services.length > 0) {
        return services.filter((service: any) => service.activo);
      }
    }
  } catch (error) {
    console.error("Error loading services from localStorage:", error);
  }
  
  // Initialize localStorage with default comprehensive services
  localStorage.setItem("veterinary_services", JSON.stringify(defaultVeterinaryServices));
  return defaultVeterinaryServices.filter(service => service.activo);
};

// Function to save services to localStorage and notify components
export const saveVeterinaryServices = (services: VeterinaryService[]): void => {
  try {
    localStorage.setItem("veterinary_services", JSON.stringify(services));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("servicesUpdated"));
  } catch (error) {
    console.error("Error saving services to localStorage:", error);
  }
};

// Function to get services grouped by category
export const getServicesByCategory = (): Record<string, VeterinaryService[]> => {
  const services = getVeterinaryServices();
  return services.reduce((acc, service) => {
    const category = service.categoria || "Otros";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  }, {} as Record<string, VeterinaryService[]>);
};
