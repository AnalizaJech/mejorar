import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import Layout from "@/components/Layout";
import DashboardVeterinario from "./DashboardVeterinario";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  PawPrint,
  Clock,
  FileText,
  Plus,
  CheckCircle,
  AlertCircle,
  Users,
  Stethoscope,
  TrendingUp,
  Heart,
  Shield,
  Award,
  CreditCard,
  Activity,
  Mail,
  User,
  Settings,
  DollarSign,
  Save,
  AlertTriangle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Dashboard() {
  const { user, getStats } = useAppContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // If user is a veterinarian, show their specific dashboard
  if (user?.rol === "veterinario") {
    return <DashboardVeterinario />;
  }

  const stats = getStats();

  return (
    <Layout>
      <div className="min-h-screen bg-vet-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-vet-gray-900">
                  {user?.rol === "admin" ? "Panel Administrativo" : "Dashboard"}
                </h1>
                <p className="text-sm sm:text-base text-vet-gray-600 mt-1">
                  {user?.rol === "admin"
                    ? `Bienvenido de vuelta, ${user.nombre}`
                    : `Gestiona el cuidado de tus mascotas, ${user?.nombre || "Usuario"}`}
                </p>
              </div>
              {user?.rol === "cliente" && (
                <Link to="/mascotas">
                  <Button className="w-full sm:w-auto bg-vet-primary hover:bg-vet-primary-dark">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Mascota
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Admin Dashboard */}
          {user?.rol === "admin" && <AdminDashboard />}

          {/* Client Dashboard */}
          {user?.rol === "cliente" && (
            <div className="space-y-8">
              <ClientDashboard stats={stats} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

function AdminDashboard() {
  const { usuarios, citas } = useAppContext();

  const adminStats = {
    totalUsuarios: usuarios.length,
    clientes: usuarios.filter((u) => u.rol === "cliente").length,
    veterinarios: usuarios.filter((u) => u.rol === "veterinario").length,
    totalCitas: citas.length,
    citasPendientes: citas.filter(
      (c) => c.estado === "pendiente_pago" || c.estado === "en_validacion",
    ).length,
    citasHoy: citas.filter((c) => {
      const today = new Date().toDateString();
      return new Date(c.fecha).toDateString() === today;
    }).length,
  };

  // Generate dynamic recent activity
  const getRecentActivity = () => {
    const activities = [];
    const now = new Date();

    // Recent clients (last 7 days)
    const recentClients = usuarios.filter((u) => {
      if (u.rol !== "cliente" || !u.fechaRegistro) return false;
      const daysSince =
        (now.getTime() - new Date(u.fechaRegistro).getTime()) /
        (1000 * 60 * 60 * 24);
      return daysSince <= 7;
    });

    // Recent appointments (last 7 days)
    const recentAppointments = citas.filter((c) => {
      const daysSince =
        (now.getTime() - new Date(c.fecha).getTime()) / (1000 * 60 * 60 * 24);
      return (
        daysSince <= 7 && (c.estado === "aceptada" || c.estado === "atendida")
      );
    });

    // Add client activities
    recentClients.forEach((client) => {
      const timestamp = new Date(client.fechaRegistro).getTime();
      const hoursAgo = Math.max(
        1,
        Math.floor((now.getTime() - timestamp) / (1000 * 60 * 60)),
      );
      activities.push({
        type: "client",
        message: `Nuevo cliente registrado: ${client.nombre}${client.apellidos ? ` ${client.apellidos}` : ''}`,
        time:
          hoursAgo < 24
            ? `Hace ${hoursAgo} horas`
            : `Hace ${Math.floor(hoursAgo / 24)} días`,
        icon: "CheckCircle",
        color: "green",
        timestamp: timestamp,
      });
    });

    // Add appointment activities
    recentAppointments.forEach((appointment) => {
      const timestamp = new Date(appointment.fecha).getTime();
      const hoursAgo = Math.max(
        1,
        Math.floor((now.getTime() - timestamp) / (1000 * 60 * 60)),
      );
      activities.push({
        type: "appointment",
        message: `Cita programada para ${appointment.mascota}`,
        time:
          hoursAgo < 24
            ? `Hace ${hoursAgo} horas`
            : `Hace ${Math.floor(hoursAgo / 24)} días`,
        icon: "Calendar",
        color: "blue",
        timestamp: timestamp,
      });
    });

    // Sort by timestamp (most recent first) and limit to 3
    return activities.sort((a, b) => b.timestamp - a.timestamp).slice(0, 3);
  };

  const recentActivities = getRecentActivity();

  return (
    <div className="space-y-8">
      {/* Admin Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="border-l-4 border-l-vet-primary">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-vet-primary/10 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-vet-primary" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-vet-gray-600">
                  Total Usuarios
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-vet-gray-900">
                  {adminStats.totalUsuarios}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-vet-secondary">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-vet-secondary/10 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-vet-secondary" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-vet-gray-600">Clientes</p>
                <p className="text-2xl sm:text-3xl font-bold text-vet-secondary">
                  {adminStats.clientes}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-vet-gray-600">
                  Veterinarios
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {adminStats.veterinarios}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-vet-primary">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-vet-primary/10 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-vet-primary" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-vet-gray-600">
                  Citas Totales
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-vet-primary">
                  {adminStats.totalCitas}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions for Admin */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-vet-primary" />
              <span>Gestión del Sistema</span>
            </CardTitle>
            <CardDescription>
              Accesos rápidos a las funciones administrativas
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/gestion-citas">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col items-center justify-center space-y-2"
              >
                <Calendar className="w-6 h-6 text-vet-primary" />
                <span className="text-sm">Gestión Citas</span>
              </Button>
            </Link>

            <Link to="/usuarios">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col items-center justify-center space-y-2"
              >
                <Users className="w-6 h-6 text-vet-primary" />
                <span className="text-sm">Usuarios</span>
              </Button>
            </Link>

            <Link to="/veterinarios">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col items-center justify-center space-y-2"
              >
                <User className="w-6 h-6 text-vet-primary" />
                <span className="text-sm">Veterinarios</span>
              </Button>
            </Link>

            <Link to="/servicios">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col items-center justify-center space-y-2"
              >
                <Stethoscope className="w-6 h-6 text-vet-primary" />
                <span className="text-sm">Servicios</span>
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-vet-primary" />
              <span>Actividad Reciente</span>
            </CardTitle>
            <CardDescription>
              Resumen de la actividad del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-64 overflow-y-auto scrollbar-hide">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-vet-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.color === "green"
                            ? "bg-green-100"
                            : activity.color === "blue"
                              ? "bg-blue-100"
                              : activity.color === "yellow"
                                ? "bg-yellow-100"
                                : activity.color === "purple"
                                  ? "bg-purple-100"
                                  : "bg-blue-100"
                        }`}
                      >
                        {activity.icon === "CheckCircle" && (
                          <CheckCircle
                            className={`w-4 h-4 ${
                              activity.color === "green"
                                ? "text-green-600"
                                : "text-vet-primary"
                            }`}
                          />
                        )}
                        {activity.icon === "Calendar" && (
                          <Calendar
                            className={`w-4 h-4 ${
                              activity.color === "blue"
                                ? "text-blue-600"
                                : "text-vet-primary"
                            }`}
                          />
                        )}
                        {activity.icon === "AlertCircle" && (
                          <AlertCircle
                            className={`w-4 h-4 ${
                              activity.color === "yellow"
                                ? "text-yellow-600"
                                : "text-blue-600"
                            }`}
                          />
                        )}
                        {activity.icon === "Mail" && (
                          <Mail
                            className={`w-4 h-4 ${
                              activity.color === "purple"
                                ? "text-purple-600"
                                : "text-vet-primary"
                            }`}
                          />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {activity.message}
                        </p>
                        <p className="text-xs text-vet-gray-600">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-vet-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Activity className="w-6 h-6 text-vet-gray-400" />
                  </div>
                  <p className="text-sm text-vet-gray-500">
                    No hay actividad reciente
                  </p>
                  <p className="text-xs text-vet-gray-400">
                    La actividad aparecerá cuando haya nuevos eventos
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ClientDashboard({ stats }: { stats: any }) {
  const { user, mascotas, citas } = useAppContext();

  // Calcular estadísticas reales de salud
  const calculateHealthStats = () => {
    const userMascotas = mascotas.filter((m) => m.clienteId === user?.id);
    const userCitas = citas.filter((c) =>
      userMascotas.some((m) => m.nombre === c.mascota),
    );

    if (userMascotas.length === 0) {
      return {
        vacunacionPorcentaje: 0,
        revisionesPendientes: 0,
        proximaCita: null,
        estadoGeneral: "Sin datos",
      };
    }

    // Calcular porcentaje de vacunación (mascotas con citas de vacunación recientes)
    const mascotasConVacunas = userMascotas.filter((mascota) => {
      const citasVacunacion = userCitas.filter(
        (c) =>
          c.mascota === mascota.nombre &&
          c.tipoConsulta === "vacunacion" &&
          c.estado === "Completada",
      );

      if (citasVacunacion.length === 0) return false;

      // Considerar vacunación al día si la última fue hace menos de 1 año
      const ultimaVacunacion = citasVacunacion.sort(
        (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime(),
      )[0];
      const mesesDesdeUltimaVacuna =
        (new Date().getTime() - new Date(ultimaVacunacion.fecha).getTime()) /
        (1000 * 60 * 60 * 24 * 30);

      return mesesDesdeUltimaVacuna < 12;
    });

    const vacunacionPorcentaje =
      userMascotas.length > 0
        ? Math.round((mascotasConVacunas.length / userMascotas.length) * 100)
        : 0;

    // Calcular revisiones pendientes
    const revisionesPendientes = userCitas.filter(
      (c) =>
        c.estado === "pendiente_pago" ||
        c.estado === "en_validacion" ||
        c.estado === "aceptada",
    ).length;

    // Encontrar próxima cita
    const citasFuturas = userCitas
      .filter((c) => new Date(c.fecha) > new Date() && c.estado === "aceptada")
      .sort(
        (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime(),
      );

    const proximaCita = citasFuturas.length > 0 ? citasFuturas[0] : null;

    return {
      vacunacionPorcentaje,
      revisionesPendientes,
      proximaCita,
      estadoGeneral:
        vacunacionPorcentaje >= 80
          ? "Excelente"
          : vacunacionPorcentaje >= 60
            ? "Bueno"
            : "Regular",
    };
  };

  const healthStats = calculateHealthStats();
  return (
    <div className="space-y-8">
      {/* Client Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-vet-primary">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-vet-primary/10 rounded-xl flex items-center justify-center">
                <PawPrint className="w-6 h-6 text-vet-primary" />
              </div>
              <div>
                <p className="text-sm text-vet-gray-600">Mis Mascotas</p>
                <p className="text-3xl font-bold text-vet-gray-900">
                  {stats.totalMascotas}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-vet-gray-600">Citas Pendientes</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {stats.citasPendientes}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-vet-gray-600">Última Visita</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.ultimaVisita}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-vet-gray-600">Estado General</p>
                <p className="text-xl font-bold text-blue-600">
                  {stats.estadoGeneral}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions for Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PawPrint className="w-5 h-5 text-vet-primary" />
              <span>Gestión de Mascotas</span>
            </CardTitle>
            <CardDescription>
              Administra la información de tus compañeros peludos
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Link to="/mascotas">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col items-center justify-center space-y-2"
              >
                <PawPrint className="w-6 h-6 text-vet-primary" />
                <span className="text-sm">Mis Mascotas</span>
              </Button>
            </Link>

            <Link to="/mis-citas">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col items-center justify-center space-y-2"
              >
                <Calendar className="w-6 h-6 text-vet-primary" />
                <span className="text-sm">Mis Citas</span>
              </Button>
            </Link>

            <Link to="/historial">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col items-center justify-center space-y-2"
              >
                <FileText className="w-6 h-6 text-vet-primary" />
                <span className="text-sm">Historial</span>
              </Button>
            </Link>

            <Link to="/nueva-cita">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col items-center justify-center space-y-2"
              >
                <Plus className="w-6 h-6 text-vet-primary" />
                <span className="text-sm">Nueva Cita</span>
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-vet-primary" />
              <span>Estado de Salud</span>
            </CardTitle>
            <CardDescription>
              Resumen del bienestar de tus mascotas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-vet-gray-900">
                    Vacunación al día
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      healthStats.vacunacionPorcentaje >= 80
                        ? "text-green-600"
                        : healthStats.vacunacionPorcentaje >= 60
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {healthStats.vacunacionPorcentaje}%
                  </span>
                </div>
                <Progress
                  value={healthStats.vacunacionPorcentaje}
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-vet-gray-900">
                    Revisiones pendientes
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      healthStats.revisionesPendientes === 0
                        ? "text-green-600"
                        : healthStats.revisionesPendientes <= 2
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {healthStats.revisionesPendientes}
                  </span>
                </div>
                <Progress
                  value={
                    healthStats.revisionesPendientes === 0
                      ? 100
                      : healthStats.revisionesPendientes <= 2
                        ? 60
                        : 30
                  }
                  className="h-2"
                />
              </div>

              {/* Sección de próxima cita */}
              {healthStats.proximaCita ? (
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-800">
                      Próxima cita programada
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      <span className="font-medium">
                        {healthStats.proximaCita.mascota}
                      </span>{" "}
                      -{" "}
                      {new Date(
                        healthStats.proximaCita.fecha,
                      ).toLocaleDateString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      a las {healthStats.proximaCita.hora}
                    </p>
                    <p className="text-xs text-blue-500 mt-1">
                      {healthStats.proximaCita.tipoConsulta
                        .replace("_", " ")
                        .toUpperCase()}{" "}
                      - {healthStats.proximaCita.veterinario}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      Sin citas programadas
                    </p>
                    <p className="text-xs text-yellow-600">
                      Considera agendar una revisión preventiva
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
