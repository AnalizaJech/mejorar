import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  PawPrint,
  User,
  Calendar as CalendarIcon,
  Activity,
  FileText,
  Eye,
  Clock,
  AlertCircle,
  Info,
  CheckCircle,
  Phone,
  MessageCircle,
  Mail,
  MessageSquare,
  MapPin,
  Calendar,
  IdCard,
  Users,
  AlertTriangle,
  Bell,
  XCircle,
  Shield,
  Coins,
} from "lucide-react";
import type { CitaRelationData } from "@/lib/citaUtils";

const estadoColors = {
  pendiente_pago: "bg-yellow-100 text-yellow-800 border-yellow-300",
  en_validacion: "bg-blue-100 text-blue-800 border-blue-300",
  aceptada: "bg-green-100 text-green-800 border-green-300",
  atendida: "bg-purple-100 text-purple-800 border-purple-300",
  cancelada: "bg-red-100 text-red-800 border-red-300",
  expirada: "bg-red-100 text-red-800 border-red-300",
  rechazada: "bg-red-100 text-red-800 border-red-300",
  no_asistio: "bg-orange-100 text-orange-800 border-orange-300",
};

const estadoLabels = {
  pendiente_pago: "Pendiente de Pago",
  en_validacion: "En Validación",
  aceptada: "Confirmada",
  atendida: "Completada",
  cancelada: "Cancelada",
  expirada: "Expirada",
  rechazada: "Rechazada",
  no_asistio: "No Asistió",
};

interface CitaDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCita: CitaRelationData | null;
  onAttendCita?: (citaData: CitaRelationData) => void;
}

