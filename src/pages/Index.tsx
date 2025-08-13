import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { animateCounters } from "@/lib/counter";
import { Link } from "react-router-dom";
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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import Layout from "@/components/Layout";
import FeaturesCarousel from "@/components/FeaturesCarousel";
import { useAppContext } from "@/contexts/AppContext";
import {
  Dog,
  Cat,
  Heart,
  Calendar,
  Shield,
  Clock,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Star,
  Users,
  Stethoscope,
  PawPrint,
  ArrowRight,
  TrendingUp,
  FileText,
  ChevronDown,
  Activity,
  Scissors,
  Syringe,
  Zap,
  Bell,
  AlertCircle,
  Search,
  MonitorSpeaker,
  Scan,
  TestTube,
  AlertTriangle,
  Monitor,
  Droplets,
  Bed,
  ShoppingBag,
  Pill,
  Gift,
} from "lucide-react";
import { getVeterinaryServices, getServicesByCategory } from "@/lib/veterinaryServices";

// Default services configuration
const defaultServices = [
  {
    id: "consulta_general",
    nombre: "Consulta General",
    precio: 80,
    icono: "Stethoscope",
    descripcion:
      "Evaluaciones médicas completas con diagnóstico preciso y plan de tratamiento personalizado.",
    activo: true,
    color: "vet-primary",
    colorBg: "vet-primary/10",
    colorHover: "vet-primary/30",
  },
  {
    id: "vacunacion",
    nombre: "Vacunación",
    precio: 65,
    icono: "Syringe",
    descripcion:
      "Esquemas de vacunación completos adaptados a la edad, especie y necesidades de tu mascota.",
    activo: true,
    color: "green-600",
    colorBg: "green-500/10",
    colorHover: "green-500/30",
  },
  {
    id: "emergencia",
    nombre: "Emergencias",
    precio: 150,
    icono: "AlertCircle",
    descripcion:
      "Atención médica urgente 24/7 para situaciones críticas con respuesta inmediata.",
    activo: true,
    color: "red-600",
    colorBg: "red-500/10",
    colorHover: "red-500/30",
  },
  {
    id: "grooming",
    nombre: "Grooming",
    precio: 45,
    icono: "Heart",
    descripcion:
      "Servicios completos de higiene y estética para mantener a tu mascota bella y saludable.",
    activo: true,
    color: "vet-secondary",
    colorBg: "vet-secondary/10",
    colorHover: "vet-secondary/30",
  },
  {
    id: "cirugia",
    nombre: "Cirugía",
    precio: 250,
    icono: "Activity",
    descripcion:
      "Procedimientos quirúrgicos especializados con anestesia segura y recuperación monitoreada.",
    activo: true,
    color: "purple-600",
    colorBg: "purple-500/10",
    colorHover: "purple-500/30",
  },
  {
    id: "diagnostico",
    nombre: "Diagnóstico",
    precio: 120,
    icono: "Search",
    descripcion:
      "Análisis clínicos, radiografías y estudios especializados para diagnósticos precisos.",
    activo: true,
    color: "blue-600",
    colorBg: "blue-500/10",
    colorHover: "blue-500/30",
  },
];

// Function to get services from localStorage or default
const getServicios = () => {
  try {
    const savedServices = localStorage.getItem("veterinary_services");
    if (savedServices) {
      const services = JSON.parse(savedServices);
      // Only return active services and add display colors
      return services
        .filter((service: any) => service.activo)
        .map((service: any, index: number) => {
          const defaultService =
            defaultServices[index % defaultServices.length];
          return {
            ...service,
            color: defaultService.color,
            colorBg: defaultService.colorBg,
            colorHover: defaultService.colorHover,
          };
        });
    }
  } catch (error) {
    console.error("Error loading services from localStorage:", error);
  }
  // Return default services if localStorage is empty or error
  return defaultServices;
};

