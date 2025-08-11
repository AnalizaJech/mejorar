import { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Stethoscope,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  AlertCircle,
  CheckCircle,
  Syringe,
  Heart,
  Activity,
  Search,
  Scissors,
  Zap,
  Eye,
  Shield,
  Thermometer,
  PawPrint,
  FileText,
  Plus as CrossIcon,
  Target,
  Droplets,
  Snowflake,
  Sun,
  Clock,
  Calendar,
  MapPin,
  Car,
  Home,
  Building,
  Sparkles,
  Star,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface Servicio {
  id: string;
  nombre: string;
  precio: number;
  icono: string;
  descripcion: string;
  activo: boolean;
}

const iconos = [
  // Equipos médicos veterinarios
  { id: "Stethoscope", nombre: "Estetoscopio", component: Stethoscope },
  { id: "Syringe", nombre: "Jeringa", component: Syringe },
  { id: "Thermometer", nombre: "Termómetro", component: Thermometer },
  { id: "Eye_Microscopio", nombre: "Microscopio", component: Eye },
  { id: "Search_Radiografia", nombre: "Radiografía", component: Search },
  { id: "FileText_Laboratorio", nombre: "Laboratorio", component: FileText },
  { id: "Heart_Vendaje", nombre: "Vendaje", component: Heart },
  { id: "CrossIcon", nombre: "Cruz Médica", component: CrossIcon },

  // Procedimientos y servicios
  { id: "Activity_Cirugia", nombre: "Cirugía", component: Activity },
  { id: "Scissors", nombre: "Grooming", component: Scissors },
  { id: "Eye_Examen", nombre: "Examen", component: Eye },
  { id: "Search_Diagnostico", nombre: "Diagnóstico", component: Search },
  { id: "Heart_Medicamento", nombre: "Medicamento", component: Heart },
  { id: "Shield", nombre: "Prevención", component: Shield },
  { id: "Heart_Cardiologia", nombre: "Cardiología", component: Heart },
  { id: "Activity_Ultrasonido", nombre: "Ultrasonido", component: Activity },
  { id: "Star_Genetica", nombre: "Genética", component: Star },
  { id: "Target", nombre: "Tratamiento", component: Target },

  // Estados y urgencias
  { id: "AlertCircle", nombre: "Emergencia", component: AlertCircle },
  { id: "Zap", nombre: "Urgente", component: Zap },
  { id: "Heart_Cuidado", nombre: "Cuidado", component: Heart },
  { id: "CheckCircle", nombre: "Control", component: CheckCircle },
  { id: "FileText_Revision", nombre: "Revisión", component: FileText },

  // Tipos de animales/pacientes
  { id: "PawPrint", nombre: "Mascota", component: PawPrint },
  { id: "Activity_Ortopedia", nombre: "Ortopedia", component: Activity },
  { id: "Heart_Pediatria", nombre: "Pediatría", component: Heart },
  { id: "Star_Premium", nombre: "Premium", component: Star },

  // Servicios especiales
  { id: "Droplets", nombre: "Hidratación", component: Droplets },
  { id: "Snowflake", nombre: "Criocirugía", component: Snowflake },
  { id: "Sun", nombre: "Fototerapia", component: Sun },
  { id: "Sparkles", nombre: "Estética", component: Sparkles },
  { id: "Star_Especialidad", nombre: "Especialidad", component: Star },

  // Logística y ubicación
  { id: "Clock", nombre: "Programado", component: Clock },
  { id: "Calendar", nombre: "Cita", component: Calendar },
  { id: "MapPin", nombre: "Ubicación", component: MapPin },
  { id: "Car", nombre: "Móvil", component: Car },
  { id: "Home", nombre: "Domicilio", component: Home },
  { id: "Building", nombre: "Clínica", component: Building },
];

// Default services
const defaultServices: Servicio[] = [
  {
    id: "consulta_general",
    nombre: "Consulta General",
    precio: 80,
    icono: "Stethoscope",
    descripcion: "Examen médico rutinario y evaluación de salud general",
    activo: true,
  },
  {
    id: "vacunacion",
    nombre: "Vacunación",
    precio: 65,
    icono: "Syringe",
    descripcion: "Aplicación de vacunas preventivas y refuerzos",
    activo: true,
  },
  {
    id: "emergencia",
    nombre: "Emergencia",
    precio: 150,
    icono: "AlertCircle",
    descripcion: "Atención médica urgente las 24 horas",
    activo: true,
  },
  {
    id: "grooming",
    nombre: "Grooming",
    precio: 45,
    icono: "Heart",
    descripcion: "Baño, corte de pelo, limpieza de oídos y uñas",
    activo: true,
  },
  {
    id: "cirugia",
    nombre: "Cirugía",
    precio: 250,
    icono: "Activity",
    descripcion: "Procedimientos quirúrgicos especializados",
    activo: true,
  },
  {
    id: "diagnostico",
    nombre: "Diagnóstico",
    precio: 120,
    icono: "Search",
    descripcion: "Exámenes y análisis para determinar diagnósticos",
    activo: true,
  },
];

export default function Servicios() {
  const { user, addNotificacion, usuarios } = useAppContext();
  const { toast } = useToast();
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingService, setEditingService] = useState<Servicio | null>(null);
  const [deletingService, setDeletingService] = useState<Servicio | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<Servicio>({
    id: "",
    nombre: "",
    precio: 0,
    icono: "Stethoscope",
    descripcion: "",
    activo: true,
  });

  // Load services from localStorage or use defaults
  useEffect(() => {
    const loadServices = () => {
      try {
        const savedServices = localStorage.getItem("veterinary_services");
        if (savedServices) {
          setServicios(JSON.parse(savedServices));
        } else {
          // Initialize with default services
          setServicios(defaultServices);
          localStorage.setItem(
            "veterinary_services",
            JSON.stringify(defaultServices),
          );
        }
      } catch (error) {
        console.error("Error loading services:", error);
        setServicios(defaultServices);
      }
    };

    loadServices();
  }, []);

  const saveServices = (newServices: Servicio[]) => {
    try {
      localStorage.setItem("veterinary_services", JSON.stringify(newServices));
      setServicios(newServices);

      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event("servicesUpdated"));

      toast({
        title: "Servicios actualizados",
        description: "Los cambios se han guardado correctamente.",
      });
    } catch (error) {
      console.error("Error saving services:", error);
      toast({
        title: "Error",
        description: "No se pudieron guardar los cambios.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Validation
      if (!formData.nombre.trim()) {
        setError("El nombre del servicio es requerido");
        setIsLoading(false);
        return;
      }

      if (formData.precio <= 0) {
        setError("El precio debe ser mayor a 0");
        setIsLoading(false);
        return;
      }

      if (!formData.descripcion.trim()) {
        setError("La descripci��n es requerida");
        setIsLoading(false);
        return;
      }

      let updatedServices;

      if (editingService) {
        // Update existing service
        updatedServices = servicios.map((s) =>
          s.id === editingService.id
            ? { ...formData, id: editingService.id }
            : s,
        );
      } else {
        // Add new service
        const newId = `servicio_${Date.now()}`;
        const newService = { ...formData, id: newId };
        updatedServices = [...servicios, newService];

        // Notify the creator (admin) with a confirmation message
        if (user) {
          addNotificacion({
            usuarioId: user.id,
            tipo: "nuevo_servicio",
            titulo: "Servicio creado exitosamente",
            mensaje: `Has agregado el servicio "${newService.nombre}" al catálogo - Precio: S/. ${newService.precio}`,
            leida: false,
          });
        }

        // Notify all other users about the new service
        const otherUsers = usuarios.filter((u) => u.id !== user?.id);
        otherUsers.forEach((targetUser) => {
          addNotificacion({
            usuarioId: targetUser.id,
            tipo: "nuevo_servicio",
            titulo: "Nuevo servicio disponible",
            mensaje: `Se ha agregado el servicio "${newService.nombre}" al catálogo - Precio: S/. ${newService.precio}`,
            leida: false,
          });
        });
      }

      saveServices(updatedServices);
      handleCloseModal();
    } catch (error) {
      setError("Error al guardar el servicio");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (service: Servicio) => {
    setEditingService(service);
    setFormData(service);
    setShowModal(true);
  };

  const handleDelete = (service: Servicio) => {
    setDeletingService(service);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deletingService) {
      const updatedServices = servicios.filter(
        (s) => s.id !== deletingService.id,
      );
      saveServices(updatedServices);
      setShowDeleteModal(false);
      setDeletingService(null);
    }
  };

  const handleToggleActive = (service: Servicio) => {
    const updatedServices = servicios.map((s) =>
      s.id === service.id ? { ...s, activo: !s.activo } : s,
    );
    saveServices(updatedServices);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingService(null);
    setFormData({
      id: "",
      nombre: "",
      precio: 0,
      icono: "Stethoscope",
      descripcion: "",
      activo: true,
    });
    setError("");
  };

  const getIconComponent = (iconName: string) => {
    const icon = iconos.find((i) => i.id === iconName);
    return icon ? icon.component : Stethoscope;
  };

  if (!user || user.rol !== "admin") {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardContent className="p-6 text-center">
              <AlertCircle className="w-12 h-12 text-vet-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-vet-gray-900 mb-2">
                Acceso denegado
              </h3>
              <p className="text-vet-gray-600">
                Solo los administradores pueden gestionar servicios
              </p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout user={user}>
      <div className="min-h-screen bg-vet-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-vet-gray-900">
                  Gestión de Servicios
                </h1>
                <p className="text-vet-gray-600">
                  Administra los servicios veterinarios disponibles
                </p>
              </div>
              <Button
                onClick={() => {
                  handleCloseModal(); // Limpiar estado del modal
                  setShowModal(true);
                }}
                className="bg-vet-primary hover:bg-vet-primary-dark"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Servicio
              </Button>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicios.map((servicio) => {
              const IconComponent = getIconComponent(servicio.icono);
              return (
                <Card
                  key={servicio.id}
                  className={`transition-all hover:shadow-lg ${
                    !servicio.activo ? "opacity-60" : ""
                  }`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-vet-primary/10 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-vet-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {servicio.nombre}
                          </CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className="bg-vet-primary/10 text-vet-primary">
                              S/. {servicio.precio}
                            </Badge>
                            <Badge
                              variant={
                                servicio.activo ? "default" : "secondary"
                              }
                            >
                              {servicio.activo ? "Activo" : "Inactivo"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-vet-gray-600 mb-4 text-sm">
                      {servicio.descripcion}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-vet-gray-500">
                          Estado:
                        </span>
                        <Switch
                          checked={servicio.activo}
                          onCheckedChange={() => handleToggleActive(servicio)}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(servicio)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(servicio)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Create/Edit Modal */}
          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
              <DialogHeader className="flex-shrink-0">
                <DialogTitle>
                  {editingService ? "Editar Servicio" : "Nuevo Servicio"}
                </DialogTitle>
                <DialogDescription>
                  {editingService
                    ? "Modifica los datos del servicio veterinario"
                    : "Completa los datos del nuevo servicio veterinario"}
                </DialogDescription>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto px-1">
                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                  {error && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre del servicio *</Label>
                      <Input
                        id="nombre"
                        value={formData.nombre}
                        onChange={(e) =>
                          setFormData({ ...formData, nombre: e.target.value })
                        }
                        placeholder="Ej: Consulta General"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="precio">Precio (S/.) *</Label>
                      <Input
                        id="precio"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.precio || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            precio: Number(e.target.value) || 0,
                          })
                        }
                        placeholder="Ingrese el precio"
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="icono">Icono</Label>
                    <div className="space-y-3">
                      {/* Icono seleccionado actualmente */}
                      <div className="flex items-center space-x-3 p-3 border border-vet-gray-300 rounded-lg bg-vet-gray-50">
                        {(() => {
                          const selectedIcon = iconos.find(
                            (i) => i.id === formData.icono,
                          );
                          if (selectedIcon) {
                            const IconComponent = selectedIcon.component;
                            return (
                              <>
                                <div className="w-8 h-8 bg-vet-primary/10 rounded-lg flex items-center justify-center">
                                  <IconComponent className="w-5 h-5 text-vet-primary" />
                                </div>
                                <span className="font-medium text-vet-gray-900">
                                  {selectedIcon.nombre}
                                </span>
                              </>
                            );
                          }
                          return (
                            <span className="text-vet-gray-500">
                              Selecciona un icono
                            </span>
                          );
                        })()}
                      </div>

                      {/* Grid de iconos scrolleable mejorado para móvil */}
                      <div className="border border-vet-gray-300 rounded-lg p-4 bg-white">
                        <p className="text-sm text-vet-gray-600 mb-3">
                          Selecciona un icono:
                        </p>
                        <div className="max-h-52 overflow-y-auto overscroll-contain scrollbar-hide touch-pan-y">
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pr-2">
                            {iconos.map((icono) => {
                              const IconComponent = icono.component;
                              const isSelected = formData.icono === icono.id;
                              return (
                                <button
                                  key={icono.id}
                                  type="button"
                                  onClick={() =>
                                    setFormData({
                                      ...formData,
                                      icono: icono.id,
                                    })
                                  }
                                  className={`
                                  flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all hover:shadow-md touch-manipulation
                                  ${
                                    isSelected
                                      ? "border-vet-primary bg-vet-primary/10 text-vet-primary"
                                      : "border-vet-gray-200 hover:border-vet-primary/50 text-vet-gray-600 hover:text-vet-primary"
                                  }
                                `}
                                  title={icono.nombre}
                                >
                                  <IconComponent className="w-5 h-5 mb-1 flex-shrink-0" />
                                  <span className="text-xs text-center leading-tight line-clamp-2">
                                    {icono.nombre}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descripcion">Descripción *</Label>
                    <Textarea
                      id="descripcion"
                      value={formData.descripcion}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          descripcion: e.target.value,
                        })
                      }
                      placeholder="Describe el servicio veterinario..."
                      rows={4}
                      className="min-h-[100px] max-h-[150px] resize-none overflow-y-auto"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formData.activo}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, activo: checked })
                      }
                    />
                    <Label>Servicio activo</Label>
                  </div>
                </form>
              </div>

              <DialogFooter className="flex-shrink-0 border-t pt-4 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  onClick={handleSubmit}
                  className="bg-vet-primary hover:bg-vet-primary-dark"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      {editingService ? "Actualizar" : "Crear"}
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Modal */}
          <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmar eliminación</DialogTitle>
                <DialogDescription>
                  ¿Estás seguro que deseas eliminar el servicio "
                  {deletingService?.nombre}"? Esta acción no se puede deshacer.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancelar
                </Button>
                <Button variant="destructive" onClick={confirmDelete}>
                  Eliminar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
}
