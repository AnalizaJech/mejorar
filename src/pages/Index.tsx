import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
} from "lucide-react";

export default function Index() {
  const location = useLocation();
  const { isAuthenticated, user } = useAppContext();

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
                    src="https://images.pexels.com/photos/7470753/pexels-photo-7470753.jpeg"
                    alt="Veterinario y equipo cuidando la salud de mascota"
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                  {/* Floating badge */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Stethoscope className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-vet-gray-900">
                          Mascota Feliz
                        </p>
                        <p className="text-xs text-vet-gray-600">
                          Cuidado Profesional
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quality badge */}
                  <div className="absolute top-4 right-4 bg-vet-primary backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-white/20 transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center gap-2">
                      <Shield className="w-6 h-6 text-white" />
                      <span className="text-white text-sm font-semibold">
                        Certificado
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stats cards */}
              <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-4 z-10 transform hover:scale-105 transition-all duration-300">
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

              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 z-10 transform hover:scale-105 transition-all duration-300">
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
            {/* Consulta General */}
            <div className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-vet-gray-100 hover:border-vet-primary/30 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-vet-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-vet-primary to-vet-primary-dark rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Stethoscope className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-vet-gray-900 mb-4">
                  Consulta General
                </h3>
                <p className="text-vet-gray-600 mb-6 leading-relaxed">
                  Evaluaciones médicas completas con diagnóstico preciso y plan
                  de tratamiento personalizado.
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-vet-gray-100">
                  <div>
                    <span className="text-3xl font-bold text-vet-primary">
                      S/. 80
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-vet-gray-400" />
                      <span className="text-sm text-vet-gray-500">
                        30-45 min
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-vet-primary/10 rounded-full flex items-center justify-center group-hover:bg-vet-primary group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Vacunación */}
            <div className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-vet-gray-100 hover:border-green-500/30 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Syringe className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-vet-gray-900 mb-4">
                  Vacunación
                </h3>
                <p className="text-vet-gray-600 mb-6 leading-relaxed">
                  Esquemas de vacunación completos adaptados a la edad, especie
                  y necesidades de tu mascota.
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-vet-gray-100">
                  <div>
                    <span className="text-3xl font-bold text-green-600">
                      S/. 65
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-vet-gray-400" />
                      <span className="text-sm text-vet-gray-500">
                        15-20 min
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Emergencias */}
            <div className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-vet-gray-100 hover:border-red-500/30 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-vet-gray-900 mb-4">
                  Emergencias
                </h3>
                <p className="text-vet-gray-600 mb-6 leading-relaxed">
                  Atención médica urgente 24/7 para situaciones críticas con
                  respuesta inmediata.
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-vet-gray-100">
                  <div>
                    <span className="text-3xl font-bold text-red-600">
                      S/. 150
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-vet-gray-400" />
                      <span className="text-sm text-vet-gray-500">
                        45-90 min
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Grooming */}
            <div className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-vet-gray-100 hover:border-vet-secondary/30 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-vet-secondary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-vet-secondary to-vet-secondary-dark rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Scissors className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-vet-gray-900 mb-4">
                  Grooming
                </h3>
                <p className="text-vet-gray-600 mb-6 leading-relaxed">
                  Servicios completos de higiene y estética para mantener a tu
                  mascota bella y saludable.
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-vet-gray-100">
                  <div>
                    <span className="text-3xl font-bold text-vet-secondary">
                      S/. 45
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-vet-gray-400" />
                      <span className="text-sm text-vet-gray-500">
                        60-120 min
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-vet-secondary/10 rounded-full flex items-center justify-center group-hover:bg-vet-secondary group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Cirugía */}
            <div className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-vet-gray-100 hover:border-purple-500/30 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Activity className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-vet-gray-900 mb-4">
                  Cirugía
                </h3>
                <p className="text-vet-gray-600 mb-6 leading-relaxed">
                  Procedimientos quirúrgicos especializados con anestesia segura
                  y recuperación monitoreada.
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-vet-gray-100">
                  <div>
                    <span className="text-3xl font-bold text-purple-600">
                      S/. 250
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-vet-gray-400" />
                      <span className="text-sm text-vet-gray-500">
                        90-180 min
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Diagnóstico */}
            <div className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-vet-gray-100 hover:border-blue-500/30 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <FileText className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-vet-gray-900 mb-4">
                  Diagnóstico
                </h3>
                <p className="text-vet-gray-600 mb-6 leading-relaxed">
                  Análisis clínicos, radiografías y estudios especializados para
                  diagnósticos precisos.
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-vet-gray-100">
                  <div>
                    <span className="text-3xl font-bold text-blue-600">
                      S/. 120
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-vet-gray-400" />
                      <span className="text-sm text-vet-gray-500">
                        30-45 min
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
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
          <div className="absolute top-8 right-8 animate-bounce">
            <div className="bg-vet-secondary rounded-full p-4 shadow-lg">
              <div className="text-2xl font-bold text-white">24/7</div>
            </div>
          </div>

          {/* Emergency Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-8 py-4 bg-red-100 rounded-full mb-8 backdrop-blur-sm border border-red-200">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-4 animate-pulse">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-red-600 font-bold text-lg">
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
                    className="group block bg-vet-primary/5 border-2 border-vet-primary/20 rounded-2xl p-6 hover:bg-vet-primary/10 hover:border-vet-primary/40 transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-vet-primary rounded-2xl flex items-center justify-center group-hover:bg-vet-primary-dark transition-colors">
                        <Phone className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-vet-gray-900">
                          Llamar Ahora
                        </h4>
                        <p className="text-2xl font-bold text-vet-primary">
                          (555) 123-4567
                        </p>
                        <p className="text-vet-gray-600">
                          Respuesta inmediata garantizada
                        </p>
                      </div>
                      <div className="text-vet-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-6 h-6" />
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/5551234567"
                    className="group block bg-green-50 border-2 border-green-200 rounded-2xl p-6 hover:bg-green-100 hover:border-green-300 transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center group-hover:bg-green-600 transition-colors">
                        <svg
                          className="w-8 h-8 text-white"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm.01 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.83-1.26-4.38 0-4.54 3.7-8.24 8.24-8.24s8.24 3.7 8.24 8.24-3.69 8.24-8.23 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43-.14-.01-.31-.01-.47-.01-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.37 1 2.54.12.17 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-green-800">
                          WhatsApp
                        </h4>
                        <p className="text-lg font-semibold text-green-700">
                          Chat con veterinario
                        </p>
                        <p className="text-green-600">
                          Envío de fotos y videos
                        </p>
                      </div>
                      <div className="text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-6 h-6" />
                      </div>
                    </div>
                  </a>
                </div>

                {/* Emergency Info */}
                <div className="bg-vet-gray-50 rounded-2xl p-6 border border-vet-gray-200">
                  <h4 className="text-xl font-bold text-vet-gray-900 mb-6">
                    ¿Qué hacer mientras llegas?
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-vet-secondary rounded-full flex items-center justify-center mt-1">
                        <span className="text-white font-bold text-sm">1</span>
                      </div>
                      <div>
                        <p className="text-vet-gray-900 font-medium">
                          Mantén la calma
                        </p>
                        <p className="text-vet-gray-600 text-sm">
                          Tu mascota puede sentir tu ansiedad
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-vet-secondary rounded-full flex items-center justify-center mt-1">
                        <span className="text-white font-bold text-sm">2</span>
                      </div>
                      <div>
                        <p className="text-vet-gray-900 font-medium">
                          Observa los síntomas
                        </p>
                        <p className="text-vet-gray-600 text-sm">
                          Toma nota de lo que ves
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-vet-secondary rounded-full flex items-center justify-center mt-1">
                        <span className="text-white font-bold text-sm">3</span>
                      </div>
                      <div>
                        <p className="text-vet-gray-900 font-medium">
                          No mediques
                        </p>
                        <p className="text-vet-gray-600 text-sm">
                          Espera instrucciones del veterinario
                        </p>
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