// Function to get service icon
const getServiceIcon = (iconName: string) => {
  const iconProps = { className: "w-10 h-10 text-white" };
  switch (iconName) {
    case "Stethoscope":
      return <Stethoscope {...iconProps} />;
    case "Syringe":
      return <Syringe {...iconProps} />;
    case "AlertCircle":
      return <Zap {...iconProps} />;
    case "Heart":
      return <Scissors {...iconProps} />;
    case "Activity":
      return <Activity {...iconProps} />;
    case "Search":
      return <FileText {...iconProps} />;
    default:
      return <Stethoscope {...iconProps} />;
  }
};

export default function Index() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppContext();
  const [servicios, setServicios] = useState(getServicios());

  // Listen for service updates
  useEffect(() => {
    const updateServices = () => {
      setServicios(getServicios());
    };

    // Listen for storage changes (when admin updates services)
    window.addEventListener("storage", updateServices);
    // Listen for custom event when services are updated
    window.addEventListener("servicesUpdated", updateServices);

    return () => {
      window.removeEventListener("storage", updateServices);
      window.removeEventListener("servicesUpdated", updateServices);
    };
  }, []);

  // Function to handle service selection
  const handleServiceClick = (serviceId: string) => {
    if (isAuthenticated && user?.rol === "cliente") {
      // User is logged in as client, go directly to Nueva Cita with preselected service
      navigate("/nueva-cita", { state: { preselectedService: serviceId } });
    } else {
      // User is not logged in or not a client, redirect to login with return URL
      navigate("/login", {
        state: { returnTo: "/nueva-cita", preselectedService: serviceId },
      });
    }
  };

  // Handle hash routing for anchor links
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.substring(1);
      const element = document.getElementById(elementId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location.hash]);

  // Animate counters on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      animateCounters();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section
        id="inicio"
        className="relative bg-gradient-to-br from-vet-primary/10 via-white to-vet-secondary/10 py-20 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="animate-fade-in z-10 relative">
              <div className="flex items-center space-x-2 mb-6">
                <Badge className="bg-vet-primary/10 text-vet-primary border-vet-primary/20 cursor-default">
                  <PawPrint className="w-3 h-3 mr-1" />
                  Atención profesional 24/7
                </Badge>
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-vet-gray-900 mb-6">
                La salud de tus mascotas
                <span className="text-vet-primary block">
                  en las mejores manos
                </span>
              </h1>
              <p className="text-lg text-vet-gray-600 mb-8 max-w-xl">
                Sistema integral de gestión veterinaria con citas automatizadas,
                historial clínico digital y un equipo de veterinarios
                especializados comprometidos con el bienestar de tus compañeros
                de vida.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {isAuthenticated ? (
                  // Authenticated user buttons
                  <>
                    <Link to="/dashboard">
                      <Button
                        size="lg"
                        className="w-full sm:w-auto bg-vet-primary hover:bg-vet-primary-dark text-white shadow-lg"
                      >
                        {user?.rol === "admin"
                          ? "Panel de Administración"
                          : user?.rol === "veterinario"
                            ? "Panel Veterinario"
                            : "Mi Dashboard"}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                    {user?.rol === "cliente" && (
                      <Link to="/mascotas">
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full sm:w-auto border-vet-primary text-vet-primary hover:bg-vet-primary hover:text-white"
                        >
                          Mis Mascotas
                        </Button>
                      </Link>
                    )}
                  </>
                ) : (
                  // Non-authenticated user buttons
                  <>
                    <Button
                      size="lg"
                      className="bg-vet-primary hover:bg-vet-primary-dark text-white shadow-lg"
                      onClick={() =>
                        document
                          .getElementById("servicios")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      Ver Servicios
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                    <Link to="/login">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto border-vet-primary text-vet-primary hover:bg-vet-primary hover:text-white"
                      >
                        Portal de Clientes
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              {/* Trust indicators */}
              <div className="flex items-center space-x-6 text-sm text-vet-gray-600">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-vet-primary" />
                  <span>Citas en 24h</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-vet-primary" />
                  <span>Historial digital</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-vet-primary" />
                  <span>Pago seguro</span>
                </div>
              </div>
            </div>

            {/* Right Column - Hero Images */}
            <div className="relative">
              {/* Main hero image - Happy pet */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/3] relative">
                  <img
                    src="https://images.pexels.com/photos/7465697/pexels-photo-7465697.jpeg"
                    alt="Equipo veterinario profesional en clínica moderna con ambiente colaborativo"
                    className="w-full h-full object-cover scale-110"
                  />
                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                  {/* Floating badge */}
                  <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 bg-white/95 backdrop-blur-sm rounded-xl p-2 md:p-4 shadow-lg transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center space-x-2 md:space-x-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Stethoscope className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs md:text-sm font-bold text-vet-gray-900">
                          Mascota Feliz
                        </p>
                        <p className="text-xs text-vet-gray-600">
                          Cuidado Profesional
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quality badge */}
                  <div className="hidden md:block absolute top-2 right-2 md:top-4 md:right-4 bg-white rounded-xl shadow-lg p-2 md:p-4 z-10 transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center space-x-2 md:space-x-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm md:text-lg font-bold text-vet-gray-900">
                          24/7
                        </p>
                        <p className="text-xs md:text-sm text-vet-gray-600">
                          Disponible
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stats cards */}
              <div className="hidden sm:block absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-4 z-10 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-vet-gray-900">98%</p>
                    <p className="text-sm text-vet-gray-600">Satisfacción</p>
                  </div>
                </div>
              </div>

              <div className="hidden sm:block absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 z-10 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-vet-gray-900">1000+</p>
                    <p className="text-sm text-vet-gray-600">Mascotas</p>
                  </div>
                </div>
              </div>

              {/* Small floating images */}
            </div>
          </div>
        </div>

        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-vet-primary/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-vet-secondary/5 rounded-full translate-y-48 -translate-x-48"></div>
      </section>

      {/* Animated Counter Section */}
      <section
        id="nosotros"
        className="py-20 bg-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full mb-6">
              <TrendingUp className="w-4 h-4 text-purple-600 mr-2" />
              <span className="text-purple-600 font-semibold text-sm">
                NUESTRO IMPACTO
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="text-vet-gray-900">¿Por qué eligen</span>
              <span className="block text-purple-600">PetLA?</span>
            </h2>
            <p className="text-xl text-vet-gray-600 max-w-3xl mx-auto">
              Miles de familias han confiado en nosotros para cuidar la salud de
              sus mascotas. Estos números reflejan nuestro compromiso y
              dedicación.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Counter 1 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-vet-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-vet-primary group-hover:scale-110 transition-all duration-500">
                  <Users className="w-10 h-10 text-vet-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <div
                  className="counter text-4xl lg:text-5xl font-bold text-vet-primary mb-2"
                  data-target="500"
                >
                  0+
                </div>
                <p className="text-lg font-semibold text-vet-gray-900">
                  Familias Satisfechas
                </p>
                <p className="text-sm text-vet-gray-600">
                  Confiando en nuestro servicio
                </p>
              </div>
            </div>

            {/* Counter 2 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-vet-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-vet-secondary group-hover:scale-110 transition-all duration-500">
                  <Stethoscope className="w-10 h-10 text-vet-secondary group-hover:text-white transition-colors duration-300" />
                </div>
                <div
                  className="counter text-4xl lg:text-5xl font-bold text-vet-secondary mb-2"
                  data-target="15"
                >
                  0+
                </div>
                <p className="text-lg font-semibold text-vet-gray-900">
                  Veterinarios Expertos
                </p>
                <p className="text-sm text-vet-gray-600">
                  Especializados y certificados
                </p>
              </div>
            </div>

            {/* Counter 3 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500 group-hover:scale-110 transition-all duration-500">
                  <PawPrint className="w-10 h-10 text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div
                  className="counter text-4xl lg:text-5xl font-bold text-green-600 mb-2"
                  data-target="2500"
                >
                  0+
                </div>
                <p className="text-lg font-semibold text-vet-gray-900">
                  Mascotas Atendidas
                </p>
                <p className="text-sm text-vet-gray-600">
                  Con resultados exitosos
                </p>
              </div>
            </div>

            {/* Counter 4 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-500 group-hover:scale-110 transition-all duration-500">
                  <Star className="w-10 h-10 text-yellow-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div
                  className="counter text-4xl lg:text-5xl font-bold text-yellow-600 mb-2"
                  data-target="4.9"
                >
                  0
                </div>
                <p className="text-lg font-semibold text-vet-gray-900">
                  Calificación Promedio
                </p>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-500 fill-current"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle background decorations */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-vet-primary/5 rounded-full animate-float"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-vet-secondary/5 rounded-full animate-float delay-1000"></div>
      </section>

      {/* Servicios Section */}
      <section
        id="servicios"
        className="py-24 bg-gradient-to-br from-vet-gray-50 via-white to-vet-primary/5 relative overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-vet-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-vet-secondary/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Stethoscope className="w-4 h-4" />
              SERVICIOS VETERINARIOS
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-vet-gray-900">
                ¿Buscas el mejor cuidado para
              </span>
              <span className="block text-emerald-600">tu mascota?</span>
            </h2>
            <p className="text-xl text-vet-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ofrecemos servicios veterinarios especializados con tecnología de
              vanguardia y el cuidado más humano para garantizar la salud y
              bienestar de tu mascota.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {servicios.map((servicio) => {
              const colorClasses = {
                "vet-primary": {
                  gradient: "from-vet-primary to-vet-primary-dark",
                  text: "text-vet-primary",
                  bg: "bg-vet-primary/10",
                  hover: "hover:bg-vet-primary",
                  border: "hover:border-vet-primary/30",
                  bgGradient: "from-vet-primary/5",
                },
                "green-600": {
                  gradient: "from-green-500 to-green-600",
                  text: "text-green-600",
                  bg: "bg-green-500/10",
                  hover: "hover:bg-green-500",
                  border: "hover:border-green-500/30",
                  bgGradient: "from-green-500/5",
                },
                "red-600": {
                  gradient: "from-red-500 to-red-600",
                  text: "text-red-600",
                  bg: "bg-red-500/10",
                  hover: "hover:bg-red-500",
                  border: "hover:border-red-500/30",
                  bgGradient: "from-red-500/5",
                },
                "vet-secondary": {
                  gradient: "from-vet-secondary to-vet-secondary-dark",
                  text: "text-vet-secondary",
                  bg: "bg-vet-secondary/10",
                  hover: "hover:bg-vet-secondary",
                  border: "hover:border-vet-secondary/30",
                  bgGradient: "from-vet-secondary/5",
                },
                "purple-600": {
                  gradient: "from-purple-500 to-purple-600",
                  text: "text-purple-600",
                  bg: "bg-purple-500/10",
                  hover: "hover:bg-purple-500",
                  border: "hover:border-purple-500/30",
                  bgGradient: "from-purple-500/5",
                },
                "blue-600": {
                  gradient: "from-blue-500 to-blue-600",
                  text: "text-blue-600",
                  bg: "bg-blue-500/10",
                  hover: "hover:bg-blue-500",
                  border: "hover:border-blue-500/30",
                  bgGradient: "from-blue-500/5",
                },
              };

              const colors =
                colorClasses[servicio.color as keyof typeof colorClasses] ||
                colorClasses["vet-primary"];

              return (
                <div
                  key={servicio.id}
                  className={`group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-vet-gray-100 ${colors.border} hover:-translate-y-2`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${colors.bgGradient} to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>
                  <div className="relative">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${colors.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      {getServiceIcon(servicio.icono)}
                    </div>
                    <h3 className="text-2xl font-bold text-vet-gray-900 mb-4">
                      {servicio.nombre}
                    </h3>
                    <p className="text-vet-gray-600 mb-6 leading-relaxed">
                      {servicio.descripcion}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-vet-gray-100">
                      <div>
                        <span className={`text-3xl font-bold ${colors.text}`}>
                          S/. {servicio.precio}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-4 h-4 text-vet-gray-400" />
                          <span className="text-sm text-vet-gray-500">
                            30-45 min
                          </span>
                        </div>
                      </div>
                      <div
                        className={`w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center ${colors.hover} group-hover:text-white transition-all duration-300 cursor-pointer`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleServiceClick(servicio.id);
                        }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose PetLA - Carousel Section */}
      <div id="caracteristicas">
        <FeaturesCarousel />
      </div>

      {/* Newsletter Section */}

      {/* Emergency Section - Harmonious Design */}
      <section
        id="emergencias"
        className="py-24 bg-gradient-to-br from-vet-gray-50 via-white to-vet-primary/5 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Floating Emergency Badge */}
          <div className="hidden md:block absolute top-4 left-4 md:top-8 md:left-8 animate-bounce z-20">
            <div className="bg-red-100 rounded-full p-3 md:p-4 shadow-lg border border-red-200">
              <div className="text-lg md:text-2xl font-bold text-red-600">
                24/7
              </div>
            </div>
          </div>

          {/* Emergency Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-red-100 rounded-full mb-8 backdrop-blur-sm border border-red-200">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-red-500 rounded-full flex items-center justify-center mr-3 md:mr-4 animate-pulse">
                <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-red-600 font-bold text-base md:text-lg">
                EMERGENCIAS VETERINARIAS
              </span>
            </div>

            <h2 className="text-5xl lg:text-6xl font-bold text-vet-gray-900 mb-8 leading-tight">
              ¿Tu mascota está en
              <span className="text-red-600 block lg:inline lg:ml-4">
                peligro?
              </span>
            </h2>
            <p className="text-2xl text-vet-gray-700 mb-6 font-medium max-w-3xl mx-auto">
              No pierdas tiempo. Contacta a nuestro equipo de emergencias ahora
              mismo.
            </p>
            <p className="text-lg text-vet-gray-600 max-w-2xl mx-auto">
              Veterinarios especializados disponibles las 24 horas para salvar
              la vida de tu compañero.
            </p>
          </div>

          {/* Emergency Action Center */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-vet-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Immediate Contact */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-vet-gray-900 mb-6">
                    Contacto Inmediato
                  </h3>

                  <a
                    href="tel:+5551234567"
                    className="group block bg-vet-primary/5 border-2 border-vet-primary/20 rounded-2xl p-4 md:p-6 hover:bg-vet-primary/10 hover:border-vet-primary/40 transition-all duration-300 hover:scale-105 min-h-[92px] md:h-[108px]"
                  >
                    <div className="flex items-center space-x-3 md:space-x-4 h-full">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-vet-primary rounded-2xl flex items-center justify-center group-hover:bg-vet-primary-dark transition-colors">
                        <Phone className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg md:text-xl font-bold text-vet-gray-900">
                          Llamar Ahora
                        </h4>
                        <p className="text-lg md:text-2xl font-bold text-vet-primary">
                          (555) 123-4567
                        </p>
                        <p className="text-sm md:text-base text-vet-gray-600">
                          Respuesta inmediata garantizada
                        </p>
                      </div>
                      <div className="text-vet-primary opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                        <ArrowRight className="w-6 h-6" />
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/5551234567"
                    className="group block bg-green-50 border-2 border-green-200 rounded-2xl p-4 md:p-6 hover:bg-green-100 hover:border-green-300 transition-all duration-300 hover:scale-105 min-h-[92px] md:h-[108px]"
                  >
                    <div className="flex items-center space-x-3 md:space-x-4 h-full">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-green-500 rounded-2xl flex items-center justify-center group-hover:bg-green-600 transition-colors">
                        <svg
                          className="w-6 h-6 md:w-8 md:h-8 text-white"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm.01 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.83-1.26-4.38 0-4.54 3.7-8.24 8.24-8.24s8.24 3.7 8.24 8.24-3.69 8.24-8.23 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43-.14-.01-.31-.01-.47-.01-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.37 1 2.54.12.17 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg md:text-xl font-bold text-green-800">
                          WhatsApp
                        </h4>
                        <p className="text-base md:text-lg font-semibold text-green-700">
                          Chat con veterinario
                        </p>
                        <p className="text-sm md:text-base text-green-600">
                          Envío de fotos y videos
                        </p>
                      </div>
                      <div className="text-green-600 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                        <ArrowRight className="w-6 h-6" />
                      </div>
                    </div>
                  </a>
                </div>

                {/* Emergency Steps - Colorful Harmonious Design */}
                <div className="flex flex-col">
                  <h3 className="text-xl md:text-2xl font-bold text-vet-gray-900 mb-6">
                    ¿Qué hacer mientras llegas?
                  </h3>

                  <div className="relative flex-1">
                    {/* Connection Line - connects all circles perfectly to the end */}
                    <div className="absolute left-6 top-6 h-[172px] w-1 bg-gradient-to-b from-blue-400 via-emerald-400 to-amber-400 rounded-full"></div>

                    <div className="space-y-6">
                      {/* Step 1 */}
                      <div className="relative flex items-start space-x-6 min-h-[56px]">
                        <div className="relative z-10 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">
                            1
                          </span>
                        </div>
                        <div className="flex-1 pl-2 pt-1">
                          <h5 className="font-bold text-blue-700 text-lg mb-1">
                            Mantén la calma
                          </h5>
                          <p className="text-blue-600">
                            Tu mascota puede sentir tu ansiedad
                          </p>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="relative flex items-start space-x-6 min-h-[56px]">
                        <div className="relative z-10 w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">
                            2
                          </span>
                        </div>
                        <div className="flex-1 pl-2 pt-1">
                          <h5 className="font-bold text-emerald-700 text-lg mb-1">
                            Observa los síntomas
                          </h5>
                          <p className="text-emerald-600">
                            Toma nota de lo que ves
                          </p>
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="relative flex items-start space-x-6 min-h-[56px]">
                        <div className="relative z-10 w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">
                            3
                          </span>
                        </div>
                        <div className="flex-1 pl-2 pt-1">
                          <h5 className="font-bold text-amber-700 text-lg mb-1">
                            No mediques
                          </h5>
                          <p className="text-amber-600">
                            Espera instrucciones del veterinario
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="group text-center bg-white rounded-3xl p-8 shadow-lg border border-vet-primary/20 hover:border-vet-primary/40 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-vet-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-vet-primary group-hover:scale-110 transition-all duration-300">
                <Clock className="w-8 h-8 text-vet-primary group-hover:text-white transition-colors" />
              </div>
              <div className="text-3xl font-bold text-vet-primary mb-2">
                &lt;5min
              </div>
              <p className="text-vet-gray-600 text-sm font-medium">
                Tiempo de respuesta promedio
              </p>
            </div>
            <div className="group text-center bg-white rounded-3xl p-8 shadow-lg border border-vet-secondary/20 hover:border-vet-secondary/40 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-vet-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-vet-secondary group-hover:scale-110 transition-all duration-300">
                <Dog className="w-8 h-8 text-vet-secondary group-hover:text-white transition-colors" />
              </div>
              <div className="text-3xl font-bold text-vet-secondary mb-2">
                24/7
              </div>
              <p className="text-vet-gray-600 text-sm font-medium">
                Disponibilidad completa
              </p>
            </div>
            <div className="group text-center bg-white rounded-3xl p-8 shadow-lg border border-green-200 hover:border-green-400 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500 group-hover:scale-110 transition-all duration-300">
                <CheckCircle className="w-8 h-8 text-green-600 group-hover:text-white transition-colors" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
              <p className="text-vet-gray-600 text-sm font-medium">
                Tasa de éxito en emergencias
              </p>
            </div>
            <div className="group text-center bg-white rounded-3xl p-8 shadow-lg border border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-300">
                <Star className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <p className="text-vet-gray-600 text-sm font-medium">
                Vidas salvadas este año
              </p>
            </div>
          </div>
        </div>

        {/* Subtle Background Effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-40 h-40 bg-vet-primary/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-vet-secondary/10 rounded-full animate-float"></div>
          <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-vet-primary/30 rounded-full animate-ping"></div>
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-vet-secondary/40 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-vet-primary/20 rounded-full animate-bounce delay-1000"></div>
        </div>
      </section>
    </Layout>
  );
}
