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
  MapPin,
  IdCard,
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

            {/* Información del Propietario */}
            <Card className="border-2 border-vet-primary/10 bg-gradient-to-br from-white to-vet-primary/5">
              <CardHeader className="pb-4 bg-gradient-to-r from-vet-primary/5 to-vet-secondary/5 rounded-t-lg">
                <CardTitle className="flex items-center space-x-3 text-lg">
                  <div className="p-2 bg-vet-primary/10 rounded-lg">
                    <User className="w-5 h-5 text-vet-primary" />
                  </div>
                  <span className="text-vet-gray-900">Información del Propietario</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Nombres y Apellidos - Sección principal */}
                <div className="bg-white border border-vet-gray-200 rounded-xl p-4 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-vet-gray-700 flex items-center space-x-2">
                        <div className="w-2 h-2 bg-vet-primary rounded-full"></div>
                        <span>Nombres</span>
                      </Label>
                      <div className="p-3 bg-vet-gray-50 rounded-lg border border-vet-gray-200">
                        <p className="font-semibold text-vet-gray-900 text-lg">
                          {selectedCita.propietario?.nombre || "No registrado"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-vet-gray-700 flex items-center space-x-2">
                        <div className="w-2 h-2 bg-vet-secondary rounded-full"></div>
                        <span>Apellidos</span>
                      </Label>
                      <div className="p-3 bg-vet-gray-50 rounded-lg border border-vet-gray-200">
                        <p className="font-semibold text-vet-gray-900 text-lg">
                          {selectedCita.propietario?.apellidos || "No registrado"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Información de Contacto */}
                <div className="bg-white border border-vet-gray-200 rounded-xl p-4 shadow-sm">
                  <h4 className="text-md font-semibold text-vet-gray-800 mb-4 flex items-center space-x-2">
                    <div className="p-1.5 bg-green-100 rounded-lg">
                      <Phone className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Contacto</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-vet-gray-600 flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-blue-500" />
                        <span>Email</span>
                      </Label>
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-vet-gray-900 break-all font-mono text-sm">
                          {selectedCita.propietario?.email || "No registrado"}
                        </p>
                      </div>
                    </div>

                    {/* Teléfono */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-vet-gray-600 flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-green-500" />
                        <span>Teléfono</span>
                      </Label>
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center justify-between">
                          <p className="text-vet-gray-900 font-mono font-semibold">
                            {selectedCita.propietario?.telefono || "No registrado"}
                          </p>
                          {selectedCita.propietario?.telefono && (
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0 border-green-500 text-green-600 hover:bg-green-100 transition-all"
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
                                <Phone className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0 border-green-600 text-green-700 hover:bg-green-100 transition-all"
                                onClick={() => {
                                  const phoneNumber =
                                    selectedCita.propietario.telefono.replace(
                                      /\D/g,
                                      "",
                                    );
                                  const message = `Hola ${selectedCita.propietario.nombre}, me comunico de la clínica veterinaria respecto a la cita de ${selectedCita.cita.mascota}.`;
                                  window.open(
                                    `https://wa.me/51${phoneNumber}?text=${encodeURIComponent(message)}`,
                                    "_blank",
                                  );
                                }}
                                title="WhatsApp"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Información Personal */}
                <div className="bg-white border border-vet-gray-200 rounded-xl p-4 shadow-sm">
                  <h4 className="text-md font-semibold text-vet-gray-800 mb-4 flex items-center space-x-2">
                    <div className="p-1.5 bg-purple-100 rounded-lg">
                      <IdCard className="w-4 h-4 text-purple-600" />
                    </div>
                    <span>Datos Personales</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Documento */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-vet-gray-600 flex items-center space-x-2">
                        <IdCard className="w-4 h-4 text-purple-500" />
                        <span>Documento de Identidad</span>
                      </Label>
                      <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <p className="text-vet-gray-900 font-mono font-semibold">
                          {selectedCita.propietario?.tipoDocumento === "dni" &&
                            "DNI: "}
                          {selectedCita.propietario?.tipoDocumento ===
                            "pasaporte" && "Pasaporte: "}
                          {selectedCita.propietario?.tipoDocumento ===
                            "carnet_extranjeria" && "Carnet: "}
                          {selectedCita.propietario?.tipoDocumento === "cedula" &&
                            "Cédula: "}
                          {!selectedCita.propietario?.tipoDocumento && "DNI: "}
                          {selectedCita.propietario?.documento || "No registrado"}
                        </p>
                      </div>
                    </div>

                    {/* Género */}
                    {selectedCita.propietario?.genero && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-vet-gray-600 flex items-center space-x-2">
                          <User className="w-4 h-4 text-amber-500" />
                          <span>Género</span>
                        </Label>
                        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                          <p className="text-vet-gray-900 font-medium">
                            {selectedCita.propietario.genero === "masculino" &&
                              "Masculino"}
                            {selectedCita.propietario.genero === "femenino" &&
                              "Femenino"}
                            {selectedCita.propietario.genero === "otro" && "Otro"}
                            {selectedCita.propietario.genero ===
                              "prefiero_no_decir" && "Prefiero no decir"}
                            {![
                              "masculino",
                              "femenino",
                              "otro",
                              "prefiero_no_decir",
                            ].includes(selectedCita.propietario.genero) &&
                              selectedCita.propietario.genero}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Username */}
                    {selectedCita.propietario?.username && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-vet-gray-600 flex items-center space-x-2">
                          <User className="w-4 h-4 text-indigo-500" />
                          <span>Usuario</span>
                        </Label>
                        <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                          <p className="text-vet-gray-900 font-mono">
                            @{selectedCita.propietario.username}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Fecha de Nacimiento */}
                    {selectedCita.propietario?.fechaNacimiento && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-vet-gray-600 flex items-center space-x-2">
                          <CalendarIcon className="w-4 h-4 text-rose-500" />
                          <span>Fecha de Nacimiento</span>
                        </Label>
                        <div className="p-3 bg-rose-50 rounded-lg border border-rose-200">
                          <p className="text-vet-gray-900 font-medium">
                            {new Date(
                              selectedCita.propietario.fechaNacimiento,
                            ).toLocaleDateString("es-ES", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}{" "}
                            <span className="text-sm text-vet-gray-600">
                              (
                              {Math.floor(
                                (new Date().getTime() -
                                  new Date(
                                    selectedCita.propietario.fechaNacimiento,
                                  ).getTime()) /
                                  (365.25 * 24 * 60 * 60 * 1000),
                              )}{" "}
                              años)
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Dirección - Sección separada */}
                {selectedCita.propietario?.direccion && (
                  <div className="bg-white border border-vet-gray-200 rounded-xl p-4 shadow-sm">
                    <h4 className="text-md font-semibold text-vet-gray-800 mb-3 flex items-center space-x-2">
                      <div className="p-1.5 bg-cyan-100 rounded-lg">
                        <MapPin className="w-4 h-4 text-cyan-600" />
                      </div>
                      <span>Dirección</span>
                    </h4>
                    <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                      <p className="text-vet-gray-900 leading-relaxed">
                        {selectedCita.propietario.direccion}
                      </p>
                    </div>
                  </div>
                )}

                {/* Cliente desde - Badge especial */}
                {selectedCita.propietario?.fechaRegistro && (
                  <div className="bg-gradient-to-r from-vet-primary/10 to-vet-secondary/10 border border-vet-primary/20 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-vet-primary/20 rounded-lg">
                        <CalendarIcon className="w-5 h-5 text-vet-primary" />
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-vet-gray-700">
                          Cliente desde
                        </Label>
                        <p className="text-vet-gray-900 font-bold text-lg">
                          {new Date(
                            selectedCita.propietario.fechaRegistro,
                          ).toLocaleDateString("es-ES", {
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
                  <Label className="text-sm font-medium text-vet-gray-600 flex items-center space-x-1">
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
