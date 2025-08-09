import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  PawPrint,
  Calendar,
  Syringe,
  Pill,
  Stethoscope,
  Download,
  Eye,
  Activity,
  ChevronDown,
  CheckCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

// Get user data from localStorage
const getUserFromStorage = () => {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr);
    }
  } catch (error) {
    console.error("Error reading user from localStorage:", error);
  }
  return null;
};

// Mock data for historial clínico
const mockHistorial = {
  Max: {
    consultas: [
      {
        id: "1",
        fecha: new Date("2024-01-10"),
        veterinario: "Dr. Carlos Ruiz",
        motivo: "Revisión dental",
        diagnostico: "Placa dental moderada",
        tratamiento: "Limpieza dental profesional",
        medicamentos: [
          { nombre: "Antibiótico", dosis: "250mg", duracion: "7 días" },
        ],
        proxima_cita: new Date("2024-07-10"),
        notas: "Evolución favorable. Control en 6 meses.",
      },
      {
        id: "2",
        fecha: new Date("2023-11-15"),
        veterinario: "Dr. Carlos Ruiz",
        motivo: "Consulta general",
        diagnostico: "Estado de salud óptimo",
        tratamiento: "Vacunación de rutina",
        medicamentos: [],
        proxima_cita: new Date("2024-11-15"),
        notas: "Peso ideal. Continuar con dieta actual.",
      },
    ],
    vacunas: [
      {
        id: "1",
        nombre: "Antirrábica",
        fecha: new Date("2023-11-15"),
        lote: "RAB-2023-456",
        veterinario: "Dr. Carlos Ruiz",
        proxima: new Date("2024-11-15"),
      },
      {
        id: "2",
        nombre: "Parvovirus",
        fecha: new Date("2023-11-15"),
        lote: "PAR-2023-789",
        veterinario: "Dr. Carlos Ruiz",
        proxima: new Date("2024-11-15"),
      },
    ],
    examenes: [
      {
        id: "1",
        tipo: "Análisis de sangre",
        fecha: new Date("2023-11-15"),
        resultados: "Normales",
        archivo: "analisis_sangre_max_nov2023.pdf",
      },
      {
        id: "2",
        tipo: "Radiografía dental",
        fecha: new Date("2024-01-10"),
        resultados: "Placa dental visible",
        archivo: "radiografia_dental_max_ene2024.pdf",
      },
    ],
  },
  Luna: {
    consultas: [
      {
        id: "3",
        fecha: new Date("2023-12-15"),
        veterinario: "Dra. Ana López",
        motivo: "Desparasitación",
        diagnostico: "Presencia de parásitos intestinales leves",
        tratamiento: "Desparasitación interna y externa",
        medicamentos: [
          {
            nombre: "Desparasitante",
            dosis: "1 comprimido",
            duracion: "Dosis única",
          },
        ],
        proxima_cita: new Date("2024-06-15"),
        notas: "Repetir tratamiento en 6 meses como prevención.",
      },
      {
        id: "4",
        fecha: new Date("2023-09-10"),
        veterinario: "Dra. Ana López",
        motivo: "Vacunación",
        diagnostico: "Salud excelente",
        tratamiento: "Vacuna antirrábica",
        medicamentos: [],
        proxima_cita: new Date("2024-09-10"),
        notas: "Gata muy cooperativa. Sin reacciones adversas.",
      },
    ],
    vacunas: [
      {
        id: "3",
        nombre: "Antirrábica",
        fecha: new Date("2023-09-10"),
        lote: "RAB-2023-123",
        veterinario: "Dra. Ana López",
        proxima: new Date("2024-09-10"),
      },
      {
        id: "4",
        nombre: "Triple Felina",
        fecha: new Date("2023-09-10"),
        lote: "TRI-2023-456",
        veterinario: "Dra. Ana López",
        proxima: new Date("2024-09-10"),
      },
    ],
    examenes: [
      {
        id: "3",
        tipo: "Examen coprológico",
        fecha: new Date("2023-12-15"),
        resultados: "Parásitos presentes",
        archivo: "coprologico_luna_dic2023.pdf",
      },
    ],
  },
};

// Use dynamic mascotas from context
const getMascotasNames = (mascotasList) => mascotasList.map((m) => m.nombre);

// Helper function for UTF-8 safe date formatting
const formatDateSafe = (date, options = {}) => {
  try {
    const defaultOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: options.weekday || undefined,
      ...options,
    };

    return new Intl.DateTimeFormat("es-ES", defaultOptions).format(
      new Date(date),
    );
  } catch (error) {
    console.error("Error formatting date:", error);
    return new Date(date).toLocaleDateString("es-ES");
  }
};

