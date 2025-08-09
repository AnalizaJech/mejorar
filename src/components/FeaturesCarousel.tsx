import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  Shield,
  Clock,
  Stethoscope,
  Heart,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Smartphone,
  FileText,
  Zap,
  Award,
  HeartHandshake,
  Clock3,
  Bell,
  Timer,
  Globe,
  Database,
  RefreshCw,
  BookOpen,
  AlertTriangle,
  UserPlus,
  TrendingUp,
  GraduationCap,
  ShieldCheck,
  Scissors,
  Microscope,
  PawPrint,
} from "lucide-react";

const features = [
  {
    id: 1,
    icon: Smartphone,
    title: "Citas Inteligentes",
    description:
      "Sistema automatizado que agenda tu cita en menos de 2 minutos con confirmación instantánea.",
    highlights: [
      { text: "Disponible 24/7", icon: Clock3 },
      { text: "Recordatorios automáticos", icon: Bell },
      { text: "Sin esperas", icon: Timer },
    ],
    color: "vet-primary",
    bgColor: "vet-primary/10",
  },
  {
    id: 2,
    icon: FileText,
    title: "Historial Digital Completo",
    description:
      "Acceso inmediato a todo el historial médico de tu mascota desde cualquier dispositivo.",
    highlights: [
      { text: "Acceso 24/7", icon: Globe },
      { text: "Información completa", icon: Database },
      { text: "Siempre actualizado", icon: RefreshCw },
    ],
    color: "vet-secondary",
    bgColor: "vet-secondary/10",
  },
  {
    id: 3,
    icon: Zap,
    title: "Atención Sin Esperas",
    description:
      "Consultas puntuales de 30 minutos con emergencias atendidas las 24 horas del día.",
    highlights: [
      { text: "30 min consultas", icon: Clock },
      { text: "Emergencias 24h", icon: AlertTriangle },
      { text: "Seguimiento post-consulta", icon: UserPlus },
    ],
    color: "green-600",
    bgColor: "green-100",
  },
  {
    id: 4,
    icon: Award,
    title: "Veterinarios Certificados",
    description:
      "Equipo especializado con más de 10 años de experiencia en diferentes áreas médicas.",
    highlights: [
      { text: "10+ años experiencia", icon: TrendingUp },
      { text: "Especializaciones", icon: GraduationCap },
      { text: "Certificaciones", icon: ShieldCheck },
    ],
    color: "blue-600",
    bgColor: "blue-100",
  },
  {
    id: 5,
    icon: HeartHandshake,
    title: "Cuidado Integral",
    description:
      "Desde medicina preventiva hasta cirugías especializadas para todas las especies.",
    highlights: [
      { text: "Medicina preventiva", icon: Shield },
      { text: "Cirugías avanzadas", icon: Scissors },
      { text: "Todas las especies", icon: PawPrint },
    ],
    color: "purple-600",
    bgColor: "purple-100",
  },
];