export default function CitaDetailModal({
  isOpen,
  onClose,
  selectedCita,
  onAttendCita,
}: CitaDetailModalProps) {
  const navigate = useNavigate();

  const getUrgencyBadge = (urgencyLevel: "alta" | "media" | "baja") => {
    const configs = {
      alta: {
        color: "bg-red-100 text-red-800 border-red-300",
        label: "Urgente",
        icon: AlertCircle,
      },
      media: {
        color: "bg-yellow-100 text-yellow-800 border-yellow-300",
        label: "Moderada",
        icon: Clock,
      },
      baja: {
        color: "bg-green-100 text-green-800 border-green-300",
        label: "Normal",
        icon: Info,
      },
    };

    const config = configs[urgencyLevel];
    const Icon = config.icon;

    return (
      <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  if (!selectedCita) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-vet-primary" />
            <span>Detalle de la Cita</span>
          </DialogTitle>
          <DialogDescription>
            Información completa de la cita de {selectedCita.cita.mascota}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Datos de la mascota */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <PawPrint className="w-5 h-5 text-vet-primary" />
                  <span>Datos del Paciente</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-vet-gray-600">
                    Nombre
                  </Label>
                  <p className="font-semibold text-vet-gray-900">
                    {selectedCita.cita.mascota}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-vet-gray-600">
                    Especie
                  </Label>
                  <p className="text-vet-gray-900">
                    {selectedCita.mascota?.especie || "No especificado"}
                  </p>
                </div>
                {selectedCita.mascota?.raza && (
                  <div>
                    <Label className="text-sm font-medium text-vet-gray-600">
                      Raza
                    </Label>
                    <p className="text-vet-gray-900">
                      {selectedCita.mascota.raza}
                    </p>
                  </div>
                )}
                {selectedCita.mascota?.fechaNacimiento && (
                  <div>
                    <Label className="text-sm font-medium text-vet-gray-600">
                      Edad
                    </Label>
                    <p className="text-vet-gray-900">
                      {(() => {
                        const birthDate = new Date(
                          selectedCita.mascota.fechaNacimiento,
                        );
                        const today = new Date();
                        const ageInYears = Math.floor(
                          (today.getTime() - birthDate.getTime()) /
                            (365.25 * 24 * 60 * 60 * 1000),
                        );
                        const ageInMonths = Math.floor(
                          (today.getTime() - birthDate.getTime()) /
                            (30.44 * 24 * 60 * 60 * 1000),
                        );

                        if (ageInYears >= 2) {
                          return `${ageInYears} años`;
                        } else if (ageInYears === 1) {
                          const extraMonths = ageInMonths - 12;
                          return extraMonths > 0
                            ? `1 año ${extraMonths} mes${extraMonths > 1 ? "es" : ""}`
                            : "1 año";
                        } else {
                          return `${ageInMonths} mes${ageInMonths > 1 ? "es" : ""}`;
                        }
                      })()}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Información del Propietario - Rediseñado */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-4 bg-gradient-to-r from-vet-primary/5 to-vet-secondary/5">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-vet-primary rounded-xl flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-vet-gray-900">Información del Propietario</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        <span className="text-sm text-vet-gray-600">Cliente activo</span>
                      </div>
                    </div>
                  </div>
                  {/* Acciones de contacto */}
                  <div className="flex items-center space-x-2">
                    {selectedCita.propietario?.telefono && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-9 w-9 p-0 border-green-500 text-green-600 hover:bg-green-50 hover:scale-105 transition-all"
                          onClick={() => {
                            const phoneNumber =
                              selectedCita.propietario.telefono.replace(
                                /\D/g,
                                "",
                              );
                            window.open(`tel:+51${phoneNumber}`, "_self");
                          }}
                          title="Llamar"
                        >
                          <Phone className="w-5 h-5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-9 w-9 p-0 border-green-600 text-green-700 hover:bg-green-50 hover:scale-105 transition-all"
                          onClick={() => {
                            const phoneNumber =
                              selectedCita.propietario.telefono.replace(
                                /\D/g,
                                "",
                              );
                            const message = `Hola ${selectedCita.propietario.nombre}, me comunico de la clínica veterinaria respecto a la cita de ${selectedCita.cita.mascota} programada para el ${new Date(selectedCita.cita.fecha).toLocaleDateString("es-ES")}.`;
                            window.open(
                              `https://wa.me/51${phoneNumber}?text=${encodeURIComponent(message)}`,
                              "_blank",
                            );
                          }}
                          title="WhatsApp"
                        >
                          <MessageCircle className="w-5 h-5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-9 w-9 p-0 border-purple-500 text-purple-600 hover:bg-purple-50 hover:scale-105 transition-all"
                          onClick={() => {
                            const phoneNumber =
                              selectedCita.propietario.telefono.replace(
                                /\D/g,
                                "",
                              );
                            const message = `Hola ${selectedCita.propietario.nombre}, me comunico de la clínica veterinaria respecto a la cita de ${selectedCita.cita.mascota}.`;
                            window.open(
                              `sms:+51${phoneNumber}?body=${encodeURIComponent(message)}`,
                              "_self",
                            );
                          }}
                          title="SMS"
                        >
                          <MessageSquare className="w-5 h-5" />
                        </Button>
                      </>
                    )}
                    {selectedCita.propietario?.email && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-9 w-9 p-0 border-blue-500 text-blue-600 hover:bg-blue-50 hover:scale-105 transition-all"
                        onClick={() => {
                          const subject = `Cita veterinaria - ${selectedCita.cita.mascota}`;
                          const body = `Estimado/a ${selectedCita.propietario.nombre},\n\nMe comunico respecto a la cita programada para ${selectedCita.cita.mascota} el ${new Date(selectedCita.cita.fecha).toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} a las ${new Date(selectedCita.cita.fecha).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}.\n\nSaludos,\nClínica Veterinaria`;
                          window.open(
                            `mailto:${selectedCita.propietario.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
                            "_self",
                          );
                        }}
                        title="Email"
                      >
                        <Mail className="w-5 h-5" />
                      </Button>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* Bio/Descripción personal si está disponible */}
                {(() => {
                  try {
                    const bio = localStorage.getItem("petla_user_bio");
                    if (bio && bio !== '""' && bio !== "null") {
                      const bioText = JSON.parse(bio);
                      if (bioText && bioText.trim()) {
                        return (
                          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                            <div className="flex items-start space-x-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                <MessageCircle className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <span className="text-xs font-medium text-blue-600 uppercase tracking-wide block mb-1">
                                  Acerca del cliente
                                </span>
                                <p className="text-sm text-vet-gray-700 italic leading-relaxed">
                                  "{bioText}"
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    }
                  } catch (e) {
                    console.error("Error loading bio:", e);
                  }
                  return null;
                })()}

                {/* Sección de Información del Propietario Rediseñada */}

                {/* Información Personal Principal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Datos de Identidad */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-blue-900">Identidad</h4>
                        <p className="text-sm text-blue-600">Datos personales del cliente</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs font-medium text-blue-600 uppercase tracking-wide block mb-1">
                          Nombres
                        </span>
                        <p className="text-lg font-bold text-blue-900">
                          {selectedCita.propietario?.nombre || "No registrado"}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-blue-600 uppercase tracking-wide block mb-1">
                          Apellidos
                        </span>
                        <p className="text-lg font-bold text-blue-900">
                          {selectedCita.propietario?.apellidos || "No registrado"}
                        </p>
                      </div>
                      {selectedCita.propietario?.username && (
                        <div>
                          <span className="text-xs font-medium text-blue-600 uppercase tracking-wide block mb-1">
                            Usuario
                          </span>
                          <p className="text-sm font-semibold text-blue-800">
                            @{selectedCita.propietario.username}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Estado de Verificación */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-green-900">Verificación</h4>
                        <p className="text-sm text-green-600">Estado de validación</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">Email</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {selectedCita.propietario?.email ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-xs font-medium text-green-700">Registrado</span>
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-4 h-4 text-yellow-600" />
                              <span className="text-xs font-medium text-yellow-700">No verificado</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">Teléfono</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {selectedCita.propietario?.telefono ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-xs font-medium text-green-700">Verificado</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-red-600" />
                              <span className="text-xs font-medium text-red-700">No registrado</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
                        <div className="flex items-center space-x-2">
                          <IdCard className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">Documento</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {selectedCita.propietario?.documento ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-xs font-medium text-green-700">Completo</span>
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-4 h-4 text-yellow-600" />
                              <span className="text-xs font-medium text-yellow-700">Pendiente</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Información de Contacto y Documentación Modernizada */}

                {/* Email con Estado Dinámico */}
                <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Correo Electrónico
                        </span>
                        {selectedCita.propietario?.email ? (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                            Registrado
                          </span>
                        ) : (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                            Sin email
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-gray-900 break-all">
                        {selectedCita.propietario?.email || "No registrado"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Teléfono con Opciones de Contacto */}
                <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Teléfono
                        </span>
                        {selectedCita.propietario?.telefono ? (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                            Verificado
                          </span>
                        ) : (
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">
                            Pendiente
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-gray-900 font-mono">
                        {selectedCita.propietario?.telefono || "No registrado"}
                      </p>
                      {selectedCita.propietario?.telefono && (
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-xs text-gray-500">Disponible vía:</span>
                          <div className="flex space-x-1">
                            <MessageCircle className="w-3 h-3 text-green-600" title="WhatsApp" />
                            <MessageSquare className="w-3 h-3 text-blue-600" title="SMS" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Documento con Validación */}
                <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                      <IdCard className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Documento de Identidad
                        </span>
                        {selectedCita.propietario?.documento ? (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                            {selectedCita.propietario?.tipoDocumento === "dni" && "DNI"}
                            {selectedCita.propietario?.tipoDocumento === "pasaporte" && "Pasaporte"}
                            {selectedCita.propietario?.tipoDocumento === "carnet_extranjeria" && "Carnet"}
                            {selectedCita.propietario?.tipoDocumento === "cedula" && "Cédula"}
                            {!selectedCita.propietario?.tipoDocumento && "DNI"}
                          </span>
                        ) : (
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium">
                            No registrado
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-gray-900 font-mono">
                        {selectedCita.propietario?.documento || "No registrado"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Informaci��n Personal y Dirección */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* NOMBRES */}
                  <div className="bg-gray-100 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                          NOMBRES
                        </span>
                        <p className="text-base font-semibold text-gray-900">
                          {selectedCita.propietario?.nombre || "Sin asignar"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* APELLIDOS */}
                  <div className="bg-gray-100 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                          APELLIDOS
                        </span>
                        <p className="text-base font-semibold text-gray-900">
                          {selectedCita.propietario?.apellidos || "No registrado"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* NOMBRE DE USUARIO */}
                  <div className="bg-gray-100 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-lg">@</span>
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                          NOMBRE DE USUARIO
                        </span>
                        <p className="text-base font-semibold text-gray-900">
                          {selectedCita.propietario?.username ? `@${selectedCita.propietario.username}` : "No registrado"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CORREO ELECTRÓNICO */}
                  <div className="bg-gray-100 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                        <Mail className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                          CORREO ELECTRÓNICO
                        </span>
                        <p className="text-base font-semibold text-gray-900 break-all">
                          {selectedCita.propietario?.email || "No registrado"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* TELÉFONO */}
                  <div className="bg-gray-100 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Phone className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                          TELÉFONO
                        </span>
                        <p className="text-base font-semibold text-gray-900 font-mono">
                          {selectedCita.propietario?.telefono || "No registrado"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* DOCUMENTO DE IDENTIDAD */}
                  <div className="bg-gray-100 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                        <IdCard className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                          DOCUMENTO DE IDENTIDAD
                        </span>
                        <p className="text-base font-semibold text-gray-900">
                          {selectedCita.propietario?.tipoDocumento === "dni" && "DNI"}
                          {selectedCita.propietario?.tipoDocumento === "pasaporte" && "Pasaporte"}
                          {selectedCita.propietario?.tipoDocumento === "carnet_extranjeria" && "Carnet de Extranjería"}
                          {selectedCita.propietario?.tipoDocumento === "cedula" && "Cédula"}
                          {!selectedCita.propietario?.tipoDocumento && "DNI"}
                          : {selectedCita.propietario?.documento || "73126518"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Género */}
                  {selectedCita.propietario?.genero && (
                    <div className="bg-gray-100 rounded-2xl p-4 border border-gray-200 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                            Género
                          </span>
                          <p className="text-base font-semibold text-gray-900 capitalize">
                            {selectedCita.propietario.genero === 'masculino' && 'Masculino'}
                            {selectedCita.propietario.genero === 'femenino' && 'Femenino'}
                            {selectedCita.propietario.genero === 'otro' && 'Otro'}
                            {selectedCita.propietario.genero === 'prefiero_no_decir' && 'Prefiero no decir'}
                            {!['masculino', 'femenino', 'otro', 'prefiero_no_decir'].includes(selectedCita.propietario.genero) && selectedCita.propietario.genero}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Fecha de Nacimiento */}
                  {selectedCita.propietario?.fechaNacimiento && (
                    <div className="bg-gray-100 rounded-2xl p-4 border border-gray-200 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-brown-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-yellow-700" />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                            Fecha de Nacimiento
                          </span>
                          <p className="text-base font-semibold text-gray-900">
                            {new Date(selectedCita.propietario.fechaNacimiento).toLocaleDateString("es-ES", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                          <span className="text-xs text-gray-500">
                            {Math.floor((new Date().getTime() - new Date(selectedCita.propietario.fechaNacimiento).getTime()) / (365.25 * 24 * 60 * 60 * 1000))} años
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Direcci��n */}
                  {selectedCita.propietario?.direccion && (
                    <div className="bg-gray-100 rounded-2xl p-4 border border-gray-200 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                            Dirección
                          </span>
                          <p className="text-base font-semibold text-gray-900 leading-tight">
                            {selectedCita.propietario.direccion}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Cliente desde */}
                {selectedCita.propietario?.fechaCreacion && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-vet-gray-50 to-vet-gray-100 rounded-xl border border-vet-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-vet-primary rounded-lg flex items-center justify-center">
                        <CalendarIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-vet-gray-500 uppercase tracking-wide block mb-1">
                          Cliente desde
                        </span>
                        <p className="text-lg font-bold text-vet-gray-900">
                          {new Date(selectedCita.propietario.fechaCreacion).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Detalles de la cita */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <CalendarIcon className="w-5 h-5 text-vet-primary" />
                <span>Detalles de la Cita</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-vet-gray-600">
                    Fecha
                  </Label>
                  <p className="text-vet-gray-900">
                    {new Date(selectedCita.cita.fecha).toLocaleDateString(
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
                <div>
                  <Label className="text-sm font-medium text-vet-gray-600">
                    Hora
                  </Label>
                  <p className="text-vet-gray-900">
                    {new Date(selectedCita.cita.fecha).toLocaleTimeString(
                      "es-ES",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-vet-gray-600">
                    Estado
                  </Label>
                  <div className="mt-1">
                    <Badge className={estadoColors[selectedCita.cita.estado]}>
                      {estadoLabels[selectedCita.cita.estado]}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-vet-gray-600">
                  Motivo de la consulta
                </Label>
                <p className="text-vet-gray-900 mt-1 p-3 bg-vet-gray-50 rounded-lg">
                  {selectedCita.cita.motivo}
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium text-vet-gray-600">
                  Nivel de urgencia
                </Label>
                <div className="mt-1">
                  {getUrgencyBadge(selectedCita.urgencyLevel)}
                </div>
              </div>

              {selectedCita.cita.notas && (
                <div>
                  <Label className="text-sm font-medium text-vet-gray-600">
                    Notas
                  </Label>
                  <p className="text-vet-gray-900 mt-1 p-3 bg-vet-gray-50 rounded-lg">
                    {selectedCita.cita.notas}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Información del servicio */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Activity className="w-5 h-5 text-vet-primary" />
                <span>Información del Servicio</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-vet-gray-600">
                    Tipo de Consulta
                  </Label>
                  <p className="text-vet-gray-900 font-medium">
                    {selectedCita.cita.tipoConsulta
                      ? selectedCita.cita.tipoConsulta
                          .replace("_", " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())
                      : "Consulta"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-vet-gray-600">
                    Ubicación
                  </Label>
                  <p className="text-vet-gray-900">
                    {selectedCita.cita.ubicacion || "Clínica"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-vet-gray-600 flex items-center space-x-2">
                    <Coins className="w-4 h-4 text-yellow-600" />
                    <span>Precio del Servicio</span>
                  </Label>
                  <p className="text-vet-gray-900 font-semibold text-lg">
                    S/.{" "}
                    {selectedCita.cita.precio
                      ? selectedCita.cita.precio.toLocaleString()
                      : "0"}
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-vet-gray-600">
                  Veterinario Asignado
                </Label>
                <p className="text-vet-gray-900 font-medium">
                  {selectedCita.cita.veterinario}
                </p>
              </div>

              {/* Descripción del servicio según el tipo */}
              <div>
                <Label className="text-sm font-medium text-vet-gray-600">
                  Descripción del Servicio
                </Label>
                <div className="mt-1 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-900 text-sm">
                    {(() => {
                      switch (selectedCita.cita.tipoConsulta) {
                        case "consulta_general":
                          return "Revisión médica completa, evaluación del estado general de salud, revisión de signos vitales y recomendaciones preventivas.";
                        case "vacunacion":
                          return "Aplicación de vacunas según el esquema de vacunación apropiado para la edad y especie de la mascota.";
                        case "emergencia":
                          return "Atención médica urgente para casos que requieren intervención inmediata para preservar la salud del animal.";
                        case "grooming":
                          return "Servicios de higiene y estética que incluyen baño, corte de pelo, limpieza de oídos y corte de uñas.";
                        case "cirugia":
                          return "Procedimiento quirúrgico especializado realizado en instalaciones equipadas con la tecnología necesaria.";
                        case "diagnostico":
                          return "Estudios y análisis especializados para determinar el diagnóstico correcto mediante pruebas específicas.";
                        default:
                          return "Servicio veterinario profesional adaptado a las necesidades específicas de su mascota.";
                      }
                    })()}
                  </p>
                </div>
              </div>

              {/* Estado del pago */}
              {selectedCita.cita.comprobanteData && (
                <div>
                  <Label className="text-sm font-medium text-vet-gray-600">
                    Comprobante de Pago
                  </Label>
                  <div className="mt-1 flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Pago Verificado
                    </Badge>
                    <span className="text-sm text-vet-gray-600">
                      {selectedCita.cita.comprobanteData.originalName}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Botones de acción */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>

            {selectedCita.cita.estado === "aceptada" && onAttendCita && (
              <Button
                onClick={() => {
                  onAttendCita(selectedCita);
                  onClose();
                }}
                className="bg-vet-primary hover:bg-vet-primary-dark"
              >
                <Activity className="w-5 h-5 mr-2" />
                Atender Cita
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
