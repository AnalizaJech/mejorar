import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Calendar,
  Clock,
  PawPrint,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  User,
  Stethoscope,
  MapPin,
  CreditCard,
  Syringe,
  Heart,
  Activity,
  Search,
  FileText,
  MonitorSpeaker,
  Scan,
  TestTube,
  Scissors,
  AlertTriangle,
  Monitor,
  Droplets,
  Bed,
  ShoppingBag,
  Pill,
  Gift,
} from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { useToast } from "@/hooks/use-toast";
import { getVeterinaryServices } from "@/lib/veterinaryServices";

interface NuevaCitaData {
  mascotaId: string;
  tipoConsulta: string;
  veterinarioId?: string;
  fecha: string;
  hora: string;
  motivo: string;
  ubicacion: string;
  notas?: string;
}

// Default services configuration
const defaultTiposConsulta = [
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

// Function to get services using shared configuration
const getTiposConsulta = () => {
  return getVeterinaryServices();
};

const ubicaciones = [
  "Clínica Principal",
  "Sucursal Norte",
  "Sucursal Sur",
  "Atención a Domicilio",
];

const horasDisponibles = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

// Función para obtener el icono del servicio
const getServiceIcon = (iconName) => {
  const iconProps = { className: "w-6 h-6" };
  switch (iconName) {
    case "Stethoscope":
      return <Stethoscope {...iconProps} />;
    case "Syringe":
      return <Syringe {...iconProps} />;
    case "AlertCircle":
      return <AlertCircle {...iconProps} />;
    case "Heart":
      return <Heart {...iconProps} />;
    case "Activity":
      return <Activity {...iconProps} />;
    case "Search":
      return <Search {...iconProps} />;
    case "FileText":
      return <FileText {...iconProps} />;
    case "MonitorSpeaker":
      return <MonitorSpeaker {...iconProps} />;
    case "Scan":
      return <Scan {...iconProps} />;
    case "TestTube":
      return <TestTube {...iconProps} />;
    case "Scissors":
      return <Scissors {...iconProps} />;
    case "AlertTriangle":
      return <AlertTriangle {...iconProps} />;
    case "Monitor":
      return <Monitor {...iconProps} />;
    case "Droplets":
      return <Droplets {...iconProps} />;
    case "Bed":
      return <Bed {...iconProps} />;
    case "ShoppingBag":
      return <ShoppingBag {...iconProps} />;
    case "Pill":
      return <Pill {...iconProps} />;
    case "Gift":
      return <Gift {...iconProps} />;
    default:
      return <Stethoscope {...iconProps} />;
  }
};

export default function NuevaCita() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, mascotas, usuarios, citas, addCita, fixOrphanedPets } =
    useAppContext();
  const [tiposConsulta, setTiposConsulta] = useState(getTiposConsulta());
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [citaData, setCitaData] = useState<NuevaCitaData>({
    mascotaId: "",
    tipoConsulta: "",
    veterinarioId: "any",
    fecha: "",
    hora: "",
    motivo: "",
    ubicacion: "Clínica Principal",
    notas: "",
  });

  // Handle preselected service from landing page
  useEffect(() => {
    const preselectedService = location.state?.preselectedService;
    if (preselectedService) {
      setCitaData((prev) => ({ ...prev, tipoConsulta: preselectedService }));
      // Clear the state to prevent it from persisting on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  useEffect(() => {
    console.log("Mascotas changed:", mascotas);
    console.log("User changed:", user);
  }, [mascotas, user]);

  // Reload services when component mounts or when localStorage changes
  useEffect(() => {
    const updateServices = () => {
      setTiposConsulta(getTiposConsulta());
    };

    // Update services on mount
    updateServices();

    // Listen for storage changes (when admin updates services)
    window.addEventListener("storage", updateServices);
    // Listen for custom event when services are updated
    window.addEventListener("servicesUpdated", updateServices);

    return () => {
      window.removeEventListener("storage", updateServices);
      window.removeEventListener("servicesUpdated", updateServices);
    };
  }, []);

  if (!user || user.rol !== "cliente") {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardContent className="p-6 text-center">
              <Calendar className="w-12 h-12 text-vet-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-vet-gray-900 mb-2">
                Acceso requerido
              </h3>
              <p className="text-vet-gray-600">
                Debes iniciar sesión como cliente para agendar citas
              </p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // Get user's pets - explicit filtering
  const misMascotas = user?.id
    ? mascotas.filter((m) => m.clienteId === user.id)
    : [];

  // Debug info
  console.log("User ID:", user?.id);
  console.log("All mascotas:", mascotas);
  console.log("Filtered mascotas:", misMascotas);
  console.log("misMascotas length:", misMascotas.length);

  // Get available veterinarians
  const veterinarios = usuarios.filter((u) => u.rol === "veterinario");

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Prevent double submission
    if (isLoading) return;

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validations
      if (!citaData.mascotaId) {
        setError("Debes seleccionar una mascota");
        setIsLoading(false);
        return;
      }

      if (!citaData.tipoConsulta) {
        setError("Debes seleccionar el tipo de consulta");
        setIsLoading(false);
        return;
      }

      if (!citaData.fecha || !citaData.hora) {
        setError("Debes seleccionar fecha y hora");
        setIsLoading(false);
        return;
      }

      if (!citaData.motivo.trim()) {
        setError("Debes describir el motivo de la consulta");
        setIsLoading(false);
        return;
      }

      // Get selected data
      const selectedMascota = misMascotas.find(
        (m) => m.id === citaData.mascotaId,
      );
      const selectedTipoConsulta = tiposConsulta.find(
        (t) => t.id === citaData.tipoConsulta,
      );
      if (!selectedMascota || !selectedTipoConsulta) {
        setError("Error en los datos seleccionados");
        setIsLoading(false);
        return;
      }

      // Assign veterinarian - check availability if none selected
      let assignedVeterinario = selectedVeterinario?.nombre;
      if (!assignedVeterinario && veterinarios.length > 0) {
        // Get appointment date and time
        const appointmentDateTime = new Date(
          `${citaData.fecha}T${citaData.hora}:00`,
        );

        // Find veterinarians who are available at this time
        const availableVeterinarios = veterinarios.filter((vet) => {
          // Check if this veterinarian has any appointments at the same date and time
          const hasConflict = citas.some((cita) => {
            if (cita.veterinario !== vet.nombre) return false;

            const citaDateTime = new Date(cita.fecha);
            const appointmentTime = appointmentDateTime.getTime();
            const citaTime = citaDateTime.getTime();

            // Check if it's the same date and hour (allowing 1 hour appointments)
            const timeDiff = Math.abs(appointmentTime - citaTime);
            return timeDiff < 60 * 60 * 1000; // Less than 1 hour difference = conflict
          });

          return !hasConflict;
        });

        // Assign randomly from available veterinarians
        if (availableVeterinarios.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * availableVeterinarios.length,
          );
          assignedVeterinario = availableVeterinarios[randomIndex].nombre;
        } else {
          // If no veterinarians are available, assign the first one anyway
          assignedVeterinario = veterinarios[0].nombre;
        }
      }

      // Fallback to first available veterinarian if still no assignment
      if (!assignedVeterinario && veterinarios.length > 0) {
        assignedVeterinario = veterinarios[0].nombre;
      }

      // Create appointment with client information
      const nuevaCita = {
        mascota: selectedMascota.nombre,
        mascotaId: selectedMascota.id, // ID de la mascota para referencia
        especie: selectedMascota.especie,
        clienteId: user.id, // ID del cliente propietario
        clienteNombre: user.nombre, // Nombre del cliente para referencia rápida
        fecha: new Date(`${citaData.fecha}T${citaData.hora}:00`),
        estado: "pendiente_pago" as const,
        veterinario: assignedVeterinario || "Veterinario no disponible",
        motivo: citaData.motivo,
        tipoConsulta: selectedTipoConsulta.nombre,
        ubicacion: citaData.ubicacion,
        precio: selectedTipoConsulta.precio,
        notas: citaData.notas,
      };

      addCita(nuevaCita);

      // Show immediate toast notification
      toast({
        title: "¡Cita agendada exitosamente!",
        description: "Serás redirigido a 'Mis Citas' para realizar el pago.",
        duration: 4000,
      });

      setSuccess(
        "¡Cita agendada exitosamente! Ahora debes realizar el pago o subir tu comprobante de pago (YAPE, PLIN, Banca Móvil BCP, Interbank u otro banco) en la sección 'Mis Citas'.",
      );

      // Redirect after success (longer delay to read payment instructions)
      setTimeout(() => {
        navigate("/mis-citas");
      }, 4000);
    } catch (error) {
      setError("Error al agendar la cita");
    } finally {
      setIsLoading(false);
    }
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 90); // 3 months ahead
    return maxDate.toISOString().split("T")[0];
  };

  const selectedTipoConsulta = tiposConsulta.find(
    (t) => t.id === citaData.tipoConsulta,
  );
  const selectedMascota = misMascotas.find((m) => m.id === citaData.mascotaId);
  const selectedVeterinario =
    citaData.veterinarioId !== "any"
      ? veterinarios.find((v) => v.id === citaData.veterinarioId)
      : null;

  return (
    <Layout user={user}>
      <div className="min-h-screen bg-vet-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-vet-gray-900">
                Agendar Nueva Cita
              </h1>
              <p className="text-vet-gray-600">
                Programa una cita médica para tu mascota
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex items-center ${step < 4 ? "flex-1" : ""}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      currentStep >= step
                        ? "bg-vet-primary text-white"
                        : "bg-vet-gray-200 text-vet-gray-500"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`flex-1 h-1 mx-4 ${
                        currentStep > step
                          ? "bg-vet-primary"
                          : "bg-vet-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Error/Success Messages */}
            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <div className="space-y-2">
                    <p className="font-semibold">
                      ¡Cita agendada exitosamente!
                    </p>
                    <p>
                      Ahora debes realizar el pago o subir tu comprobante de
                      pago en la sección "Mis Citas".
                    </p>
                    <p className="text-sm">
                      <strong>Métodos de pago aceptados:</strong> YAPE, PLIN,
                      Banca Móvil BCP, Interbank u otro banco.
                    </p>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Step Content */}
          <Card>
            <CardContent className="p-8">
              {/* Step 1: Select Service Type */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-vet-gray-900 mb-2">
                      Servicios Veterinarios
                    </h2>
                    <p className="text-vet-gray-600">
                      Elige el servicio que mejor se adapte a las necesidades de
                      tu mascota
                    </p>
                  </div>

{/* Group services by category */}
                  {(() => {
                    const groupedServices = tiposConsulta.reduce((acc, service) => {
                      const category = service.categoria || "Otros";
                      if (!acc[category]) {
                        acc[category] = [];
                      }
                      acc[category].push(service);
                      return acc;
                    }, {});

                    return Object.entries(groupedServices).map(([category, services]) => (
                      <div key={category} className="mb-8">
                        <h3 className="text-lg font-semibold text-vet-gray-900 mb-4 border-b border-vet-gray-200 pb-2">
                          {category}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {services.map((tipo) => (
                            <Card
                              key={tipo.id}
                              className={`cursor-pointer transition-all ${
                                citaData.tipoConsulta === tipo.id
                                  ? "ring-2 ring-vet-primary bg-vet-primary/5"
                                  : "hover:shadow-md"
                              }`}
                              onClick={() =>
                                setCitaData({ ...citaData, tipoConsulta: tipo.id })
                              }
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex items-start space-x-3">
                                    <div
                                      className={`p-2 rounded-lg ${
                                        citaData.tipoConsulta === tipo.id
                                          ? "bg-vet-primary text-white"
                                          : "bg-vet-primary/10 text-vet-primary"
                                      }`}
                                    >
                                      {getServiceIcon(tipo.icono)}
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-semibold text-vet-gray-900 mb-1">
                                        {tipo.nombre}
                                      </h4>
                                      <p className="text-sm text-vet-gray-600 mb-2 leading-tight">
                                        {tipo.descripcion}
                                      </p>
                                      <Badge className="bg-vet-primary/10 text-vet-primary font-semibold">
                                        S/. {tipo.precio.toLocaleString()}
                                      </Badge>
                                    </div>
                                  </div>
                                  {citaData.tipoConsulta === tipo.id && (
                                    <CheckCircle className="w-5 h-5 text-vet-primary flex-shrink-0 mt-1" />
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ));
                  })()}

                  <div>
                    <Label htmlFor="motivo">Motivo de la consulta *</Label>
                    <div className="mt-2">
                      <Textarea
                        id="motivo"
                        value={citaData.motivo}
                        onChange={(e) =>
                          setCitaData({ ...citaData, motivo: e.target.value })
                        }
                        placeholder="Describe los síntomas o el motivo de la consulta..."
                        className="w-full min-h-[120px] max-h-[120px] resize-none overflow-y-auto px-3 py-2 border border-vet-gray-300 rounded-lg focus:ring-2 focus:ring-vet-primary focus:border-vet-primary transition-all duration-200"
                      />
                      <p className="text-xs text-vet-gray-500 mt-1">
                        💬 Describe síntomas, comportamientos o motivos
                        específicos para una mejor atención
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Select Pet */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-vet-gray-900 mb-2">
                      Selecciona tu mascota
                    </h2>
                    <p className="text-vet-gray-600">
                      Elige cuál de tus mascotas necesita atención médica
                    </p>
                  </div>

                  {!misMascotas || misMascotas.length === 0 ? (
                    <div className="text-center py-12">
                      <PawPrint className="w-16 h-16 text-vet-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-vet-gray-900 mb-2">
                        No tienes mascotas registradas
                      </h3>
                      <p className="text-vet-gray-600 mb-4">
                        Primero debes registrar una mascota para poder agendar
                        citas
                      </p>
                      <div className="flex justify-center">
                        <Button
                          onClick={() => navigate("/mis-mascotas")}
                          className="bg-vet-primary hover:bg-vet-primary-dark"
                        >
                          Registrar Mascota
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {misMascotas.map((mascota) => (
                        <Card
                          key={mascota.id}
                          className={`cursor-pointer transition-all ${
                            citaData.mascotaId === mascota.id
                              ? "ring-2 ring-vet-primary bg-vet-primary/5"
                              : "hover:shadow-md"
                          }`}
                          onClick={() =>
                            setCitaData({ ...citaData, mascotaId: mascota.id })
                          }
                        >
                          <CardContent className="p-6">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-vet-primary/10 rounded-full flex items-center justify-center overflow-hidden">
                                {mascota.foto ? (
                                  <img
                                    src={mascota.foto}
                                    alt={`Foto de ${mascota.nombre}`}
                                    className="w-full h-full object-cover rounded-full"
                                  />
                                ) : (
                                  <PawPrint className="w-6 h-6 text-vet-primary" />
                                )}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-vet-gray-900">
                                  {mascota.nombre}
                                </h4>
                                <p className="text-sm text-vet-gray-600">
                                  {mascota.especie} • {mascota.raza}
                                </p>
                                <p className="text-xs text-vet-gray-500">
                                  {mascota.peso} kg • {mascota.sexo}
                                </p>
                              </div>
                              {citaData.mascotaId === mascota.id && (
                                <CheckCircle className="w-6 h-6 text-vet-primary" />
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  <div>
                    <Label htmlFor="ubicacion">Ubicación</Label>
                    <Select
                      value={citaData.ubicacion}
                      onValueChange={(value) =>
                        setCitaData({ ...citaData, ubicacion: value })
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Selecciona ubicación" />
                      </SelectTrigger>
                      <SelectContent>
                        {ubicaciones.map((ubicacion) => (
                          <SelectItem key={ubicacion} value={ubicacion}>
                            {ubicacion}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 3: Select Date and Time */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-vet-gray-900 mb-2">
                      Fecha y hora
                    </h2>
                    <p className="text-vet-gray-600">
                      Selecciona cuándo quieres la cita
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fecha">Fecha preferida *</Label>
                      <DatePicker
                        date={
                          citaData.fecha
                            ? new Date(citaData.fecha + "T00:00:00")
                            : undefined
                        }
                        onDateChange={(date) => {
                          if (date) {
                            // Compare only the date part, not time
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            const selectedDate = new Date(date);
                            selectedDate.setHours(0, 0, 0, 0);

                            if (selectedDate >= today) {
                              // Use local date format to avoid timezone issues
                              const year = date.getFullYear();
                              const month = String(
                                date.getMonth() + 1,
                              ).padStart(2, "0");
                              const day = String(date.getDate()).padStart(
                                2,
                                "0",
                              );
                              const localDateString = `${year}-${month}-${day}`;

                              setCitaData({
                                ...citaData,
                                fecha: localDateString,
                              });
                            }
                          } else {
                            setCitaData({
                              ...citaData,
                              fecha: "",
                            });
                          }
                        }}
                        placeholder="Selecciona fecha"
                        fromYear={new Date().getFullYear()}
                        toYear={new Date().getFullYear() + 1}
                        minDate={new Date()}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hora">Hora preferida *</Label>
                      <Select
                        value={citaData.hora}
                        onValueChange={(value) =>
                          setCitaData({ ...citaData, hora: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona hora" />
                        </SelectTrigger>
                        <SelectContent>
                          {horasDisponibles.map((hora) => (
                            <SelectItem key={hora} value={hora}>
                              {hora}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="veterinario">Veterinario (opcional)</Label>
                    <Select
                      value={citaData.veterinarioId}
                      onValueChange={(value) =>
                        setCitaData({ ...citaData, veterinarioId: value })
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Cualquier veterinario disponible" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">
                          Cualquier veterinario disponible
                        </SelectItem>
                        {veterinarios.map((vet) => (
                          <SelectItem key={vet.id} value={vet.id}>
                            {vet.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="notas">Notas adicionales</Label>
                    <div className="mt-2">
                      <Textarea
                        id="notas"
                        value={citaData.notas}
                        onChange={(e) =>
                          setCitaData({ ...citaData, notas: e.target.value })
                        }
                        placeholder="Información adicional que el veterinario deba saber..."
                        className="w-full min-h-[120px] max-h-[120px] resize-none overflow-y-auto px-3 py-2 border border-vet-gray-300 rounded-lg focus:ring-2 focus:ring-vet-primary focus:border-vet-primary transition-all duration-200"
                      />
                      <p className="text-xs text-vet-gray-500 mt-1">
                        📝 Información adicional relevante para el veterinario
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-vet-gray-900 mb-2">
                      Confirmar cita
                    </h2>
                    <p className="text-vet-gray-600">
                      Revisa los detalles antes de confirmar tu cita
                    </p>
                  </div>

                  <div className="bg-vet-gray-50 rounded-lg p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-vet-primary/10 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                          {selectedMascota?.foto ? (
                            <img
                              src={selectedMascota.foto}
                              alt={`Foto de ${selectedMascota.nombre}`}
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <PawPrint className="w-5 h-5 text-vet-primary" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-vet-gray-600">Mascota</p>
                          <p className="font-medium text-vet-gray-900">
                            {selectedMascota?.nombre} (
                            {selectedMascota?.especie})
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Stethoscope className="w-5 h-5 text-vet-primary" />
                        <div>
                          <p className="text-sm text-vet-gray-600">
                            Tipo de consulta
                          </p>
                          <p className="font-medium text-vet-gray-900">
                            {selectedTipoConsulta?.nombre}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-vet-primary" />
                        <div>
                          <p className="text-sm text-vet-gray-600">Fecha</p>
                          <p className="font-medium text-vet-gray-900">
                            {citaData.fecha &&
                              new Date(citaData.fecha).toLocaleDateString(
                                "es-ES",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                },
                              )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-vet-primary" />
                        <div>
                          <p className="text-sm text-vet-gray-600">Hora</p>
                          <p className="font-medium text-vet-gray-900">
                            {citaData.hora}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-vet-primary" />
                        <div>
                          <p className="text-sm text-vet-gray-600">
                            Veterinario
                          </p>
                          <p className="font-medium text-vet-gray-900">
                            {selectedVeterinario?.nombre ||
                              "Cualquier veterinario disponible"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-vet-primary" />
                        <div>
                          <p className="text-sm text-vet-gray-600">Ubicación</p>
                          <p className="font-medium text-vet-gray-900">
                            {citaData.ubicacion}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5 text-vet-primary" />
                        <div>
                          <p className="text-sm text-vet-gray-600">Precio</p>
                          <p className="font-medium text-vet-gray-900">
                            S/. {selectedTipoConsulta?.precio.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {citaData.motivo && (
                      <div>
                        <p className="text-sm text-vet-gray-600 mb-1">Motivo</p>
                        <p className="font-medium text-vet-gray-900">
                          {citaData.motivo}
                        </p>
                      </div>
                    )}

                    {citaData.notas && (
                      <div>
                        <p className="text-sm text-vet-gray-600 mb-1">
                          Notas adicionales
                        </p>
                        <p className="font-medium text-vet-gray-900">
                          {citaData.notas}
                        </p>
                      </div>
                    )}
                  </div>

                  <Alert className="border-yellow-200 bg-yellow-50">
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-800">
                      <strong>Importante:</strong> Tu cita quedará en estado
                      "Pendiente de Pago". Deberás subir el comprobante de pago
                      para que sea confirmada.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 border-t">
                <Button
                  variant="outline"
                  onClick={
                    currentStep === 1 ? () => navigate("/mis-citas") : prevStep
                  }
                  className="flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {currentStep === 1 ? "Volver" : "Anterior"}
                </Button>

                {currentStep < 4 ? (
                  <Button
                    onClick={nextStep}
                    disabled={
                      (currentStep === 1 &&
                        (!citaData.tipoConsulta || !citaData.motivo.trim())) ||
                      (currentStep === 2 && !citaData.mascotaId) ||
                      (currentStep === 3 && (!citaData.fecha || !citaData.hora))
                    }
                    className="bg-vet-primary hover:bg-vet-primary-dark flex items-center"
                  >
                    Siguiente
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading || success}
                    className="bg-vet-primary hover:bg-vet-primary-dark flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Agendando...
                      </>
                    ) : success ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Cita Agendada
                      </>
                    ) : (
                      <>
                        Confirmar Cita
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