export default function HistorialClinico() {
  const { user, mascotas, usuarios, citas, historialClinico } = useAppContext();
  const [selectedMascota, setSelectedMascota] = useState("");
  const [selectedTab, setSelectedTab] = useState("consulta_general");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filtrar mascotas según el rol
  const availableMascotas =
    user?.rol === "veterinario"
      ? mascotas.filter((mascota) => {
          // Para veterinarios: mostrar mascotas que tienen citas con este veterinario
          return citas.some(
            (cita) =>
              cita.mascota === mascota.nombre &&
              cita.veterinario === user.nombre,
          );
        })
      : mascotas.filter((mascota) => mascota.clienteId === user?.id);

  // Manejar parámetros URL cuando cambien las mascotas disponibles
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const mascotaParam = urlParams.get("mascota");

    if (availableMascotas.length > 0) {
      if (mascotaParam) {
        const mascotaName = decodeURIComponent(mascotaParam);
        // Verificar que la mascota existe en las mascotas disponibles
        const mascotaExists = availableMascotas.some(
          (m) => m.nombre === mascotaName,
        );
        if (mascotaExists) {
          setSelectedMascota(mascotaName);
        } else {
          // Si la mascota del URL no existe, seleccionar la primera disponible
          setSelectedMascota(availableMascotas[0].nombre);
        }
      } else if (!selectedMascota) {
        // Si no hay parámetro URL y no hay mascota seleccionada, seleccionar la primera
        setSelectedMascota(availableMascotas[0].nombre);
      }
    }
  }, [availableMascotas]);

  // Obtener historial real basado en registros médicos del historialClinico
  const getHistorialReal = (nombreMascota) => {
    // Buscar mascota para obtener su ID
    const mascota = mascotas.find((m) => m.nombre === nombreMascota);

    // Filtrar registros médicos para esta mascota
    const registrosMedicos = historialClinico.filter((record) => {
      // Match by pet ID or name
      const matchesPet =
        (mascota && record.mascotaId === mascota.id) ||
        (record.mascotaNombre &&
          record.mascotaNombre.toLowerCase() === nombreMascota.toLowerCase());

      return matchesPet;
    });

    // Agrupar por los 6 servicios específicos de la veterinaria
    const servicios = {
      consulta_general: [],
      vacunacion: [],
      emergencia: [],
      grooming: [],
      cirugia: [],
      diagnostico: [],
    };

    registrosMedicos.forEach((record) => {
      const tipoConsulta = record.tipoConsulta || record.tipo || "Consulta";

      const baseRecord = {
        id: record.id || `${record.mascotaId}-${record.fecha}`,
        fecha: new Date(record.fecha),
        veterinario: record.veterinario,
        motivo: record.motivo || "Sin motivo especificado",
        tipoConsulta: tipoConsulta,
        estado: record.estado || "completada",
        diagnostico: record.diagnostico,
        tratamiento: record.tratamiento,
        medicamentos: record.medicamentos || [],
        proxima_cita: record.proximaVisita
          ? new Date(record.proximaVisita)
          : null,
        notas: record.observaciones,
        precio: 0, // No available in medical records
        // Campos adicionales del historial médico
        peso: record.peso,
        temperatura: record.temperatura,
        presionArterial: record.presionArterial,
        frecuenciaCardiaca: record.frecuenciaCardiaca,
        examenes: record.examenes || [],
        servicios: record.servicios || [],
      };

      // Normalizar texto para búsqueda (manejo de UTF-8 y caracteres especiales)
      const normalizeText = (text) => {
        return text
          .toLowerCase()
          .normalize("NFD") // Descomponer caracteres UTF-8
          .replace(/[\u0300-\u036f]/g, "") // Remover acentos
          .replace(/[ñÑ]/g, "n") // Normalizar ñ
          .replace(/\s+/g, "_") // Espacios a guiones
          .trim();
      };

      const tipoNormalizado = normalizeText(tipoConsulta);
      const motivoNormalizado = normalizeText(record.motivo || "");

      // 1. VACUNACIÓN
      if (
        tipoNormalizado.includes("vacunacion") ||
        tipoNormalizado.includes("vacuna") ||
        motivoNormalizado.includes("vacuna") ||
        motivoNormalizado.includes("inmuniz")
      ) {
        servicios.vacunacion.push(baseRecord);
      }
      // 2. EMERGENCIA
      else if (
        tipoNormalizado.includes("emergencia") ||
        motivoNormalizado.includes("emergencia") ||
        motivoNormalizado.includes("urgente") ||
        motivoNormalizado.includes("accidente")
      ) {
        servicios.emergencia.push(baseRecord);
      }
      // 3. GROOMING
      else if (
        tipoNormalizado.includes("grooming") ||
        motivoNormalizado.includes("grooming") ||
        motivoNormalizado.includes("bano") ||
        motivoNormalizado.includes("baño") ||
        motivoNormalizado.includes("corte") ||
        motivoNormalizado.includes("aseo") ||
        motivoNormalizado.includes("limpieza") ||
        motivoNormalizado.includes("estetica")
      ) {
        servicios.grooming.push(baseRecord);
      }
      // 4. CIRUGÍA
      else if (
        tipoNormalizado.includes("cirugia") ||
        tipoNormalizado.includes("cirugia") ||
        motivoNormalizado.includes("cirugia") ||
        motivoNormalizado.includes("operacion") ||
        motivoNormalizado.includes("quirurgico")
      ) {
        servicios.cirugia.push(baseRecord);
      }
      // 5. DIAGNÓSTICO
      else if (
        tipoNormalizado.includes("diagnostico") ||
        tipoNormalizado.includes("diagnostico") ||
        motivoNormalizado.includes("diagnostico") ||
        motivoNormalizado.includes("examen") ||
        motivoNormalizado.includes("analisis") ||
        motivoNormalizado.includes("laboratorio") ||
        motivoNormalizado.includes("radiografia") ||
        motivoNormalizado.includes("ecografia")
      ) {
        servicios.diagnostico.push(baseRecord);
      }
      // 6. CONSULTA GENERAL (por defecto y específicos)
      else {
        servicios.consulta_general.push(baseRecord);
      }
    });

    // Ordenar cada servicio por fecha (más reciente primero)
    Object.keys(servicios).forEach((key) => {
      servicios[key] = servicios[key].sort((a, b) => b.fecha - a.fecha);
    });

    return servicios;
  };

  // Funciones auxiliares eliminadas - solo mostrar datos reales del veterinario

  // Funciones auxiliares eliminadas - solo mostrar datos reales del veterinario

  const historialMascota = selectedMascota
    ? getHistorialReal(selectedMascota)
    : {
        consulta_general: [],
        vacunacion: [],
        emergencia: [],
        grooming: [],
        cirugia: [],
        diagnostico: [],
      };

  // Función para descargar el historial clínico en formato texto
  const descargarHistorial = () => {
    if (!selectedMascota) return;

    const mascotaInfo = availableMascotas.find(
      (m) => m.nombre === selectedMascota,
    );
    if (!mascotaInfo) return;

    // Crear contenido en formato texto legible
    let contenido = `HISTORIAL CLÍNICO VETERINARIO\n`;
    contenido += `${"=".repeat(50)}\n\n`;

    contenido += `INFORMACIÓN DE LA MASCOTA\n`;
    contenido += `-`.repeat(30) + `\n`;
    contenido += `Nombre: ${mascotaInfo.nombre}\n`;
    contenido += `Especie: ${mascotaInfo.especie}\n`;
    contenido += `Raza: ${mascotaInfo.raza}\n`;
    contenido += `Fecha de Nacimiento: ${mascotaInfo.fechaNacimiento.toLocaleDateString("es-ES")}\n`;
    contenido += `Peso: ${mascotaInfo.peso ? `${mascotaInfo.peso} kg` : "No registrado"}\n`;
    contenido += `Sexo: ${mascotaInfo.sexo || "No registrado"}\n`;
    if (mascotaInfo.microchip) {
      contenido += `Microchip: ${mascotaInfo.microchip}\n`;
    }
    contenido += `\n`;

    // Obtener todas las consultas de todos los tipos
    const todasLasConsultas = [
      ...historialMascota.consulta_general,
      ...historialMascota.vacunacion,
      ...historialMascota.emergencia,
      ...historialMascota.grooming,
      ...historialMascota.cirugia,
      ...historialMascota.diagnostico,
    ];

    if (todasLasConsultas.length > 0) {
      contenido += `CONSULTAS MÉDICAS\n`;
      contenido += `-`.repeat(30) + `\n`;
      todasLasConsultas.forEach((consulta, index) => {
        contenido += `\nConsulta #${index + 1}\n`;
        contenido += `Fecha: ${consulta.fecha.toLocaleDateString("es-ES")}\n`;
        contenido += `Veterinario: ${consulta.veterinario}\n`;
        if (consulta.motivo) contenido += `Motivo: ${consulta.motivo}\n`;
        if (consulta.diagnostico)
          contenido += `Diagnóstico: ${consulta.diagnostico}\n`;
        if (consulta.tratamiento)
          contenido += `Tratamiento: ${consulta.tratamiento}\n`;

        // Signos vitales
        if (
          consulta.peso ||
          consulta.temperatura ||
          consulta.presionArterial ||
          consulta.frecuenciaCardiaca
        ) {
          contenido += `Signos Vitales:\n`;
          if (consulta.peso) contenido += `  - Peso: ${consulta.peso} kg\n`;
          if (consulta.temperatura)
            contenido += `  - Temperatura: ${consulta.temperatura}°C\n`;
          if (consulta.presionArterial)
            contenido += `  - Presión Arterial: ${consulta.presionArterial}\n`;
          if (consulta.frecuenciaCardiaca)
            contenido += `  - Frecuencia Cardíaca: ${consulta.frecuenciaCardiaca} bpm\n`;
        }

        // Medicamentos detallados
        if (consulta.medicamentos && consulta.medicamentos.length > 0) {
          contenido += `Medicamentos Recetados:\n`;
          consulta.medicamentos.forEach((med, medIndex) => {
            contenido += `  ${medIndex + 1}. ${med.nombre}\n`;
            contenido += `     Dosis: ${med.dosis}\n`;
            if (med.frecuencia)
              contenido += `     Frecuencia: ${med.frecuencia}\n`;
            if (med.duracion) contenido += `     Duración: ${med.duracion}\n`;
            if (med.indicaciones)
              contenido += `     Indicaciones: ${med.indicaciones}\n`;
          });
        }

        // Vacunas aplicadas
        if (consulta.vacunas && consulta.vacunas.length > 0) {
          contenido += `Vacunas Aplicadas:\n`;
          consulta.vacunas.forEach((vacuna, vacIndex) => {
            contenido += `  ${vacIndex + 1}. ${vacuna.nombre}\n`;
            contenido += `     Lote: ${vacuna.lote}\n`;
            contenido += `     Próxima Dosis: ${new Date(vacuna.proximaFecha).toLocaleDateString("es-ES")}\n`;
          });
        }

        // Exámenes realizados
        if (consulta.examenes && consulta.examenes.length > 0) {
          contenido += `Exámenes Realizados:\n`;
          consulta.examenes.forEach((examen, exIndex) => {
            contenido += `  ${exIndex + 1}. ${examen.tipo}\n`;
            contenido += `     Resultado: ${examen.resultado}\n`;
            if (examen.archivo)
              contenido += `     Archivo: ${examen.archivo}\n`;
          });
        }

        // Servicios adicionales
        if (consulta.servicios && consulta.servicios.length > 0) {
          contenido += `Servicios Realizados:\n`;
          consulta.servicios.forEach((servicio, servIndex) => {
            contenido += `  ${servIndex + 1}. ${servicio.nombre}\n`;
            if (servicio.descripcion)
              contenido += `     Descripción: ${servicio.descripcion}\n`;
            if (servicio.precio)
              contenido += `     Precio: S/${servicio.precio}\n`;
            if (servicio.duracion)
              contenido += `     Duración: ${servicio.duracion}\n`;
            if (servicio.notas) contenido += `     Notas: ${servicio.notas}\n`;
          });
        }

        // Archivos adjuntos
        if (consulta.archivosAdjuntos && consulta.archivosAdjuntos.length > 0) {
          contenido += `Archivos Adjuntos:\n`;
          consulta.archivosAdjuntos.forEach((archivo, archIndex) => {
            contenido += `  ${archIndex + 1}. ${archivo.nombre} (${archivo.tipo})\n`;
            if (archivo.url) contenido += `     URL: ${archivo.url}\n`;
          });
        }

        if (consulta.proxima_cita) {
          contenido += `Próxima cita: ${consulta.proxima_cita.toLocaleDateString("es-ES")}\n`;
        }

        if (consulta.notas) {
          contenido += `Observaciones del Veterinario: ${consulta.notas}\n`;
        }
        contenido += `\n${"·".repeat(40)}\n`;
      });
    } else {
      contenido += `CONSULTAS MÉDICAS\n`;
      contenido += `-`.repeat(30) + `\n`;
      contenido += `No hay consultas registradas.\n\n`;
    }

    // VACUNAS (incluidas en las consultas médicas)
    if (historialMascota.vacunacion.length > 0) {
      contenido += `VACUNAS\n`;
      contenido += `-`.repeat(30) + `\n`;
      historialMascota.vacunacion.forEach((vacuna, index) => {
        contenido += `\nVacuna #${index + 1}\n`;
        contenido += `Fecha: ${vacuna.fecha.toLocaleDateString("es-ES")}\n`;
        contenido += `Veterinario: ${vacuna.veterinario}\n`;
        contenido += `Tipo: ${vacuna.nombre}\n`;
        contenido += `Lote: ${vacuna.lote}\n`;
        if (vacuna.proxima) {
          contenido += `Próxima dosis: ${vacuna.proxima.toLocaleDateString("es-ES")}\n`;
        }
        contenido += `\n${"·".repeat(40)}\n`;
      });
    } else {
      contenido += `VACUNAS\n`;
      contenido += `-`.repeat(30) + `\n`;
      contenido += `No hay vacunas registradas.\n\n`;
    }

    // Nota: Los exámenes están incluidos en las consultas médicas

    contenido += `\nDOCUMENTO GENERADO\n`;
    contenido += `-`.repeat(30) + `\n`;
    contenido += `Fecha: ${new Date().toLocaleDateString("es-ES")} ${new Date().toLocaleTimeString("es-ES")}\n`;
    contenido += `Generado por: ${user?.nombre || "Usuario"}\n`;
    contenido += `Sistema: Clínica Veterinaria Digital\n`;

    const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `historial_clinico_${selectedMascota.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Función para descargar el historial clínico en formato PDF
  const descargarHistorialPDF = () => {
    if (!selectedMascota) return;

    const mascotaInfo = availableMascotas.find(
      (m) => m.nombre === selectedMascota,
    );
    if (!mascotaInfo) return;

    const pdf = new jsPDF();
    const margin = 20;
    let yPosition = margin;
    const lineHeight = 6;
    const pageHeight = pdf.internal.pageSize.height;

    // Función para agregar nueva página si es necesario
    const checkNewPage = (requiredSpace = 20) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }
    };

    // Función para agregar texto con salto de línea automático
    const addText = (text: string, fontSize = 11, style = "normal") => {
      pdf.setFontSize(fontSize);
      if (style === "bold") pdf.setFont("helvetica", "bold");
      else pdf.setFont("helvetica", "normal");

      const lines = pdf.splitTextToSize(text, 170);
      checkNewPage(lines.length * lineHeight);

      lines.forEach((line: string) => {
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
    };

    // Título principal
    addText("HISTORIAL CLÍNICO VETERINARIO", 16, "bold");
    yPosition += 5;

    // Información de la mascota
    addText("INFORMACIÓN DE LA MASCOTA", 14, "bold");
    yPosition += 2;
    addText(`Nombre: ${mascotaInfo.nombre}`);
    addText(`Especie: ${mascotaInfo.especie}`);
    addText(`Raza: ${mascotaInfo.raza}`);
    addText(
      `Fecha de Nacimiento: ${mascotaInfo.fechaNacimiento.toLocaleDateString("es-ES")}`,
    );
    addText(
      `Peso: ${mascotaInfo.peso ? `${mascotaInfo.peso} kg` : "No registrado"}`,
    );
    addText(`Sexo: ${mascotaInfo.sexo || "No registrado"}`);
    if (mascotaInfo.microchip) {
      addText(`Microchip: ${mascotaInfo.microchip}`);
    }
    yPosition += 5;

    // Consultas médicas
    addText("CONSULTAS MÉDICAS", 14, "bold");
    yPosition += 2;

    // Obtener todas las consultas de todos los tipos
    const todasLasConsultas = [
      ...historialMascota.consulta_general,
      ...historialMascota.vacunacion,
      ...historialMascota.emergencia,
      ...historialMascota.grooming,
      ...historialMascota.cirugia,
      ...historialMascota.diagnostico,
    ];

    if (todasLasConsultas.length > 0) {
      todasLasConsultas.forEach((consulta, index) => {
        checkNewPage(40);
        addText(`Consulta #${index + 1}`, 12, "bold");
        addText(`Fecha: ${consulta.fecha.toLocaleDateString("es-ES")}`);
        addText(`Veterinario: ${consulta.veterinario}`);
        if (consulta.motivo) addText(`Motivo: ${consulta.motivo}`);
        if (consulta.diagnostico)
          addText(`Diagnóstico: ${consulta.diagnostico}`);
        if (consulta.tratamiento)
          addText(`Tratamiento: ${consulta.tratamiento}`);

        // Signos vitales
        if (
          consulta.peso ||
          consulta.temperatura ||
          consulta.presionArterial ||
          consulta.frecuenciaCardiaca
        ) {
          addText("Signos Vitales:", 11, "bold");
          if (consulta.peso) addText(`  • Peso: ${consulta.peso} kg`);
          if (consulta.temperatura)
            addText(`  • Temperatura: ${consulta.temperatura}°C`);
          if (consulta.presionArterial)
            addText(`  ��� Presión Arterial: ${consulta.presionArterial}`);
          if (consulta.frecuenciaCardiaca)
            addText(
              `  • Frecuencia Card��aca: ${consulta.frecuenciaCardiaca} bpm`,
            );
        }

        // Medicamentos detallados
        if (consulta.medicamentos && consulta.medicamentos.length > 0) {
          addText("Medicamentos Recetados:", 11, "bold");
          consulta.medicamentos.forEach((med, medIndex) => {
            addText(`  ${medIndex + 1}. ${med.nombre}`);
            addText(`     Dosis: ${med.dosis}`);
            if (med.frecuencia) addText(`     Frecuencia: ${med.frecuencia}`);
            if (med.duracion) addText(`     Duración: ${med.duracion}`);
            if (med.indicaciones)
              addText(`     Indicaciones: ${med.indicaciones}`);
          });
        }

        // Vacunas aplicadas
        if (consulta.vacunas && consulta.vacunas.length > 0) {
          addText("Vacunas Aplicadas:", 11, "bold");
          consulta.vacunas.forEach((vacuna, vacIndex) => {
            addText(`  ${vacIndex + 1}. ${vacuna.nombre}`);
            addText(`     Lote: ${vacuna.lote}`);
            addText(
              `     Próxima Dosis: ${new Date(vacuna.proximaFecha).toLocaleDateString("es-ES")}`,
            );
          });
        }

        // Exámenes realizados
        if (consulta.examenes && consulta.examenes.length > 0) {
          addText("Exámenes Realizados:", 11, "bold");
          consulta.examenes.forEach((examen, exIndex) => {
            addText(`  ${exIndex + 1}. ${examen.tipo}`);
            addText(`     Resultado: ${examen.resultado}`);
            if (examen.archivo) addText(`     Archivo: ${examen.archivo}`);
          });
        }

        // Servicios adicionales
        if (consulta.servicios && consulta.servicios.length > 0) {
          addText("Servicios Realizados:", 11, "bold");
          consulta.servicios.forEach((servicio, servIndex) => {
            addText(`  ${servIndex + 1}. ${servicio.nombre}`);
            if (servicio.descripcion)
              addText(`     Descripción: ${servicio.descripcion}`);
            if (servicio.precio) addText(`     Precio: S/${servicio.precio}`);
            if (servicio.duracion)
              addText(`     Duración: ${servicio.duracion}`);
            if (servicio.notas) addText(`     Notas: ${servicio.notas}`);
          });
        }

        // Archivos adjuntos
        if (consulta.archivosAdjuntos && consulta.archivosAdjuntos.length > 0) {
          addText("Archivos Adjuntos:", 11, "bold");
          consulta.archivosAdjuntos.forEach((archivo, archIndex) => {
            addText(`  ${archIndex + 1}. ${archivo.nombre} (${archivo.tipo})`);
            if (archivo.url) addText(`     URL: ${archivo.url}`);
          });
        }

        if (consulta.proxima_cita) {
          addText(
            `Próxima cita: ${consulta.proxima_cita.toLocaleDateString("es-ES")}`,
          );
        }

        if (consulta.notas) {
          addText(
            `Observaciones del Veterinario: ${consulta.notas}`,
            11,
            "bold",
          );
        }
        yPosition += 8;
      });
    } else {
      addText("No hay consultas registradas.");
    }

    // Información del documento
    checkNewPage(20);
    yPosition += 10;
    addText("DOCUMENTO GENERADO", 12, "bold");
    addText(
      `Fecha: ${new Date().toLocaleDateString("es-ES")} ${new Date().toLocaleTimeString("es-ES")}`,
    );
    addText(`Generado por: ${user?.nombre || "Usuario"}`);
    addText("Sistema: Clínica Veterinaria Digital");

    // Descargar PDF
    pdf.save(
      `historial_clinico_${selectedMascota.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`,
    );
  };

  // Función para descargar el historial clínico en formato Excel
  const descargarHistorialExcel = () => {
    if (!selectedMascota) return;

    const mascotaInfo = availableMascotas.find(
      (m) => m.nombre === selectedMascota,
    );
    if (!mascotaInfo) return;

    // Crear workbook
    const wb = XLSX.utils.book_new();

    // Hoja 1: Información de la mascota
    const mascotaData = [
      ["INFORMACIÓN DE LA MASCOTA"],
      [""],
      ["Nombre", mascotaInfo.nombre],
      ["Especie", mascotaInfo.especie],
      ["Raza", mascotaInfo.raza],
      [
        "Fecha de Nacimiento",
        mascotaInfo.fechaNacimiento.toLocaleDateString("es-ES"),
      ],
      ["Peso", mascotaInfo.peso ? `${mascotaInfo.peso} kg` : "No registrado"],
      ["Sexo", mascotaInfo.sexo || "No registrado"],
      ...(mascotaInfo.microchip ? [["Microchip", mascotaInfo.microchip]] : []),
    ];

    const wsMascota = XLSX.utils.aoa_to_sheet(mascotaData);
    XLSX.utils.book_append_sheet(wb, wsMascota, "Información");

    // Hoja 2: Consultas médicas
    // Obtener todas las consultas de todos los tipos
    const todasLasConsultas = [
      ...historialMascota.consulta_general,
      ...historialMascota.vacunacion,
      ...historialMascota.emergencia,
      ...historialMascota.grooming,
      ...historialMascota.cirugia,
      ...historialMascota.diagnostico,
    ];

    if (todasLasConsultas.length > 0) {
      const consultasData = [
        ["CONSULTAS MÉDICAS"],
        [""],
        [
          "Fecha",
          "Veterinario",
          "Tipo Servicio",
          "Motivo",
          "Diagnóstico",
          "Tratamiento",
          "Peso (kg)",
          "Temperatura (°C)",
          "Presión Arterial",
          "Freq. Cardíaca",
          "Medicamentos",
          "Vacunas",
          "Exámenes",
          "Servicios",
          "Próxima Cita",
          "Observaciones",
        ],
      ];

      todasLasConsultas.forEach((consulta) => {
        const medicamentos = (consulta.medicamentos || [])
          .map(
            (med) =>
              `${med.nombre}: ${med.dosis}${med.frecuencia ? ` - ${med.frecuencia}` : ""}${med.duracion ? ` (${med.duracion})` : ""}`,
          )
          .join("; ");

        const vacunas = (consulta.vacunas || [])
          .map((vacuna) => `${vacuna.nombre} (Lote: ${vacuna.lote})`)
          .join("; ");

        const examenes = (consulta.examenes || [])
          .map((examen) => `${examen.tipo}: ${examen.resultado}`)
          .join("; ");

        const servicios = (consulta.servicios || [])
          .map(
            (servicio) =>
              `${servicio.nombre}${servicio.precio ? ` - S/${servicio.precio}` : ""}`,
          )
          .join("; ");

        consultasData.push([
          consulta.fecha.toLocaleDateString("es-ES"),
          consulta.veterinario,
          consulta.tipoConsulta || "",
          consulta.motivo || "",
          consulta.diagnostico || "",
          consulta.tratamiento || "",
          consulta.peso || "",
          consulta.temperatura || "",
          consulta.presionArterial || "",
          consulta.frecuenciaCardiaca || "",
          medicamentos || "",
          vacunas || "",
          examenes || "",
          servicios || "",
          consulta.proxima_cita
            ? consulta.proxima_cita.toLocaleDateString("es-ES")
            : "",
          consulta.notas || "",
        ]);
      });

      const wsConsultas = XLSX.utils.aoa_to_sheet(consultasData);
      XLSX.utils.book_append_sheet(wb, wsConsultas, "Consultas");
    }

    // Hoja 3: Resumen
    const resumenData = [
      ["RESUMEN DEL HISTORIAL"],
      [""],
      ["Total de consultas", todasLasConsultas.length.toString()],
      [
        "Última consulta",
        todasLasConsultas.length > 0
          ? todasLasConsultas[0].fecha.toLocaleDateString("es-ES")
          : "No hay consultas",
      ],
      [""],
      ["Documento generado el", new Date().toLocaleDateString("es-ES")],
      ["Generado por", user?.nombre || "Usuario"],
      ["Sistema", "Clínica Veterinaria Digital"],
    ];

    const wsResumen = XLSX.utils.aoa_to_sheet(resumenData);
    XLSX.utils.book_append_sheet(wb, wsResumen, "Resumen");

    // Descargar Excel
    XLSX.writeFile(
      wb,
      `historial_clinico_${selectedMascota.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.xlsx`,
    );
  };

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardContent className="p-6 text-center">
              <FileText className="w-12 h-12 text-vet-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-vet-gray-900 mb-2">
                Acceso requerido
              </h3>
              <p className="text-vet-gray-600">
                Debes iniciar sesión para ver el historial clínico
              </p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout user={user}>
      <div className="min-h-screen bg-vet-gray-50 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-vet-primary/10 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-vet-primary" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-vet-gray-900">
                    {user?.rol === "veterinario"
                      ? "Historial de Pacientes"
                      : "Historial Clínico"}
                  </h1>
                  <p className="text-sm sm:text-base text-vet-gray-600">
                    {user?.rol === "veterinario"
                      ? "Consulta y gestiona el historial médico de tus pacientes"
                      : "Consulta el historial médico completo de tus mascotas"}
                  </p>
                </div>
              </div>

              {/* Botón de descarga - solo mostrar si hay mascota seleccionada */}
              {selectedMascota && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-vet-primary text-vet-primary hover:bg-vet-primary hover:text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Descargar Historial
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={descargarHistorialPDF}>
                      <FileText className="w-4 h-4 mr-2" />
                      Descargar como PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={descargarHistorialExcel}>
                      <Download className="w-4 h-4 mr-2" />
                      Descargar como Excel
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={descargarHistorial}>
                      <FileText className="w-4 h-4 mr-2" />
                      Descargar como TXT
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Selector de mascota - solo mostrar si hay mascotas disponibles */}
            {availableMascotas.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {getMascotasNames(availableMascotas).map((mascota) => (
                  <Button
                    key={mascota}
                    variant={
                      selectedMascota === mascota ? "default" : "outline"
                    }
                    onClick={() => setSelectedMascota(mascota)}
                    className={
                      selectedMascota === mascota
                        ? "bg-vet-primary hover:bg-vet-primary-dark"
                        : ""
                    }
                  >
                    <PawPrint className="w-4 h-4 mr-2" />
                    {mascota}
                  </Button>
                ))}
              </div>
            )}

            {/* Summary Panel - only show for clients */}
            {user?.rol !== "veterinario" && availableMascotas.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-vet-primary/10 rounded-lg flex items-center justify-center">
                        <PawPrint className="w-5 h-5 text-vet-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-vet-gray-600">
                          Total Mascotas
                        </p>
                        <p className="text-xl font-bold text-vet-gray-900">
                          {availableMascotas.length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-vet-gray-600">
                          Servicios Confirmados
                        </p>
                        <p className="text-xl font-bold text-vet-gray-900">
                          {(() => {
                            // Count all attended appointments (admin confirmed services)
                            const serviciosConfirmados = citas.filter(
                              (cita) =>
                                availableMascotas.some(
                                  (m) => m.nombre === cita.mascota,
                                ) && cita.estado === "atendida",
                            ).length;
                            return serviciosConfirmados;
                          })()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-vet-gray-600">
                          Última Visita
                        </p>
                        <p className="text-sm font-medium text-vet-gray-900">
                          {(() => {
                            const ultimaVisita = citas
                              .filter(
                                (cita) =>
                                  availableMascotas.some(
                                    (m) => m.nombre === cita.mascota,
                                  ) && cita.estado === "atendida",
                              )
                              .sort(
                                (a, b) =>
                                  new Date(b.fecha).getTime() -
                                  new Date(a.fecha).getTime(),
                              )[0];
                            return ultimaVisita
                              ? new Date(ultimaVisita.fecha).toLocaleDateString(
                                  "es-ES",
                                )
                              : "Sin visitas";
                          })()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Activity className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-vet-gray-600">En Proceso</p>
                        <p className="text-xl font-bold text-vet-gray-900">
                          {(() => {
                            // Count pending appointments
                            const citasEnProceso = citas.filter(
                              (cita) =>
                                availableMascotas.some(
                                  (m) => m.nombre === cita.mascota,
                                ) &&
                                (cita.estado === "aceptada" ||
                                  cita.estado === "en_validacion"),
                            ).length;
                            return citasEnProceso;
                          })()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Mostrar mensaje si no hay mascotas disponibles */}
          {availableMascotas.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <PawPrint className="w-16 h-16 text-vet-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-vet-gray-900 mb-2">
                  {user?.rol === "veterinario"
                    ? "No tienes pacientes asignados"
                    : "No tienes mascotas registradas"}
                </h3>
                <p className="text-vet-gray-600 mb-6">
                  {user?.rol === "veterinario"
                    ? "No hay mascotas con citas asignadas a ti. Los historiales aparecerán cuando atiendas consultas."
                    : "Primero debes registrar tus mascotas y agendar citas médicas para ver su historial clínico."}
                </p>
                {user?.rol !== "veterinario" && (
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={() => (window.location.href = "/mis-mascotas")}
                      className="bg-vet-primary hover:bg-vet-primary-dark"
                    >
                      <PawPrint className="w-4 h-4 mr-2" />
                      Registrar Mascota
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => (window.location.href = "/mis-citas")}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Agendar Cita
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Tabs
              value={selectedTab}
              onValueChange={setSelectedTab}
              className="space-y-6"
            >
              <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 mb-8">
                <TabsTrigger value="consulta_general">General</TabsTrigger>
                <TabsTrigger value="vacunacion">Vacunas</TabsTrigger>
                <TabsTrigger value="emergencia">Emergencia</TabsTrigger>
                <TabsTrigger value="grooming">Grooming</TabsTrigger>
                <TabsTrigger value="cirugia">Cirugía</TabsTrigger>
                <TabsTrigger value="diagnostico">Diagnóstico</TabsTrigger>
              </TabsList>

              {/* Consulta General Tab */}
              <TabsContent value="consulta_general" className="space-y-4">
                {historialMascota.consulta_general.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Stethoscope className="w-16 h-16 text-vet-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-vet-gray-900 mb-2">
                        Sin consultas generales registradas
                      </h3>
                      <p className="text-vet-gray-600 mb-6">
                        {selectedMascota} no tiene consultas generales en su
                        historial. Los servicios de consulta general aparecerán
                        aqu��.
                      </p>
                      <Button
                        onClick={() => (window.location.href = "/mis-citas")}
                        className="bg-vet-primary hover:bg-vet-primary-dark"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Agendar Cita Médica
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  historialMascota.consulta_general.map((consulta) => (
                    <Card key={consulta.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="flex items-center space-x-2">
                              <Calendar className="w-5 h-5 text-vet-primary" />
                              <span>{consulta.motivo}</span>
                            </CardTitle>
                            <CardDescription>
                              {formatDateSafe(consulta.fecha, {
                                weekday: "long",
                              })}{" "}
                              • {consulta.veterinario}
                            </CardDescription>
                          </div>
                          <Badge className="bg-vet-primary/10 text-vet-primary">
                            Completada
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-vet-gray-900 mb-2">
                              Diagnóstico
                            </h4>
                            <p className="text-vet-gray-700 mb-4">
                              {consulta.diagnostico}
                            </p>

                            <h4 className="font-semibold text-vet-gray-900 mb-2">
                              Tratamiento
                            </h4>
                            <p className="text-vet-gray-700 mb-4">
                              {consulta.tratamiento}
                            </p>

                            {/* Signos vitales */}
                            {(consulta.peso ||
                              consulta.temperatura ||
                              consulta.presionArterial ||
                              consulta.frecuenciaCardiaca) && (
                              <div className="mb-4">
                                <h4 className="font-semibold text-vet-gray-900 mb-2">
                                  Signos Vitales
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                  {consulta.peso && (
                                    <div className="bg-vet-gray-50 rounded-lg p-2">
                                      <span className="font-medium">Peso:</span>{" "}
                                      {consulta.peso} kg
                                    </div>
                                  )}
                                  {consulta.temperatura && (
                                    <div className="bg-vet-gray-50 rounded-lg p-2">
                                      <span className="font-medium">
                                        Temperatura:
                                      </span>{" "}
                                      {consulta.temperatura}°C
                                    </div>
                                  )}
                                  {consulta.presionArterial && (
                                    <div className="bg-vet-gray-50 rounded-lg p-2">
                                      <span className="font-medium">P.A.:</span>{" "}
                                      {consulta.presionArterial}
                                    </div>
                                  )}
                                  {consulta.frecuenciaCardiaca && (
                                    <div className="bg-vet-gray-50 rounded-lg p-2">
                                      <span className="font-medium">F.C.:</span>{" "}
                                      {consulta.frecuenciaCardiaca} bpm
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Exámenes realizados */}
                            {consulta.examenes &&
                              consulta.examenes.length > 0 && (
                                <div className="mb-4">
                                  <h4 className="font-semibold text-vet-gray-900 mb-2">
                                    Exámenes Realizados
                                  </h4>
                                  <div className="space-y-2">
                                    {consulta.examenes.map((examen, index) => (
                                      <div
                                        key={index}
                                        className="bg-vet-gray-50 rounded-lg p-3"
                                      >
                                        <div className="flex items-center justify-between mb-1">
                                          <span className="font-medium text-vet-gray-900">
                                            {examen.tipo}
                                          </span>
                                        </div>
                                        <p className="text-sm text-vet-gray-600">
                                          Resultado: {examen.resultado}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                            {consulta.servicios &&
                              consulta.servicios.length > 0 && (
                                <div>
                                  <h4 className="font-semibold text-vet-gray-900 mb-2">
                                    Servicios Realizados
                                  </h4>
                                  <div className="space-y-2">
                                    {consulta.servicios.map(
                                      (servicio, index) => (
                                        <div
                                          key={index}
                                          className="bg-vet-gray-50 rounded-lg p-3"
                                        >
                                          <div className="flex items-center justify-between mb-1">
                                            <span className="font-medium text-vet-gray-900">
                                              {servicio.nombre}
                                            </span>
                                            {servicio.precio && (
                                              <span className="text-sm font-medium text-vet-primary">
                                                S/{servicio.precio}
                                              </span>
                                            )}
                                          </div>
                                          {servicio.descripcion && (
                                            <p className="text-sm text-vet-gray-600 mb-1">
                                              {servicio.descripcion}
                                            </p>
                                          )}
                                          {servicio.duracion && (
                                            <p className="text-xs text-vet-gray-500">
                                              Duración: {servicio.duracion}
                                            </p>
                                          )}
                                          {servicio.notas && (
                                            <p className="text-xs text-vet-gray-500 mt-1">
                                              Notas: {servicio.notas}
                                            </p>
                                          )}
                                        </div>
                                      ),
                                    )}
                                  </div>
                                </div>
                              )}
                          </div>

                          <div>
                            {consulta.medicamentos.length > 0 && (
                              <div className="mb-4">
                                <h4 className="font-semibold text-vet-gray-900 mb-2 flex items-center">
                                  <Pill className="w-4 h-4 mr-2 text-blue-600" />
                                  Medicamentos Recetados
                                </h4>
                                <div className="space-y-2">
                                  {consulta.medicamentos.map((med, index) => (
                                    <div
                                      key={index}
                                      className="border border-vet-gray-200 rounded-lg p-3"
                                    >
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                                        <div>
                                          <strong>Medicamento:</strong>{" "}
                                          {med.nombre}
                                        </div>
                                        <div>
                                          <strong>Dosis:</strong> {med.dosis}
                                        </div>
                                        <div>
                                          <strong>Frecuencia:</strong>{" "}
                                          {med.frecuencia}
                                        </div>
                                        {med.duracion && (
                                          <div>
                                            <strong>Duración:</strong>{" "}
                                            {med.duracion}
                                          </div>
                                        )}
                                        {med.indicaciones && (
                                          <div className="md:col-span-3">
                                            <strong>Indicaciones:</strong>{" "}
                                            {med.indicaciones}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Vacunas aplicadas */}
                            {consulta.vacunas &&
                              consulta.vacunas.length > 0 && (
                                <div className="mb-4">
                                  <h4 className="font-semibold text-vet-gray-900 mb-2 flex items-center">
                                    <Syringe className="w-4 h-4 mr-2 text-green-600" />
                                    Vacunas Aplicadas
                                  </h4>
                                  <div className="space-y-2">
                                    {consulta.vacunas.map((vacuna, index) => (
                                      <div
                                        key={index}
                                        className="border border-vet-gray-200 rounded-lg p-3"
                                      >
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                                          <div>
                                            <strong>Vacuna:</strong>{" "}
                                            {vacuna.nombre}
                                          </div>
                                          <div>
                                            <strong>Lote:</strong> {vacuna.lote}
                                          </div>
                                          <div>
                                            <strong>Próxima Dosis:</strong>{" "}
                                            {new Date(
                                              vacuna.proximaFecha,
                                            ).toLocaleDateString("es-ES")}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                            {/* Archivos adjuntos */}
                            {consulta.archivosAdjuntos &&
                              consulta.archivosAdjuntos.length > 0 && (
                                <div className="mb-4">
                                  <h4 className="font-semibold text-vet-gray-900 mb-2 flex items-center">
                                    <FileText className="w-4 h-4 mr-2 text-vet-gray-600" />
                                    Archivos Adjuntos
                                  </h4>
                                  <div className="space-y-2">
                                    {consulta.archivosAdjuntos.map(
                                      (archivo, index) => (
                                        <div
                                          key={index}
                                          className="border border-vet-gray-200 rounded-lg p-3"
                                        >
                                          <div className="flex items-center justify-between text-sm">
                                            <div>
                                              <strong>{archivo.nombre}</strong>
                                              <span className="text-vet-gray-600 ml-2">
                                                ({archivo.tipo})
                                              </span>
                                            </div>
                                            <a
                                              href={archivo.url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-vet-primary hover:underline"
                                            >
                                              <Download className="w-4 h-4 inline mr-1" />
                                              Descargar
                                            </a>
                                          </div>
                                        </div>
                                      ),
                                    )}
                                  </div>
                                </div>
                              )}

                            {consulta.proxima_cita && (
                              <div className="mb-4">
                                <h4 className="font-semibold text-vet-gray-900 mb-2">
                                  Próximo control
                                </h4>
                                <p className="text-vet-gray-700">
                                  {consulta.proxima_cita.toLocaleDateString(
                                    "es-ES",
                                  )}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Resumen completo del servicio realizado */}
                        <div className="mt-6 p-4 bg-gradient-to-r from-vet-primary/5 to-blue-50 rounded-lg border border-vet-primary/20">
                          <h5 className="font-medium text-vet-primary mb-3 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Resumen del Servicio Completado
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="space-y-2">
                                <div>
                                  <strong>Servicio:</strong>{" "}
                                  {consulta.tipoConsulta || "Consulta"}
                                </div>
                                <div>
                                  <strong>Duración:</strong> Aprox.{" "}
                                  {(() => {
                                    const servicesMap = {
                                      consulta: "30-45 min",
                                      vacunacion: "15-20 min",
                                      emergencia: "45-90 min",
                                      grooming: "60-120 min",
                                      cirugia: "90-180 min",
                                      diagnostico: "30-60 min",
                                    };
                                    const tipo =
                                      consulta.tipoConsulta?.toLowerCase() ||
                                      "consulta";
                                    return servicesMap[tipo] || "30-45 min";
                                  })()}
                                </div>
                                <div>
                                  <strong>Estado Final:</strong>
                                  <span className="ml-1 px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                    Servicio Completado Exitosamente
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="space-y-2">
                                <div>
                                  <strong>Fecha de Realización:</strong>{" "}
                                  {new Date(consulta.fecha).toLocaleDateString(
                                    "es-ES",
                                  )}
                                </div>
                                <div>
                                  <strong>Hora de Atención:</strong>{" "}
                                  {new Date(consulta.fecha).toLocaleTimeString(
                                    "es-ES",
                                    { hour: "2-digit", minute: "2-digit" },
                                  )}
                                </div>
                                {consulta.proxima_cita && (
                                  <div>
                                    <strong>Próximo Control:</strong>{" "}
                                    {new Date(
                                      consulta.proxima_cita,
                                    ).toLocaleDateString("es-ES")}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Indicadores de calidad del servicio */}
                          <div className="mt-3 pt-3 border-t border-vet-primary/10">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1 text-green-600">
                                  <CheckCircle className="w-3 h-3" />
                                  <span>Protocolo Completo</span>
                                </div>
                                {consulta.medicamentos &&
                                  consulta.medicamentos.length > 0 && (
                                    <div className="flex items-center space-x-1 text-blue-600">
                                      <Pill className="w-3 h-3" />
                                      <span>
                                        {consulta.medicamentos.length}{" "}
                                        Medicamento
                                        {consulta.medicamentos.length > 1
                                          ? "s"
                                          : ""}{" "}
                                        Recetado
                                        {consulta.medicamentos.length > 1
                                          ? "s"
                                          : ""}
                                      </span>
                                    </div>
                                  )}
                                {consulta.examenes &&
                                  consulta.examenes.length > 0 && (
                                    <div className="flex items-center space-x-1 text-purple-600">
                                      <Activity className="w-3 h-3" />
                                      <span>
                                        {consulta.examenes.length} Examen
                                        {consulta.examenes.length > 1
                                          ? "es"
                                          : ""}{" "}
                                        Realizado
                                        {consulta.examenes.length > 1
                                          ? "s"
                                          : ""}
                                      </span>
                                    </div>
                                  )}
                              </div>
                              <div className="text-vet-gray-500">
                                Registro #{consulta.id}
                              </div>
                            </div>
                          </div>
                        </div>

                        {consulta.notas && (
                          <div className="mt-4 p-4 bg-vet-primary/5 rounded-lg border border-vet-primary/20">
                            <h4 className="font-semibold text-vet-primary mb-2">
                              Notas del veterinario
                            </h4>
                            <p className="text-vet-gray-700">
                              {consulta.notas}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              {/* Vacunación Tab */}
              <TabsContent value="vacunacion" className="space-y-4">
                {historialMascota.vacunacion.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Syringe className="w-16 h-16 text-vet-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-vet-gray-900 mb-2">
                        Sin servicios de vacunación registrados
                      </h3>
                      <p className="text-vet-gray-600 mb-6">
                        {selectedMascota} no tiene servicios de vacunación en su
                        historial.
                      </p>
                      <Button
                        onClick={() => (window.location.href = "/mis-citas")}
                        className="bg-vet-primary hover:bg-vet-primary-dark"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Agendar Vacunación
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  historialMascota.vacunacion.map((servicio) => (
                    <Card key={servicio.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="flex items-center space-x-2">
                              <Syringe className="w-5 h-5 text-vet-primary" />
                              <span>{servicio.tipoConsulta}</span>
                            </CardTitle>
                            <CardDescription>
                              {formatDateSafe(servicio.fecha)} •{" "}
                              {servicio.veterinario}
                            </CardDescription>
                          </div>
                          <Badge className="bg-vet-primary/10 text-vet-primary">
                            S/{servicio.precio}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <span className="font-medium text-vet-gray-700">
                              Motivo:
                            </span>
                            <p className="text-vet-gray-600">
                              {servicio.motivo}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium text-vet-gray-700">
                              Diagnóstico:
                            </span>
                            <p className="text-vet-gray-600">
                              {servicio.diagnostico}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium text-vet-gray-700">
                              Tratamiento:
                            </span>
                            <p className="text-vet-gray-600">
                              {servicio.tratamiento}
                            </p>
                          </div>

                          {/* Signos vitales */}
                          {(servicio.peso ||
                            servicio.temperatura ||
                            servicio.presionArterial ||
                            servicio.frecuenciaCardiaca) && (
                            <div>
                              <span className="font-medium text-vet-gray-700 mb-2 block">
                                Signos Vitales:
                              </span>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                {servicio.peso && (
                                  <div className="bg-vet-gray-50 rounded-lg p-2">
                                    <span className="font-medium">Peso:</span>{" "}
                                    {servicio.peso} kg
                                  </div>
                                )}
                                {servicio.temperatura && (
                                  <div className="bg-vet-gray-50 rounded-lg p-2">
                                    <span className="font-medium">Temp:</span>{" "}
                                    {servicio.temperatura}°C
                                  </div>
                                )}
                                {servicio.presionArterial && (
                                  <div className="bg-vet-gray-50 rounded-lg p-2">
                                    <span className="font-medium">P.A.:</span>{" "}
                                    {servicio.presionArterial}
                                  </div>
                                )}
                                {servicio.frecuenciaCardiaca && (
                                  <div className="bg-vet-gray-50 rounded-lg p-2">
                                    <span className="font-medium">F.C.:</span>{" "}
                                    {servicio.frecuenciaCardiaca} bpm
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Medicamentos */}
                          {servicio.medicamentos &&
                            servicio.medicamentos.length > 0 && (
                              <div>
                                <span className="font-medium text-vet-gray-700 mb-2 block">
                                  Medicamentos Recetados:
                                </span>
                                <div className="space-y-2">
                                  {servicio.medicamentos.map((med, index) => (
                                    <div
                                      key={index}
                                      className="border border-vet-gray-200 rounded-lg p-3"
                                    >
                                      <div className="text-sm">
                                        <div>
                                          <strong>Medicamento:</strong>{" "}
                                          {med.nombre}
                                        </div>
                                        <div>
                                          <strong>Dosis:</strong> {med.dosis}
                                        </div>
                                        {med.frecuencia && (
                                          <div>
                                            <strong>Frecuencia:</strong>{" "}
                                            {med.frecuencia}
                                          </div>
                                        )}
                                        {med.duracion && (
                                          <div>
                                            <strong>Duración:</strong>{" "}
                                            {med.duracion}
                                          </div>
                                        )}
                                        {med.indicaciones && (
                                          <div>
                                            <strong>Indicaciones:</strong>{" "}
                                            {med.indicaciones}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                          {/* Vacunas aplicadas */}
                          {servicio.vacunas && servicio.vacunas.length > 0 && (
                            <div>
                              <span className="font-medium text-vet-gray-700 mb-2 block">
                                Vacunas Aplicadas:
                              </span>
                              <div className="space-y-2">
                                {servicio.vacunas.map((vacuna, index) => (
                                  <div
                                    key={index}
                                    className="border border-vet-gray-200 rounded-lg p-3"
                                  >
                                    <div className="text-sm">
                                      <div>
                                        <strong>Vacuna:</strong> {vacuna.nombre}
                                      </div>
                                      <div>
                                        <strong>Lote:</strong> {vacuna.lote}
                                      </div>
                                      <div>
                                        <strong>Próxima Dosis:</strong>{" "}
                                        {new Date(
                                          vacuna.proximaFecha,
                                        ).toLocaleDateString("es-ES")}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Exámenes realizados */}
                          {servicio.examenes &&
                            servicio.examenes.length > 0 && (
                              <div>
                                <span className="font-medium text-vet-gray-700 mb-2 block">
                                  Exámenes Realizados:
                                </span>
                                <div className="space-y-2">
                                  {servicio.examenes.map((examen, index) => (
                                    <div
                                      key={index}
                                      className="bg-vet-gray-50 rounded-lg p-3"
                                    >
                                      <div className="text-sm">
                                        <strong>{examen.tipo}:</strong>{" "}
                                        {examen.resultado}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                          {/* Servicios adicionales */}
                          {servicio.servicios &&
                            servicio.servicios.length > 0 && (
                              <div>
                                <span className="font-medium text-vet-gray-700 mb-2 block">
                                  Servicios Realizados:
                                </span>
                                <div className="space-y-2">
                                  {servicio.servicios.map(
                                    (servicioItem, index) => (
                                      <div
                                        key={index}
                                        className="bg-vet-gray-50 rounded-lg p-3"
                                      >
                                        <div className="text-sm">
                                          <div>
                                            <strong>Servicio:</strong>{" "}
                                            {servicioItem.nombre}
                                          </div>
                                          {servicioItem.precio && (
                                            <div>
                                              <strong>Precio:</strong> S/
                                              {servicioItem.precio}
                                            </div>
                                          )}
                                          {servicioItem.descripcion && (
                                            <div>
                                              <strong>Descripción:</strong>{" "}
                                              {servicioItem.descripcion}
                                            </div>
                                          )}
                                          {servicioItem.duracion && (
                                            <div>
                                              <strong>Duración:</strong>{" "}
                                              {servicioItem.duracion}
                                            </div>
                                          )}
                                          {servicioItem.notas && (
                                            <div>
                                              <strong>Notas:</strong>{" "}
                                              {servicioItem.notas}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                            )}

                          {/* Archivos adjuntos */}
                          {servicio.archivosAdjuntos &&
                            servicio.archivosAdjuntos.length > 0 && (
                              <div>
                                <span className="font-medium text-vet-gray-700 mb-2 block">
                                  Archivos Adjuntos:
                                </span>
                                <div className="space-y-2">
                                  {servicio.archivosAdjuntos.map(
                                    (archivo, index) => (
                                      <div
                                        key={index}
                                        className="border border-vet-gray-200 rounded-lg p-3"
                                      >
                                        <div className="flex items-center justify-between text-sm">
                                          <div>
                                            <strong>{archivo.nombre}</strong>
                                            <span className="text-vet-gray-600 ml-2">
                                              ({archivo.tipo})
                                            </span>
                                          </div>
                                          <a
                                            href={archivo.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-vet-primary hover:underline"
                                          >
                                            <Download className="w-4 h-4 inline mr-1" />
                                            Descargar
                                          </a>
                                        </div>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                            )}
                        </div>

                        {/* Resumen completo del servicio realizado */}
                        <div className="mt-6 p-4 bg-gradient-to-r from-vet-primary/5 to-blue-50 rounded-lg border border-vet-primary/20">
                          <h5 className="font-medium text-vet-primary mb-3 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Resumen del Servicio Completado
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="space-y-2">
                                <div>
                                  <strong>Servicio:</strong>{" "}
                                  {servicio.tipoConsulta ||
                                    "Servicio Veterinario"}
                                </div>
                                <div>
                                  <strong>Duración:</strong> Aprox.{" "}
                                  {(() => {
                                    const servicesMap = {
                                      consulta: "30-45 min",
                                      vacunacion: "15-20 min",
                                      emergencia: "45-90 min",
                                      grooming: "60-120 min",
                                      cirugia: "90-180 min",
                                      diagnostico: "30-60 min",
                                    };
                                    const tipo =
                                      servicio.tipoConsulta?.toLowerCase() ||
                                      "consulta";
                                    return servicesMap[tipo] || "30-45 min";
                                  })()}
                                </div>
                                <div>
                                  <strong>Estado Final:</strong>
                                  <span className="ml-1 px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                    Servicio Completado Exitosamente
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="space-y-2">
                                <div>
                                  <strong>Fecha de Realización:</strong>{" "}
                                  {new Date(servicio.fecha).toLocaleDateString(
                                    "es-ES",
                                  )}
                                </div>
                                <div>
                                  <strong>Hora de Atenci��n:</strong>{" "}
                                  {new Date(servicio.fecha).toLocaleTimeString(
                                    "es-ES",
                                    { hour: "2-digit", minute: "2-digit" },
                                  )}
                                </div>
                                {servicio.proxima_cita && (
                                  <div>
                                    <strong>Próximo Control:</strong>{" "}
                                    {new Date(
                                      servicio.proxima_cita,
                                    ).toLocaleDateString("es-ES")}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t border-vet-primary/10">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1 text-green-600">
                                  <CheckCircle className="w-3 h-3" />
                                  <span>Protocolo Completo</span>
                                </div>
                                {servicio.medicamentos &&
                                  servicio.medicamentos.length > 0 && (
                                    <div className="flex items-center space-x-1 text-blue-600">
                                      <Pill className="w-3 h-3" />
                                      <span>
                                        {servicio.medicamentos.length}{" "}
                                        Medicamento
                                        {servicio.medicamentos.length > 1
                                          ? "s"
                                          : ""}
                                      </span>
                                    </div>
                                  )}
                                {servicio.examenes &&
                                  servicio.examenes.length > 0 && (
                                    <div className="flex items-center space-x-1 text-purple-600">
                                      <Activity className="w-3 h-3" />
                                      <span>
                                        {servicio.examenes.length} Examen
                                        {servicio.examenes.length > 1
                                          ? "es"
                                          : ""}
                                      </span>
                                    </div>
                                  )}
                              </div>
                              <div className="text-vet-gray-500">
                                Registro #{servicio.id}
                              </div>
                            </div>
                          </div>
                        </div>

                        {servicio.notas && (
                          <div className="mt-4 p-4 bg-vet-primary/5 rounded-lg border border-vet-primary/20">
                            <h4 className="font-semibold text-vet-primary mb-2">
                              Notas del veterinario
                            </h4>
                            <p className="text-vet-gray-700">
                              {servicio.notas}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              {/* Emergencia Tab */}
              <TabsContent value="emergencia" className="space-y-4">
                {historialMascota.emergencia.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Activity className="w-16 h-16 text-vet-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-vet-gray-900 mb-2">
                        Sin servicios de emergencia registrados
                      </h3>
                      <p className="text-vet-gray-600 mb-6">
                        {selectedMascota} no tiene servicios de emergencia en su
                        historial.
                      </p>
                      <Button
                        onClick={() => (window.location.href = "/mis-citas")}
                        className="bg-vet-primary hover:bg-vet-primary-dark"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Agendar Emergencia
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  historialMascota.emergencia.map((servicio) => (
                    <Card key={servicio.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="flex items-center space-x-2">
                              <Activity className="w-5 h-5 text-red-600" />
                              <span>{servicio.tipoConsulta}</span>
                            </CardTitle>
                            <CardDescription>
                              {formatDateSafe(servicio.fecha)} •{" "}
                              {servicio.veterinario}
                            </CardDescription>
                          </div>
                          <Badge className="bg-red-100 text-red-800">
                            S/{servicio.precio}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <span className="font-medium text-vet-gray-700">
                              Motivo:
                            </span>
                            <p className="text-vet-gray-600">
                              {servicio.motivo}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium text-vet-gray-700">
                              Diagnóstico:
                            </span>
                            <p className="text-vet-gray-600">
                              {servicio.diagnostico}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium text-vet-gray-700">
                              Tratamiento:
                            </span>
                            <p className="text-vet-gray-600">
                              {servicio.tratamiento}
                            </p>
                          </div>

                          {/* Signos vitales */}
                          {(servicio.peso ||
                            servicio.temperatura ||
                            servicio.presionArterial ||
                            servicio.frecuenciaCardiaca) && (
                            <div>
                              <span className="font-medium text-vet-gray-700 mb-2 block">
                                Signos Vitales:
                              </span>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                {servicio.peso && (
                                  <div className="bg-vet-gray-50 rounded-lg p-2">
                                    <span className="font-medium">Peso:</span>{" "}
                                    {servicio.peso} kg
                                  </div>
                                )}
                                {servicio.temperatura && (
                                  <div className="bg-vet-gray-50 rounded-lg p-2">
                                    <span className="font-medium">Temp:</span>{" "}
                                    {servicio.temperatura}°C
                                  </div>
                                )}
                                {servicio.presionArterial && (
                                  <div className="bg-vet-gray-50 rounded-lg p-2">
                                    <span className="font-medium">P.A.:</span>{" "}
                                    {servicio.presionArterial}
                                  </div>
                                )}
                                {servicio.frecuenciaCardiaca && (
                                  <div className="bg-vet-gray-50 rounded-lg p-2">
                                    <span className="font-medium">F.C.:</span>{" "}
                                    {servicio.frecuenciaCardiaca} bpm
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Medicamentos */}
                          {servicio.medicamentos &&
                            servicio.medicamentos.length > 0 && (
                              <div>
                                <span className="font-medium text-vet-gray-700 mb-2 block">
                                  Medicamentos Recetados:
                                </span>
                                <div className="space-y-2">
                                  {servicio.medicamentos.map((med, index) => (
                                    <div
                                      key={index}
                                      className="border border-vet-gray-200 rounded-lg p-3"
                                    >
                                      <div className="text-sm">
                                        <div>
                                          <strong>Medicamento:</strong>{" "}
                                          {med.nombre}
                                        </div>
                                        <div>
                                          <strong>Dosis:</strong> {med.dosis}
                                        </div>
                                        {med.frecuencia && (
                                          <div>
                                            <strong>Frecuencia:</strong>{" "}
                                            {med.frecuencia}
                                          </div>
                                        )}
                                        {med.duracion && (
                                          <div>
                                            <strong>Duración:</strong>{" "}
                                            {med.duracion}
                                          </div>
                                        )}
                                        {med.indicaciones && (
                                          <div>
                                            <strong>Indicaciones:</strong>{" "}
                                            {med.indicaciones}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                          {/* Vacunas aplicadas */}
                          {servicio.vacunas && servicio.vacunas.length > 0 && (
                            <div>
                              <span className="font-medium text-vet-gray-700 mb-2 block">
                                Vacunas Aplicadas:
                              </span>
                              <div className="space-y-2">
                                {servicio.vacunas.map((vacuna, index) => (
                                  <div
                                    key={index}
                                    className="border border-vet-gray-200 rounded-lg p-3"
                                  >
                                    <div className="text-sm">
                                      <div>
                                        <strong>Vacuna:</strong> {vacuna.nombre}
                                      </div>
                                      <div>
                                        <strong>Lote:</strong> {vacuna.lote}
                                      </div>
                                      <div>
                                        <strong>Próxima Dosis:</strong>{" "}
                                        {new Date(
                                          vacuna.proximaFecha,
                                        ).toLocaleDateString("es-ES")}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Exámenes realizados */}
                          {servicio.examenes &&
                            servicio.examenes.length > 0 && (
                              <div>
                                <span className="font-medium text-vet-gray-700 mb-2 block">
                                  Exámenes Realizados:
                                </span>
                                <div className="space-y-2">
                                  {servicio.examenes.map((examen, index) => (
                                    <div
                                      key={index}
                                      className="bg-vet-gray-50 rounded-lg p-3"
                                    >
                                      <div className="text-sm">
                                        <strong>{examen.tipo}:</strong>{" "}
                                        {examen.resultado}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                          {/* Servicios adicionales */}
                          {servicio.servicios &&
                            servicio.servicios.length > 0 && (
                              <div>
                                <span className="font-medium text-vet-gray-700 mb-2 block">
                                  Servicios Realizados:
                                </span>
                                <div className="space-y-2">
                                  {servicio.servicios.map(
                                    (servicioItem, index) => (
                                      <div
                                        key={index}
                                        className="bg-vet-gray-50 rounded-lg p-3"
                                      >
                                        <div className="text-sm">
                                          <div>
                                            <strong>Servicio:</strong>{" "}
                                            {servicioItem.nombre}
                                          </div>
                                          {servicioItem.precio && (
                                            <div>
                                              <strong>Precio:</strong> S/
                                              {servicioItem.precio}
                                            </div>
                                          )}
                                          {servicioItem.descripcion && (
                                            <div>
                                              <strong>Descripción:</strong>{" "}
                                              {servicioItem.descripcion}
                                            </div>
                                          )}
                                          {servicioItem.duracion && (
                                            <div>
                                              <strong>Duración:</strong>{" "}
                                              {servicioItem.duracion}
                                            </div>
                                          )}
                                          {servicioItem.notas && (
                                            <div>
                                              <strong>Notas:</strong>{" "}
                                              {servicioItem.notas}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                            )}

                          {/* Archivos adjuntos */}
                          {servicio.archivosAdjuntos &&
                            servicio.archivosAdjuntos.length > 0 && (
                              <div>
                                <span className="font-medium text-vet-gray-700 mb-2 block">
                                  Archivos Adjuntos:
                                </span>
                                <div className="space-y-2">
                                  {servicio.archivosAdjuntos.map(
                                    (archivo, index) => (
                                      <div
                                        key={index}
                                        className="border border-vet-gray-200 rounded-lg p-3"
                                      >
                                        <div className="flex items-center justify-between text-sm">
                                          <div>
                                            <strong>{archivo.nombre}</strong>
                                            <span className="text-vet-gray-600 ml-2">
                                              ({archivo.tipo})
                                            </span>
                                          </div>
                                          <a
                                            href={archivo.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-vet-primary hover:underline"
                                          >
                                            <Download className="w-4 h-4 inline mr-1" />
                                            Descargar
                                          </a>
                                        </div>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                            )}
                        </div>

                        {/* Resumen completo del servicio realizado */}
                        <div className="mt-6 p-4 bg-gradient-to-r from-vet-primary/5 to-blue-50 rounded-lg border border-vet-primary/20">
                          <h5 className="font-medium text-vet-primary mb-3 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Resumen del Servicio Completado
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="space-y-2">
                                <div>
                                  <strong>Servicio:</strong>{" "}
                                  {servicio.tipoConsulta ||
                                    "Servicio Veterinario"}
                                </div>
                                <div>
                                  <strong>Duración:</strong> Aprox.{" "}
                                  {(() => {
                                    const servicesMap = {
                                      consulta: "30-45 min",
                                      vacunacion: "15-20 min",
                                      emergencia: "45-90 min",
                                      grooming: "60-120 min",
                                      cirugia: "90-180 min",
                                      diagnostico: "30-60 min",
                                    };
                                    const tipo =
                                      servicio.tipoConsulta?.toLowerCase() ||
                                      "consulta";
                                    return servicesMap[tipo] || "30-45 min";
                                  })()}
                                </div>
                                <div>
                                  <strong>Estado Final:</strong>
                                  <span className="ml-1 px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                    Servicio Completado Exitosamente
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="space-y-2">
                                <div>
                                  <strong>Fecha de Realización:</strong>{" "}
                                  {new Date(servicio.fecha).toLocaleDateString(
                                    "es-ES",
                                  )}
                                </div>
                                <div>
                                  <strong>Hora de Atención:</strong>{" "}
                                  {new Date(servicio.fecha).toLocaleTimeString(
                                    "es-ES",
                                    { hour: "2-digit", minute: "2-digit" },
                                  )}
                                </div>
                                {servicio.proxima_cita && (
                                  <div>
                                    <strong>Próximo Control:</strong>{" "}
                                    {new Date(
                                      servicio.proxima_cita,
                                    ).toLocaleDateString("es-ES")}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t border-vet-primary/10">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1 text-green-600">
                                  <CheckCircle className="w-3 h-3" />
                                  <span>Protocolo Completo</span>
                                </div>
                                {servicio.medicamentos &&
                                  servicio.medicamentos.length > 0 && (
                                    <div className="flex items-center space-x-1 text-blue-600">
                                      <Pill className="w-3 h-3" />
                                      <span>
                                        {servicio.medicamentos.length}{" "}
                                        Medicamento
                                        {servicio.medicamentos.length > 1
                                          ? "s"
                                          : ""}
                                      </span>
                                    </div>
                                  )}
                                {servicio.examenes &&
                                  servicio.examenes.length > 0 && (
                                    <div className="flex items-center space-x-1 text-purple-600">
                                      <Activity className="w-3 h-3" />
                                      <span>
                                        {servicio.examenes.length} Examen
                                        {servicio.examenes.length > 1
                                          ? "es"
                                          : ""}
                                      </span>
                                    </div>
                                  )}
                              </div>
                              <div className="text-vet-gray-500">
                                Registro #{servicio.id}
                              </div>
                            </div>
                          </div>
                        </div>

                        {servicio.notas && (
                          <div className="mt-4 p-4 bg-vet-primary/5 rounded-lg border border-vet-primary/20">
                            <h4 className="font-semibold text-vet-primary mb-2">
                              Notas del veterinario
                            </h4>
                            <p className="text-vet-gray-700">
                              {servicio.notas}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              {/* Grooming Tab */}
              <TabsContent value="grooming" className="space-y-4">
                {historialMascota.grooming.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <PawPrint className="w-16 h-16 text-vet-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-vet-gray-900 mb-2">
                        Sin servicios de grooming registrados
                      </h3>
                      <p className="text-vet-gray-600 mb-6">
                        {selectedMascota} no tiene servicios de grooming en su
                        historial.
                      </p>
                      <Button
                        onClick={() => (window.location.href = "/mis-citas")}
                        className="bg-vet-primary hover:bg-vet-primary-dark"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Agendar Grooming
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  historialMascota.grooming.map((servicio) => (
                    <Card key={servicio.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="flex items-center space-x-2">
                              <PawPrint className="w-5 h-5 text-orange-600" />
                              <span>{servicio.tipoConsulta}</span>
                            </CardTitle>
                            <CardDescription>
                              {formatDateSafe(servicio.fecha)} •{" "}
                              {servicio.veterinario}
                            </CardDescription>
                          </div>
                          <Badge className="bg-orange-100 text-orange-800">
                            S/{servicio.precio}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <span className="font-medium text-vet-gray-700">
                              Motivo:
                            </span>
                            <p className="text-vet-gray-600">
                              {servicio.motivo}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium text-vet-gray-700">
                              Diagnóstico:
                            </span>
                            <p className="text-vet-gray-600">
                              {servicio.diagnostico}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium text-vet-gray-700">
                              Tratamiento:
                            </span>
                            <p className="text-vet-gray-600">
                              {servicio.tratamiento}
                            </p>
                          </div>

                          {/* Signos vitales */}
                          {(servicio.peso ||
                            servicio.temperatura ||
                            servicio.presionArterial ||
                            servicio.frecuenciaCardiaca) && (
                            <div>
                              <span className="font-medium text-vet-gray-700 mb-2 block">
                                Signos Vitales:
                              </span>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                {servicio.peso && (
                                  <div className="bg-vet-gray-50 rounded-lg p-2">
                                    <span className="font-medium">Peso:</span>{" "}
                                    {servicio.peso} kg
                                  </div>
                                )}
                                {servicio.temperatura && (
                                  <div className="bg-vet-gray-50 rounded-lg p-2">
                                    <span className="font-medium">Temp:</span>{" "}
                                    {servicio.temperatura}°C
                                  </div>
                                )}
                                {servicio.presionArterial && (
                                  <div className="bg-vet-gray-50 rounded-lg p-2">
                                    <span className="font-medium">P.A.:</span>{" "}
                                    {servicio.presionArterial}
                                  </div>
                                )}
                                {servicio.frecuenciaCardiaca && (
                                  <div className="bg-vet-gray-50 rounded-lg p-2">
                                    <span className="font-medium">F.C.:</span>{" "}
                                    {servicio.frecuenciaCardiaca} bpm
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Medicamentos */}
                          {servicio.medicamentos &&
                            servicio.medicamentos.length > 0 && (
                              <div>
                                <span className="font-medium text-vet-gray-700 mb-2 block">
                                  Medicamentos Recetados:
                                </span>
                                <div className="space-y-2">
                                  {servicio.medicamentos.map((med, index) => (
                                    <div
                                      key={index}
                                      className="border border-vet-gray-200 rounded-lg p-3"
                                    >
                                      <div className="text-sm">
                                        <div>
                                          <strong>Medicamento:</strong>{" "}
                                          {med.nombre}
                                        </div>
                                        <div>
                                          <strong>Dosis:</strong> {med.dosis}
                                        </div>
                                        {med.frecuencia && (
                                          <div>
                                            <strong>Frecuencia:</strong>{" "}
                                            {med.frecuencia}
                                          </div>
                                        )}
                                        {med.duracion && (
                                          <div>
                                            <strong>Duración:</strong>{" "}
                                            {med.duracion}
                                          </div>
                                        )}
                                        {med.indicaciones && (
                                          <div>
                                            <strong>Indicaciones:</strong>{" "}
                                            {med.indicaciones}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                          {/* Vacunas aplicadas */}
                          {servicio.vacunas && servicio.vacunas.length > 0 && (
                            <div>
                              <span className="font-medium text-vet-gray-700 mb-2 block">
                                Vacunas Aplicadas:
                              </span>
                              <div className="space-y-2">
                                {servicio.vacunas.map((vacuna, index) => (
                                  <div
                                    key={index}
                                    className="border border-vet-gray-200 rounded-lg p-3"
                                  >
                                    <div className="text-sm">
                                      <div>
                                        <strong>Vacuna:</strong> {vacuna.nombre}
                                      </div>
                                      <div>
                                        <strong>Lote:</strong> {vacuna.lote}
                                      </div>
                                      <div>
                                        <strong>Próxima Dosis:</strong>{" "}
                                        {new Date(
                                          vacuna.proximaFecha,
                                        ).toLocaleDateString("es-ES")}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Exámenes realizados */}
                          {servicio.examenes &&
                            servicio.examenes.length > 0 && (
                              <div>
                                <span className="font-medium text-vet-gray-700 mb-2 block">
                                  Exámenes Realizados:
                                </span>
                                <div className="space-y-2">
                                  {servicio.examenes.map((examen, index) => (
                                    <div
                                      key={index}
                                      className="bg-vet-gray-50 rounded-lg p-3"
                                    >
                                      <div className="text-sm">
                                        <strong>{examen.tipo}:</strong>{" "}
                                        {examen.resultado}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                          {/* Servicios adicionales */}
                          {servicio.servicios &&
                            servicio.servicios.length > 0 && (
                              <div>
                                <span className="font-medium text-vet-gray-700 mb-2 block">
                                  Servicios Realizados:
                                </span>
                                <div className="space-y-2">
                                  {servicio.servicios.map(
                                    (servicioItem, index) => (
                                      <div
                                        key={index}
                                        className="bg-vet-gray-50 rounded-lg p-3"
                                      >
                                        <div className="text-sm">
                                          <div>
                                            <strong>Servicio:</strong>{" "}
                                            {servicioItem.nombre}
                                          </div>
                                          {servicioItem.precio && (
                                            <div>
                                              <strong>Precio:</strong> S/
                                              {servicioItem.precio}
                                            </div>
                                          )}
                                          {servicioItem.descripcion && (
                                            <div>
                                              <strong>Descripción:</strong>{" "}
                                              {servicioItem.descripcion}
                                            </div>
                                          )}
                                          {servicioItem.duracion && (
                                            <div>
                                              <strong>Duración:</strong>{" "}
                                              {servicioItem.duracion}
                                            </div>
                                          )}
                                          {servicioItem.notas && (
                                            <div>
                                              <strong>Notas:</strong>{" "}
                                              {servicioItem.notas}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                            )}

                          {/* Archivos adjuntos */}
                          {servicio.archivosAdjuntos &&
                            servicio.archivosAdjuntos.length > 0 && (
                              <div>
                                <span className="font-medium text-vet-gray-700 mb-2 block">
                                  Archivos Adjuntos:
                                </span>
                                <div className="space-y-2">
                                  {servicio.archivosAdjuntos.map(
                                    (archivo, index) => (
                                      <div
                                        key={index}
                                        className="border border-vet-gray-200 rounded-lg p-3"
                                      >
                                        <div className="flex items-center justify-between text-sm">
                                          <div>
                                            <strong>{archivo.nombre}</strong>
                                            <span className="text-vet-gray-600 ml-2">
                                              ({archivo.tipo})
                                            </span>
                                          </div>
                                          <a
                                            href={archivo.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-vet-primary hover:underline"
                                          >
                                            <Download className="w-4 h-4 inline mr-1" />
                                            Descargar
                                          </a>
                                        </div>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                            )}
                        </div>

                        {/* Resumen completo del servicio realizado */}
                        <div className="mt-6 p-4 bg-gradient-to-r from-vet-primary/5 to-blue-50 rounded-lg border border-vet-primary/20">
                          <h5 className="font-medium text-vet-primary mb-3 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Resumen del Servicio Completado
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="space-y-2">
                                <div>
                                  <strong>Servicio:</strong>{" "}
                                  {servicio.tipoConsulta ||
                                    "Servicio Veterinario"}
                                </div>
                                <div>
                                  <strong>Duración:</strong> Aprox.{" "}
                                  {(() => {
                                    const servicesMap = {
                                      consulta: "30-45 min",
                                      vacunacion: "15-20 min",
                                      emergencia: "45-90 min",
                                      grooming: "60-120 min",
                                      cirugia: "90-180 min",
                                      diagnostico: "30-60 min",
                                    };
                                    const tipo =
                                      servicio.tipoConsulta?.toLowerCase() ||
                                      "consulta";
                                    return servicesMap[tipo] || "30-45 min";
                                  })()}
                                </div>
                                <div>
                                  <strong>Estado Final:</strong>
                                  <span className="ml-1 px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                    Servicio Completado Exitosamente
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="space-y-2">
                                <div>
                                  <strong>Fecha de Realización:</strong>{" "}
                                  {new Date(servicio.fecha).toLocaleDateString(
                                    "es-ES",
                                  )}
                                </div>
                                <div>
                                  <strong>Hora de Atención:</strong>{" "}
                                  {new Date(servicio.fecha).toLocaleTimeString(
                                    "es-ES",
                                    { hour: "2-digit", minute: "2-digit" },
                                  )}
                                </div>
                                {servicio.proxima_cita && (
                                  <div>
                                    <strong>Próximo Control:</strong>{" "}
                                    {new Date(
                                      servicio.proxima_cita,
                                    ).toLocaleDateString("es-ES")}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t border-vet-primary/10">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1 text-green-600">
                                  <CheckCircle className="w-3 h-3" />
                                  <span>Protocolo Completo</span>
                                </div>
                                {servicio.medicamentos &&
                                  servicio.medicamentos.length > 0 && (
                                    <div className="flex items-center space-x-1 text-blue-600">
                                      <Pill className="w-3 h-3" />
                                      <span>
                                        {servicio.medicamentos.length}{" "}
                                        Medicamento
                                        {servicio.medicamentos.length > 1
                                          ? "s"
                                          : ""}
                                      </span>
                                    </div>
                                  )}
                                {servicio.examenes &&
                                  servicio.examenes.length > 0 && (
                                    <div className="flex items-center space-x-1 text-purple-600">
                                      <Activity className="w-3 h-3" />
                                      <span>
                                        {servicio.examenes.length} Examen
                                        {servicio.examenes.length > 1
                                          ? "es"
                                          : ""}
                                      </span>
                                    </div>
                                  )}
                              </div>
                              <div className="text-vet-gray-500">
                                Registro #{servicio.id}
                              </div>
                            </div>
                          </div>
                        </div>

                        {servicio.notas && (
                          <div className="mt-4 p-4 bg-vet-primary/5 rounded-lg border border-vet-primary/20">
                            <h4 className="font-semibold text-vet-primary mb-2">
                              Notas del veterinario
                            </h4>
                            <p className="text-vet-gray-700">
                              {servicio.notas}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              {/* Cirugía Tab */}
              <TabsContent value="cirugia" className="space-y-4">
                {historialMascota.cirugia.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Pill className="w-16 h-16 text-vet-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-vet-gray-900 mb-2">
                        Sin servicios de cirugía registrados
                      </h3>
                      <p className="text-vet-gray-600 mb-6">
                        {selectedMascota} no tiene servicios de cirugía en su
                        historial.
                      </p>
                      <Button
                        onClick={() => (window.location.href = "/mis-citas")}
                        className="bg-vet-primary hover:bg-vet-primary-dark"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Agendar Cirugía
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  historialMascota.cirugia.map((servicio) => (
                    <Card key={servicio.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="flex items-center space-x-2">
                              <Pill className="w-5 h-5 text-purple-600" />
                              <span>{servicio.tipoConsulta}</span>
                            </CardTitle>
                            <CardDescription>
                              {formatDateSafe(servicio.fecha)} •{" "}
                              {servicio.veterinario}
                            </CardDescription>
                          </div>
                          <Badge className="bg-purple-100 text-purple-800">
                            S/{servicio.precio}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <span className="font-medium text-vet-gray-700">
                              Motivo:
                            </span>
                            <p className="text-vet-gray-600">
                              {servicio.motivo}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium text-vet-gray-700">
                              Diagnóstico:
                            </span>
                            <p className="text-vet-gray-600">
                              {servicio.diagnostico}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium text-vet-gray-700">
                              Tratamiento:
                            </span>
                            <p className="text-vet-gray-600">
                              {servicio.tratamiento}
                            </p>
                          </div>

                          {/* Signos vitales */}
                          {(servicio.peso ||
                            servicio.temperatura ||
                            servicio.presionArterial ||
                            servicio.frecuenciaCardiaca) && (
                            <div>
                              <span className="font-medium text-vet-gray-700 mb-2 block">
                                Signos Vitales:
                              </span>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                {servicio.peso && (
                                  <div className="bg-vet-gray-50 rounded-lg p-2">
                                    <span className="font-medium">Peso:</span>{" "}
                                    {servicio.peso} kg
                                  </div>
                                )}
                                {servicio.temperatura && (
                                  <div className="bg-vet-gray-50 rounded-lg p-2">
                                    <span className="font-medium">Temp:</span>{" "}
                                    {servicio.temperatura}°C
                                  </div>
                                )}
                                {servicio.presionArterial && (
                                  <div className="bg-vet-gray-50 rounded-lg p-2">
                                    <span className="font-medium">P.A.:</span>{" "}
                                    {servicio.presionArterial}
                                  </div>
                                )}
                                {servicio.frecuenciaCardiaca && (
                                  <div className="bg-vet-gray-50 rounded-lg p-2">
                                    <span className="font-medium">F.C.:</span>{" "}
                                    {servicio.frecuenciaCardiaca} bpm
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Medicamentos */}
                          {servicio.medicamentos &&
                            servicio.medicamentos.length > 0 && (
                              <div>
                                <span className="font-medium text-vet-gray-700 mb-2 block">
                                  Medicamentos Recetados:
                                </span>
                                <div className="space-y-2">
                                  {servicio.medicamentos.map((med, index) => (
                                    <div
                                      key={index}
                                      className="border border-vet-gray-200 rounded-lg p-3"
                                    >
                                      <div className="text-sm">
                                        <div>
                                          <strong>Medicamento:</strong>{" "}
                                          {med.nombre}
                                        </div>
                                        <div>
                                          <strong>Dosis:</strong> {med.dosis}
                                        </div>
                                        {med.frecuencia && (
                                          <div>
                                            <strong>Frecuencia:</strong>{" "}
                                            {med.frecuencia}
                                          </div>
                                        )}
                                        {med.duracion && (
                                          <div>
                                            <strong>Duración:</strong>{" "}
                                            {med.duracion}
                                          </div>
                                        )}
                                        {med.indicaciones && (
                                          <div>
                                            <strong>Indicaciones:</strong>{" "}
                                            {med.indicaciones}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                          {/* Vacunas aplicadas */}
                          {servicio.vacunas && servicio.vacunas.length > 0 && (
                            <div>
                              <span className="font-medium text-vet-gray-700 mb-2 block">
                                Vacunas Aplicadas:
                              </span>
                              <div className="space-y-2">
                                {servicio.vacunas.map((vacuna, index) => (
                                  <div
                                    key={index}
                                    className="border border-vet-gray-200 rounded-lg p-3"
                                  >
                                    <div className="text-sm">
                                      <div>
                                        <strong>Vacuna:</strong> {vacuna.nombre}
                                      </div>
                                      <div>
                                        <strong>Lote:</strong> {vacuna.lote}
                                      </div>
                                      <div>
                                        <strong>Próxima Dosis:</strong>{" "}
                                        {new Date(
                                          vacuna.proximaFecha,
                                        ).toLocaleDateString("es-ES")}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Exámenes realizados */}
                          {servicio.examenes &&
                            servicio.examenes.length > 0 && (
                              <div>
                                <span className="font-medium text-vet-gray-700 mb-2 block">
                                  Exámenes Realizados:
                                </span>
                                <div className="space-y-2">
                                  {servicio.examenes.map((examen, index) => (
                                    <div
                                      key={index}
                                      className="bg-vet-gray-50 rounded-lg p-3"
                                    >
                                      <div className="text-sm">
                                        <strong>{examen.tipo}:</strong>{" "}
                                        {examen.resultado}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                          {/* Servicios adicionales */}
                          {servicio.servicios &&
                            servicio.servicios.length > 0 && (
                              <div>
                                <span className="font-medium text-vet-gray-700 mb-2 block">
                                  Servicios Realizados:
                                </span>
                                <div className="space-y-2">
                                  {servicio.servicios.map(
                                    (servicioItem, index) => (
                                      <div
                                        key={index}
                                        className="bg-vet-gray-50 rounded-lg p-3"
                                      >
                                        <div className="text-sm">
                                          <div>
                                            <strong>Servicio:</strong>{" "}
                                            {servicioItem.nombre}
                                          </div>
                                          {servicioItem.precio && (
                                            <div>
                                              <strong>Precio:</strong> S/
                                              {servicioItem.precio}
                                            </div>
                                          )}
                                          {servicioItem.descripcion && (
                                            <div>
                                              <strong>Descripción:</strong>{" "}
                                              {servicioItem.descripcion}
                                            </div>
                                          )}
                                          {servicioItem.duracion && (
                                            <div>
                                              <strong>Duración:</strong>{" "}
                                              {servicioItem.duracion}
                                            </div>
                                          )}
                                          {servicioItem.notas && (
                                            <div>
                                              <strong>Notas:</strong>{" "}
                                              {servicioItem.notas}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                            )}

                          {/* Archivos adjuntos */}
                          {servicio.archivosAdjuntos &&
                            servicio.archivosAdjuntos.length > 0 && (
                              <div>
                                <span className="font-medium text-vet-gray-700 mb-2 block">
                                  Archivos Adjuntos:
                                </span>
                                <div className="space-y-2">
                                  {servicio.archivosAdjuntos.map(
                                    (archivo, index) => (
                                      <div
                                        key={index}
                                        className="border border-vet-gray-200 rounded-lg p-3"
                                      >
                                        <div className="flex items-center justify-between text-sm">
                                          <div>
                                            <strong>{archivo.nombre}</strong>
                                            <span className="text-vet-gray-600 ml-2">
                                              ({archivo.tipo})
                                            </span>
                                          </div>
                                          <a
                                            href={archivo.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-vet-primary hover:underline"
                                          >
                                            <Download className="w-4 h-4 inline mr-1" />
                                            Descargar
                                          </a>
                                        </div>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                            )}
                        </div>

                        {/* Resumen completo del servicio realizado */}
                        <div className="mt-6 p-4 bg-gradient-to-r from-vet-primary/5 to-blue-50 rounded-lg border border-vet-primary/20">
                          <h5 className="font-medium text-vet-primary mb-3 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Resumen del Servicio Completado
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="space-y-2">
                                <div>
                                  <strong>Servicio:</strong>{" "}
                                  {servicio.tipoConsulta ||
                                    "Servicio Veterinario"}
                                </div>
                                <div>
                                  <strong>Duración:</strong> Aprox.{" "}
                                  {(() => {
                                    const servicesMap = {
                                      consulta: "30-45 min",
                                      vacunacion: "15-20 min",
                                      emergencia: "45-90 min",
                                      grooming: "60-120 min",
                                      cirugia: "90-180 min",
                                      diagnostico: "30-60 min",
                                    };
                                    const tipo =
                                      servicio.tipoConsulta?.toLowerCase() ||
                                      "consulta";
                                    return servicesMap[tipo] || "30-45 min";
                                  })()}
                                </div>
                                <div>
                                  <strong>Estado Final:</strong>
                                  <span className="ml-1 px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                    Servicio Completado Exitosamente
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="space-y-2">
                                <div>
                                  <strong>Fecha de Realización:</strong>{" "}
                                  {new Date(servicio.fecha).toLocaleDateString(
                                    "es-ES",
                                  )}
                                </div>
                                <div>
                                  <strong>Hora de Atención:</strong>{" "}
                                  {new Date(servicio.fecha).toLocaleTimeString(
                                    "es-ES",
                                    { hour: "2-digit", minute: "2-digit" },
                                  )}
                                </div>
                                {servicio.proxima_cita && (
                                  <div>
                                    <strong>Próximo Control:</strong>{" "}
                                    {new Date(
                                      servicio.proxima_cita,
                                    ).toLocaleDateString("es-ES")}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t border-vet-primary/10">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1 text-green-600">
                                  <CheckCircle className="w-3 h-3" />
                                  <span>Protocolo Completo</span>
                                </div>
                                {servicio.medicamentos &&
                                  servicio.medicamentos.length > 0 && (
                                    <div className="flex items-center space-x-1 text-blue-600">
                                      <Pill className="w-3 h-3" />
                                      <span>
                                        {servicio.medicamentos.length}{" "}
                                        Medicamento
                                        {servicio.medicamentos.length > 1
                                          ? "s"
                                          : ""}
                                      </span>
                                    </div>
                                  )}
                                {servicio.examenes &&
                                  servicio.examenes.length > 0 && (
                                    <div className="flex items-center space-x-1 text-purple-600">
                                      <Activity className="w-3 h-3" />
                                      <span>
                                        {servicio.examenes.length} Examen
                                        {servicio.examenes.length > 1
                                          ? "es"
                                          : ""}
                                      </span>
                                    </div>
                                  )}
                              </div>
                              <div className="text-vet-gray-500">
                                Registro #{servicio.id}
                              </div>
                            </div>
                          </div>
                        </div>

                        {servicio.notas && (
                          <div className="mt-4 p-4 bg-vet-primary/5 rounded-lg border border-vet-primary/20">
                            <h4 className="font-semibold text-vet-primary mb-2">
                              Notas del veterinario
                            </h4>
                            <p className="text-vet-gray-700">
                              {servicio.notas}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              {/* Diagnóstico Tab */}
              <TabsContent value="diagnostico" className="space-y-4">
                {historialMascota.diagnostico.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <FileText className="w-16 h-16 text-vet-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-vet-gray-900 mb-2">
                        Sin servicios de diagnóstico registrados
                      </h3>
                      <p className="text-vet-gray-600 mb-6">
                        {selectedMascota} no tiene servicios de diagnóstico en
                        su historial.
                      </p>
                      <Button
                        onClick={() => (window.location.href = "/mis-citas")}
                        className="bg-vet-primary hover:bg-vet-primary-dark"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Agendar Diagnóstico
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  historialMascota.diagnostico.map((servicio) => (
                    <Card key={servicio.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="flex items-center space-x-2">
                              <FileText className="w-5 h-5 text-blue-600" />
                              <span>{servicio.tipoConsulta}</span>
                            </CardTitle>
                            <CardDescription>
                              {formatDateSafe(servicio.fecha)} •{" "}
                              {servicio.veterinario}
                            </CardDescription>
                          </div>
                          <Badge className="bg-gray-100 text-gray-800">
                            S/{servicio.precio}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <span className="font-medium text-vet-gray-700">
                              Motivo:
                            </span>
                            <p className="text-vet-gray-600">
                              {servicio.motivo}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium text-vet-gray-700">
                              Diagnóstico:
                            </span>
                            <p className="text-vet-gray-600">
                              {servicio.diagnostico}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium text-vet-gray-700">
                              Tratamiento:
                            </span>
                            <p className="text-vet-gray-600">
                              {servicio.tratamiento}
                            </p>
                          </div>

                          {/* Signos vitales */}
                          {(servicio.peso ||
                            servicio.temperatura ||
                            servicio.presionArterial ||
                            servicio.frecuenciaCardiaca) && (
                            <div>
                              <span className="font-medium text-vet-gray-700 mb-2 block">
                                Signos Vitales:
                              </span>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                {servicio.peso && (
                                  <div className="bg-vet-gray-50 rounded-lg p-2">
                                    <span className="font-medium">Peso:</span>{" "}
                                    {servicio.peso} kg
                                  </div>
                                )}
                                {servicio.temperatura && (
                                  <div className="bg-vet-gray-50 rounded-lg p-2">
                                    <span className="font-medium">Temp:</span>{" "}
                                    {servicio.temperatura}°C
                                  </div>
                                )}
                                {servicio.presionArterial && (
                                  <div className="bg-vet-gray-50 rounded-lg p-2">
                                    <span className="font-medium">P.A.:</span>{" "}
                                    {servicio.presionArterial}
                                  </div>
                                )}
                                {servicio.frecuenciaCardiaca && (
                                  <div className="bg-vet-gray-50 rounded-lg p-2">
                                    <span className="font-medium">F.C.:</span>{" "}
                                    {servicio.frecuenciaCardiaca} bpm
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Medicamentos */}
                          {servicio.medicamentos &&
                            servicio.medicamentos.length > 0 && (
                              <div>
                                <span className="font-medium text-vet-gray-700 mb-2 block">
                                  Medicamentos Recetados:
                                </span>
                                <div className="space-y-2">
                                  {servicio.medicamentos.map((med, index) => (
                                    <div
                                      key={index}
                                      className="border border-vet-gray-200 rounded-lg p-3"
                                    >
                                      <div className="text-sm">
                                        <div>
                                          <strong>Medicamento:</strong>{" "}
                                          {med.nombre}
                                        </div>
                                        <div>
                                          <strong>Dosis:</strong> {med.dosis}
                                        </div>
                                        {med.frecuencia && (
                                          <div>
                                            <strong>Frecuencia:</strong>{" "}
                                            {med.frecuencia}
                                          </div>
                                        )}
                                        {med.duracion && (
                                          <div>
                                            <strong>Duración:</strong>{" "}
                                            {med.duracion}
                                          </div>
                                        )}
                                        {med.indicaciones && (
                                          <div>
                                            <strong>Indicaciones:</strong>{" "}
                                            {med.indicaciones}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                          {/* Vacunas aplicadas */}
                          {servicio.vacunas && servicio.vacunas.length > 0 && (
                            <div>
                              <span className="font-medium text-vet-gray-700 mb-2 block">
                                Vacunas Aplicadas:
                              </span>
                              <div className="space-y-2">
                                {servicio.vacunas.map((vacuna, index) => (
                                  <div
                                    key={index}
                                    className="border border-vet-gray-200 rounded-lg p-3"
                                  >
                                    <div className="text-sm">
                                      <div>
                                        <strong>Vacuna:</strong> {vacuna.nombre}
                                      </div>
                                      <div>
                                        <strong>Lote:</strong> {vacuna.lote}
                                      </div>
                                      <div>
                                        <strong>Próxima Dosis:</strong>{" "}
                                        {new Date(
                                          vacuna.proximaFecha,
                                        ).toLocaleDateString("es-ES")}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Exámenes realizados */}
                          {servicio.examenes &&
                            servicio.examenes.length > 0 && (
                              <div>
                                <span className="font-medium text-vet-gray-700 mb-2 block">
                                  Exámenes Realizados:
                                </span>
                                <div className="space-y-2">
                                  {servicio.examenes.map((examen, index) => (
                                    <div
                                      key={index}
                                      className="bg-vet-gray-50 rounded-lg p-3"
                                    >
                                      <div className="text-sm">
                                        <strong>{examen.tipo}:</strong>{" "}
                                        {examen.resultado}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                          {/* Servicios adicionales */}
                          {servicio.servicios &&
                            servicio.servicios.length > 0 && (
                              <div>
                                <span className="font-medium text-vet-gray-700 mb-2 block">
                                  Servicios Realizados:
                                </span>
                                <div className="space-y-2">
                                  {servicio.servicios.map(
                                    (servicioItem, index) => (
                                      <div
                                        key={index}
                                        className="bg-vet-gray-50 rounded-lg p-3"
                                      >
                                        <div className="text-sm">
                                          <div>
                                            <strong>Servicio:</strong>{" "}
                                            {servicioItem.nombre}
                                          </div>
                                          {servicioItem.precio && (
                                            <div>
                                              <strong>Precio:</strong> S/
                                              {servicioItem.precio}
                                            </div>
                                          )}
                                          {servicioItem.descripcion && (
                                            <div>
                                              <strong>Descripción:</strong>{" "}
                                              {servicioItem.descripcion}
                                            </div>
                                          )}
                                          {servicioItem.duracion && (
                                            <div>
                                              <strong>Duración:</strong>{" "}
                                              {servicioItem.duracion}
                                            </div>
                                          )}
                                          {servicioItem.notas && (
                                            <div>
                                              <strong>Notas:</strong>{" "}
                                              {servicioItem.notas}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                            )}

                          {/* Archivos adjuntos */}
                          {servicio.archivosAdjuntos &&
                            servicio.archivosAdjuntos.length > 0 && (
                              <div>
                                <span className="font-medium text-vet-gray-700 mb-2 block">
                                  Archivos Adjuntos:
                                </span>
                                <div className="space-y-2">
                                  {servicio.archivosAdjuntos.map(
                                    (archivo, index) => (
                                      <div
                                        key={index}
                                        className="border border-vet-gray-200 rounded-lg p-3"
                                      >
                                        <div className="flex items-center justify-between text-sm">
                                          <div>
                                            <strong>{archivo.nombre}</strong>
                                            <span className="text-vet-gray-600 ml-2">
                                              ({archivo.tipo})
                                            </span>
                                          </div>
                                          <a
                                            href={archivo.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-vet-primary hover:underline"
                                          >
                                            <Download className="w-4 h-4 inline mr-1" />
                                            Descargar
                                          </a>
                                        </div>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                            )}
                        </div>

                        {/* Resumen completo del servicio realizado */}
                        <div className="mt-6 p-4 bg-gradient-to-r from-vet-primary/5 to-blue-50 rounded-lg border border-vet-primary/20">
                          <h5 className="font-medium text-vet-primary mb-3 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Resumen del Servicio Completado
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="space-y-2">
                                <div>
                                  <strong>Servicio:</strong>{" "}
                                  {servicio.tipoConsulta ||
                                    "Servicio Veterinario"}
                                </div>
                                <div>
                                  <strong>Duración:</strong> Aprox.{" "}
                                  {(() => {
                                    const servicesMap = {
                                      consulta: "30-45 min",
                                      vacunacion: "15-20 min",
                                      emergencia: "45-90 min",
                                      grooming: "60-120 min",
                                      cirugia: "90-180 min",
                                      diagnostico: "30-60 min",
                                    };
                                    const tipo =
                                      servicio.tipoConsulta?.toLowerCase() ||
                                      "consulta";
                                    return servicesMap[tipo] || "30-45 min";
                                  })()}
                                </div>
                                <div>
                                  <strong>Estado Final:</strong>
                                  <span className="ml-1 px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                    Servicio Completado Exitosamente
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="space-y-2">
                                <div>
                                  <strong>Fecha de Realización:</strong>{" "}
                                  {new Date(servicio.fecha).toLocaleDateString(
                                    "es-ES",
                                  )}
                                </div>
                                <div>
                                  <strong>Hora de Atención:</strong>{" "}
                                  {new Date(servicio.fecha).toLocaleTimeString(
                                    "es-ES",
                                    { hour: "2-digit", minute: "2-digit" },
                                  )}
                                </div>
                                {servicio.proxima_cita && (
                                  <div>
                                    <strong>Próximo Control:</strong>{" "}
                                    {new Date(
                                      servicio.proxima_cita,
                                    ).toLocaleDateString("es-ES")}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t border-vet-primary/10">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1 text-green-600">
                                  <CheckCircle className="w-3 h-3" />
                                  <span>Protocolo Completo</span>
                                </div>
                                {servicio.medicamentos &&
                                  servicio.medicamentos.length > 0 && (
                                    <div className="flex items-center space-x-1 text-blue-600">
                                      <Pill className="w-3 h-3" />
                                      <span>
                                        {servicio.medicamentos.length}{" "}
                                        Medicamento
                                        {servicio.medicamentos.length > 1
                                          ? "s"
                                          : ""}
                                      </span>
                                    </div>
                                  )}
                                {servicio.examenes &&
                                  servicio.examenes.length > 0 && (
                                    <div className="flex items-center space-x-1 text-purple-600">
                                      <Activity className="w-3 h-3" />
                                      <span>
                                        {servicio.examenes.length} Examen
                                        {servicio.examenes.length > 1
                                          ? "es"
                                          : ""}
                                      </span>
                                    </div>
                                  )}
                              </div>
                              <div className="text-vet-gray-500">
                                Registro #{servicio.id}
                              </div>
                            </div>
                          </div>
                        </div>

                        {servicio.notas && (
                          <div className="mt-4 p-4 bg-vet-primary/5 rounded-lg border border-vet-primary/20">
                            <h4 className="font-semibold text-vet-primary mb-2">
                              Notas del veterinario
                            </h4>
                            <p className="text-vet-gray-700">
                              {servicio.notas}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </Layout>
  );
}