export default function FeaturesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isManualNavigation, setIsManualNavigation] = useState(false);

  // Auto-play functionality - ultra smooth
  useEffect(() => {
    if (isDragging || isManualNavigation) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 4500); // Optimized timing for smooth flow

    return () => clearInterval(interval);
  }, [isDragging, isManualNavigation]);

  // Reset manual navigation after a delay
  useEffect(() => {
    if (isManualNavigation) {
      const timeout = setTimeout(() => {
        setIsManualNavigation(false);
      }, 6000); // Resume autoplay after 6 seconds

      return () => clearTimeout(timeout);
    }
  }, [isManualNavigation]);

  const goToSlide = (index: number) => {
    // Ensure index is valid
    const validIndex = Math.max(0, Math.min(index, features.length - 1));
    setIsDragging(false); // Stop any dragging state
    setIsManualNavigation(true); // Pause autoplay temporarily
    setCurrentIndex(validIndex);
  };

  // Touch and drag handlers
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    setCurrentX(clientX);
  };

  const handleEnd = () => {
    if (!isDragging) return;

    const diff = startX - currentX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left - next slide
        setCurrentIndex((prev) => (prev + 1) % features.length);
      } else {
        // Swipe right - previous slide
        setCurrentIndex(
          (prev) => (prev - 1 + features.length) % features.length,
        );
      }
    }

    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Get visible features (current + 2 next)
  const getVisibleFeatures = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % features.length;
      visible.push({ ...features[index], position: i });
    }
    return visible;
  };

  const visibleFeatures = getVisibleFeatures();

  return (
    <section
      id="caracteristicas"
      className="pt-24 pb-32 bg-vet-gray-50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-vet-primary/10 rounded-full mb-6">
            <Stethoscope className="w-4 h-4 text-vet-primary mr-2" />
            <span className="text-vet-primary font-semibold text-sm">
              CARACTERÍSTICAS ÚNICAS
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-vet-gray-900 mb-6">
            ¿Por qué elegir
            <span className="text-vet-primary block lg:inline lg:ml-3">
              PetLA?
            </span>
          </h2>
          <p className="text-xl text-vet-gray-600 max-w-3xl mx-auto leading-relaxed">
            Combinamos experiencia veterinaria, tecnología moderna y amor
            genuino por los animales para brindar el mejor cuidado a tus
            mascotas.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative px-4 sm:px-6 md:px-0">
          {/* Main Carousel */}
          <div
            className={`flex items-center justify-center gap-4 md:gap-8 mb-12 cursor-grab ${isDragging ? "cursor-grabbing" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {visibleFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const isCenter = index === 1;

              return (
                <Card
                  key={`${feature.id}-${feature.position}`}
                  className={`transition-all duration-1000 ease-in-out select-none w-full max-w-sm mx-auto ${
                    isCenter
                      ? "scale-110 shadow-2xl z-10 bg-white border-vet-primary/20"
                      : "scale-95 opacity-70 hover:opacity-90"
                  } ${index === 0 ? "hidden md:block" : ""} ${index === 2 ? "hidden md:block" : ""}`}
                >
                  <div className="p-6 sm:p-8 text-center">
                    <div
                      className={`mx-auto flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-all duration-1000 ease-in-out ${
                        isCenter
                          ? feature.color === "vet-primary"
                            ? "bg-vet-primary scale-110"
                            : feature.color === "vet-secondary"
                              ? "bg-vet-secondary scale-110"
                              : feature.color === "green-600"
                                ? "bg-green-600 scale-110"
                                : feature.color === "blue-600"
                                  ? "bg-blue-600 scale-110"
                                  : "bg-purple-600 scale-110"
                          : feature.bgColor === "vet-primary/10"
                            ? "bg-vet-primary/10 scale-100"
                            : feature.bgColor === "vet-secondary/10"
                              ? "bg-vet-secondary/10 scale-100"
                              : feature.bgColor === "green-100"
                                ? "bg-green-100 scale-100"
                                : feature.bgColor === "blue-100"
                                  ? "bg-blue-100 scale-100"
                                  : "bg-purple-100 scale-100"
                      }`}
                    >
                      <Icon
                        className={`w-8 h-8 transition-all duration-1000 ease-in-out ${
                          isCenter
                            ? "text-white scale-110"
                            : feature.color === "vet-primary"
                              ? "text-vet-primary scale-100"
                              : feature.color === "vet-secondary"
                                ? "text-vet-secondary scale-100"
                                : feature.color === "green-600"
                                  ? "text-green-600 scale-100"
                                  : feature.color === "blue-600"
                                    ? "text-blue-600 scale-100"
                                    : "text-purple-600 scale-100"
                        }`}
                      />
                    </div>

                    <h3 className="text-xl font-bold text-vet-gray-900 mb-4">
                      {feature.title}
                    </h3>

                    <p className="text-vet-gray-600 leading-relaxed mb-6">
                      {feature.description}
                    </p>

                    {isCenter && (
                      <div className="space-y-2 animate-fade-in">
                        {feature.highlights.map((highlight, i) => {
                          const HighlightIcon = highlight.icon;
                          return (
                            <div
                              key={i}
                              className="flex items-center justify-center space-x-2 text-sm text-vet-gray-700"
                            >
                              <HighlightIcon className="w-4 h-4 text-vet-primary" />
                              <span>{highlight.text}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Dots Indicator - Outside touch area */}
          <div className="flex items-center justify-center space-x-3 mb-8 relative z-20">
            {features.map((_, index) => (
              <button
                key={index}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  goToSlide(index);
                }}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  goToSlide(index);
                }}
                className={`w-4 h-4 rounded-full transition-all duration-300 touch-manipulation ${
                  index === currentIndex
                    ? "bg-vet-primary scale-125"
                    : "bg-vet-gray-300 hover:bg-vet-primary/50"
                }`}
                style={{ WebkitTapHighlightColor: "transparent" }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-20 h-20 bg-vet-primary/5 rounded-full animate-float"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-vet-secondary/5 rounded-full animate-float delay-1000"></div>
    </section>
  );
}
