# 🩺 PetLA - Sistema Integral de Gestión Veterinaria

<div align="center">
  <img src="https://img.shields.io/badge/Status-Production%20Ready-brightgreen" alt="Status">
  <img src="https://img.shields.io/badge/Architecture-Fullstack-blue" alt="Architecture">
  <img src="https://img.shields.io/badge/Frontend-React%2018%20%2B%20TypeScript-61dafb" alt="Frontend">
  <img src="https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933" alt="Backend">
  <img src="https://img.shields.io/badge/Database-PostgreSQL-336791" alt="Database">
  <img src="https://img.shields.io/badge/Auth-JWT%20%2B%20RBAC-ff6b6b" alt="Auth">
</div>

---

## 📋 Tabla de Contenidos

1. [🌟 Visión General del Sistema](#-visión-general-del-sistema)
2. [🏗️ Arquitectura Fullstack](#️-arquitectura-fullstack)
3. [🔗 API Backend Completa](#-api-backend-completa)
4. [🗄️ Base de Datos](#️-base-de-datos)
5. [⚛️ Frontend React](#️-frontend-react)
6. [🔐 Autenticación y Autorización](#-autenticación-y-autorización)
7. [📱 Casos de Uso del Sistema](#-casos-de-uso-del-sistema)
8. [🚀 Configuración y Deploy](#-configuración-y-deploy)
9. [🧪 Testing y Calidad](#-testing-y-calidad)
10. [📊 Monitoreo y Performance](#-monitoreo-y-performance)

---

## 🌟 Visión General del Sistema

**PetLA** es una plataforma web fullstack que digitaliza completamente la gestión de clínicas veterinarias, integrando propietarios de mascotas, veterinarios y administradores en un ecosistema digital cohesivo y escalable.

### 🎯 Propósito y Valor de Negocio

- **Digitalización Completa**: Elimina procesos manuales y paperwork
- **Eficiencia Operativa**: Reduce tiempos de gestión en 70%
- **Experiencia del Cliente**: Agendamiento autónomo y seguimiento en tiempo real
- **Gestión Profesional**: Herramientas especializadas para veterinarios
- **Control Administrativo**: Dashboard completo para administradores

### 👥 Roles del Sistema

| Rol | Funcionalidades Principales | Acceso |
|-----|----------------------------|--------|
| **Cliente** | Gestión mascotas, agendamiento citas, historial médico | App web + móvil |
| **Veterinario** | Agenda médica, consultas, historial clínico | App web especializada |
| **Administrador** | Gestión usuarios, validación pagos, configuración | Panel administrativo |

---

## 🏗️ Arquitectura Fullstack

### 📐 Arquitectura General

```mermaid
graph TB
    subgraph "Cliente (Browser/Mobile)"
        A[React 18 + TypeScript]
        B[TailwindCSS + Radix UI]
        C[React Query + Zustand]
    end
    
    subgraph "Load Balancer"
        D[Nginx / Cloudflare]
    end
    
    subgraph "Backend Services"
        E[Node.js + Express/Fastify]
        F[JWT Authentication]
        G[RBAC Authorization]
        H[File Upload Service]
        I[WebSocket Service]
        J[Email Service]
    end
    
    subgraph "Data Layer"
        K[(PostgreSQL 15+)]
        L[(Redis Cache)]
        M[AWS S3/MinIO]
        N[ElasticSearch]
    end
    
    subgraph "External Services"
        O[SendGrid/SES]
        P[WhatsApp API]
        Q[SMS Gateway]
        R[Payment Gateway]
    end
    
    A --> D
    D --> E
    E --> K
    E --> L
    E --> M
    E --> N
    E --> O
    E --> P
    E --> Q
    E --> R
    
    style A fill:#61dafb
    style E fill:#339933
    style K fill:#336791
    style L fill:#dc382d
```

### 🎨 Frontend Architecture

```
src/
├── app/                          # App configuration
│   ├── providers/               # Context providers (Auth, Theme, etc.)
│   ├── store/                   # Zustand stores
│   └── router/                  # React Router configuration
├── features/                    # Feature-based modules
│   ├── auth/                   # Authentication
│   │   ├── components/         # Login, Register, ForgotPassword
│   │   ├── hooks/             # useAuth, useLogin
│   │   ├── services/          # authApi
│   │   └── types/             # Auth types
│   ├── appointments/          # Citas médicas
│   │   ├── components/        # CitaForm, CitaList, CitaDetail
│   │   ├── hooks/            # useCitas, useCreateCita
│   │   ├── services/         # citasApi
│   │   └── types/            # Cita types
│   ├── pets/                 # Gestión mascotas
│   ├── users/                # Gestión usuarios
│   ├── veterinary/           # Funciones veterinarias
│   └── admin/                # Panel administrativo
├── shared/                    # Código compartido
│   ├── components/           # Componentes reutilizables
│   │   ├── ui/              # Design system components
│   │   ├── forms/           # Form components
│   │   ├── tables/          # Table components
│   │   └── charts/          # Chart components
│   ├── hooks/               # Custom hooks globales
│   ├── utils/               # Utilidades
│   ├── constants/           # Constantes
│   └── types/               # Tipos globales
└── assets/                   # Recursos estáticos
```

### 🔧 Backend Architecture

```
backend/
├── src/
│   ├── controllers/          # Route handlers
│   │   ├── auth.controller.js
│   │   ├── users.controller.js
│   │   ├── pets.controller.js
│   │   ├── appointments.controller.js
│   │   └── admin.controller.js
│   ├── services/             # Business logic
│   │   ├── auth.service.js
│   │   ├── users.service.js
│   │   ├── appointments.service.js
│   │   ├── notifications.service.js
│   │   ├── upload.service.js
│   │   └── email.service.js
│   ├── repositories/         # Data access layer
│   │   ├── users.repository.js
│   │   ├── pets.repository.js
│   │   └── appointments.repository.js
│   ├── middleware/           # Express middleware
│   │   ├── auth.middleware.js
│   │   ├── rbac.middleware.js
│   │   ├── validation.middleware.js
│   │   ├── rateLimiting.middleware.js
│   │   └── logging.middleware.js
│   ├── models/              # Database models (Sequelize/Prisma)
│   ├── routes/              # Route definitions
│   ├── validators/          # Input validation schemas
│   ├── utils/               # Utility functions
│   ├── config/              # Configuration
│   └── database/            # Migrations, seeds
├── tests/                   # Test suites
├── docs/                    # API documentation
└── docker/                  # Docker configuration
```

---

## 🔗 API Backend Completa

### 🚀 Stack Tecnológico Backend

```typescript
// package.json dependencies
{
  "dependencies": {
    "express": "^4.18.2",          // Web framework
    "cors": "^2.8.5",              // CORS handling
    "helmet": "^7.0.0",            // Security headers
    "compression": "^1.7.4",       // Response compression
    
    // Database & ORM
    "pg": "^8.11.0",               // PostgreSQL driver
    "sequelize": "^6.32.1",        // ORM
    "redis": "^4.6.7",             // Caching
    
    // Authentication & Security
    "jsonwebtoken": "^9.0.1",      // JWT tokens
    "bcryptjs": "^2.4.3",          // Password hashing
    "express-rate-limit": "^6.8.1", // Rate limiting
    "express-validator": "^7.0.1",  // Input validation
    
    // File handling
    "multer": "^1.4.5",            // File upload
    "sharp": "^0.32.1",            // Image processing
    "aws-sdk": "^2.1415.0",        // AWS S3
    
    // Communication
    "nodemailer": "^6.9.3",        // Email service
    "twilio": "^4.14.0",           // SMS service
    
    // Monitoring & Logging
    "winston": "^3.9.0",           // Logging
    "express-prometheus-middleware": "^1.2.0", // Metrics
    
    // Utilities
    "dayjs": "^1.11.9",            // Date handling
    "lodash": "^4.17.21",          // Utilities
    "uuid": "^9.0.0",              // UUID generation
    "zod": "^3.21.4"               // Schema validation
  }
}
```

### 📡 Endpoints de la API

#### 🔐 Authentication & Authorization

```typescript
// Auth endpoints
POST   /api/v1/auth/register                    // Registro de usuarios
POST   /api/v1/auth/login                       // Inicio de sesión
POST   /api/v1/auth/refresh                     // Renovar token
POST   /api/v1/auth/logout                      // Cerrar sesión
POST   /api/v1/auth/forgot-password             // Recuperar contraseña
POST   /api/v1/auth/reset-password              // Resetear contraseña
GET    /api/v1/auth/me                          // Obtener usuario actual
PUT    /api/v1/auth/change-password             // Cambiar contraseña

// Request/Response examples
interface LoginRequest {
  identifier: string;      // email, username, or phone
  password: string;
}

interface LoginResponse {
  success: boolean;
  data: {
    user: User;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}
```

#### 👥 User Management

```typescript
// User endpoints
GET    /api/v1/users                            // Listar usuarios (admin)
GET    /api/v1/users/:id                        // Obtener usuario específico
POST   /api/v1/users                            // Crear usuario (admin)
PUT    /api/v1/users/:id                        // Actualizar usuario
DELETE /api/v1/users/:id                        // Eliminar usuario (admin)
POST   /api/v1/users/:id/avatar                 // Subir avatar
GET    /api/v1/users/profile                    // Perfil del usuario actual
PUT    /api/v1/users/profile                    // Actualizar perfil

// Query parameters for GET /users
interface UserQueryParams {
  page?: number;
  limit?: number;
  role?: 'cliente' | 'veterinario' | 'admin';
  search?: string;
  status?: 'active' | 'inactive';
  createdFrom?: string;
  createdTo?: string;
}
```

#### 🐕 Pet Management

```typescript
// Pet endpoints
GET    /api/v1/pets                             // Listar mascotas del usuario
GET    /api/v1/pets/:id                         // Obtener mascota específica
POST   /api/v1/pets                             // Crear nueva mascota
PUT    /api/v1/pets/:id                         // Actualizar mascota
DELETE /api/v1/pets/:id                         // Eliminar mascota
POST   /api/v1/pets/:id/photo                   // Subir foto de mascota
GET    /api/v1/pets/search                      // Búsqueda avanzada (vet/admin)

// Pet creation request
interface CreatePetRequest {
  nombre: string;
  especie: string;
  raza: string;
  sexo?: 'macho' | 'hembra';
  fechaNacimiento: string;      // ISO date
  peso?: number;
  microchip?: string;
  descripcion?: string;
  alergias?: string[];
  condicionesMedicas?: string[];
}
```

#### 📅 Appointment Management

```typescript
// Appointment endpoints
GET    /api/v1/appointments                     // Listar citas según rol
GET    /api/v1/appointments/:id                 // Obtener cita específica
POST   /api/v1/appointments                     // Crear nueva cita
PUT    /api/v1/appointments/:id                 // Actualizar cita
DELETE /api/v1/appointments/:id                 // Cancelar cita
PUT    /api/v1/appointments/:id/status          // Cambiar estado (admin/vet)
POST   /api/v1/appointments/:id/payment-proof   // Subir comprobante pago
PUT    /api/v1/appointments/:id/validate-payment // Validar pago (admin)
POST   /api/v1/appointments/:id/attend          // Atender cita (vet)

// Appointment states flow
enum AppointmentStatus {
  PENDING_PAYMENT = 'pendiente_pago',
  PAYMENT_VALIDATION = 'en_validacion',
  CONFIRMED = 'aceptada',
  ATTENDED = 'atendida',
  CANCELLED = 'cancelada',
  EXPIRED = 'expirada',
  REJECTED = 'rechazada',
  NO_SHOW = 'no_asistio'
}

// Query filters
interface AppointmentFilters {
  status?: AppointmentStatus[];
  veterinarianId?: string;
  clientId?: string;
  petId?: string;
  dateFrom?: string;
  dateTo?: string;
  consultationType?: string[];
  page?: number;
  limit?: number;
}
```

#### 🏥 Medical History

```typescript
// Medical history endpoints
GET    /api/v1/medical-history/pet/:petId       // Historial de una mascota
GET    /api/v1/medical-history/:id              // Consulta específica
POST   /api/v1/medical-history                  // Crear consulta médica
PUT    /api/v1/medical-history/:id              // Actualizar consulta
GET    /api/v1/medical-history/pet/:petId/export // Exportar historial (PDF/Excel)
GET    /api/v1/medical-history/veterinarian/stats // Estadísticas veterinario

// Medical consultation record
interface MedicalConsultation {
  id: string;
  appointmentId: string;
  petId: string;
  veterinarianId: string;
  consultationDate: string;
  
  // Vital signs
  weight?: number;
  temperature?: number;
  heartRate?: number;
  respiratoryRate?: number;
  bloodPressure?: string;
  
  // Clinical examination
  reason: string;
  symptoms: string[];
  physicalExam: string;
  diagnosis: string;
  secondaryDiagnosis?: string[];
  treatment: string;
  procedures?: string[];
  
  // Medications
  medications: Medication[];
  
  // Follow-up
  nextAppointment?: string;
  instructions: string;
  observations?: string;
  
  // Attachments
  attachments?: FileAttachment[];
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}
```

#### 🔔 Notifications System

```typescript
// Notification endpoints
GET    /api/v1/notifications                    // Obtener notificaciones
POST   /api/v1/notifications                    // Crear notificación (system)
PUT    /api/v1/notifications/:id/read           // Marcar como leída
PUT    /api/v1/notifications/mark-all-read      // Marcar todas como leídas
DELETE /api/v1/notifications/:id               // Eliminar notificación
GET    /api/v1/notifications/unread-count       // Contador no leídas

// WebSocket events for real-time notifications
interface WebSocketEvents {
  'notification:new': Notification;
  'appointment:status_changed': { appointmentId: string; newStatus: string };
  'payment:validated': { appointmentId: string; approved: boolean };
  'reminder:appointment': { appointmentId: string; timeUntil: number };
}
```

#### 📁 File Management

```typescript
// File upload endpoints
POST   /api/v1/upload/image                     // Subir imagen (avatar, pet photo)
POST   /api/v1/upload/document                  // Subir documento (comprobante)
DELETE /api/v1/upload/:fileId                   // Eliminar archivo
GET    /api/v1/upload/:fileId                   // Obtener archivo
POST   /api/v1/upload/bulk                      // Subida múltiple

// File processing
interface FileUploadResponse {
  success: boolean;
  data: {
    id: string;
    originalName: string;
    filename: string;
    url: string;
    size: number;
    mimetype: string;
    compressed?: boolean;
    thumbnails?: {
      small: string;
      medium: string;
      large: string;
    };
  };
}
```

#### 📊 Analytics & Reports

```typescript
// Analytics endpoints
GET    /api/v1/analytics/dashboard/:role        // Dashboard stats por rol
GET    /api/v1/analytics/appointments/trends    // Tendencias de citas
GET    /api/v1/analytics/revenue               // Análisis de ingresos
GET    /api/v1/analytics/pets/demographics     // Demografía de mascotas
GET    /api/v1/analytics/veterinarians/performance // Performance veterinarios

// Export endpoints
GET    /api/v1/exports/appointments            // Exportar citas
GET    /api/v1/exports/medical-history         // Exportar historiales
GET    /api/v1/exports/financial-report       // Reporte financiero
```

#### ⚙️ Admin Management

```typescript
// Admin-only endpoints
GET    /api/v1/admin/system-health             // Estado del sistema
GET    /api/v1/admin/users/pending             // Usuarios pendientes
PUT    /api/v1/admin/users/:id/activate        // Activar usuario
PUT    /api/v1/admin/users/:id/deactivate      // Desactivar usuario
GET    /api/v1/admin/settings                  // Configuración sistema
PUT    /api/v1/admin/settings                  // Actualizar configuración
GET    /api/v1/admin/audit-logs               // Logs de auditoría
POST   /api/v1/admin/backup                    // Crear backup
POST   /api/v1/admin/maintenance               // Modo mantenimiento
```

---

## 🗄️ Base de Datos

### 📊 Esquema PostgreSQL

```sql
-- Users table with role-based access
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    
    -- Personal information
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    date_of_birth DATE,
    gender VARCHAR(20),
    address TEXT,
    
    -- Document information
    document_number VARCHAR(50),
    document_type VARCHAR(30) CHECK (document_type IN ('dni', 'passport', 'foreigner_card', 'cedula')),
    
    -- Role and status
    role VARCHAR(20) NOT NULL CHECK (role IN ('cliente', 'veterinario', 'admin')),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    email_verified BOOLEAN DEFAULT FALSE,
    
    -- Professional information (for veterinarians)
    specialty VARCHAR(100),
    license_number VARCHAR(50),
    experience_years INTEGER,
    education TEXT,
    
    -- Metadata
    avatar_url VARCHAR(500),
    bio TEXT,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    
    -- Indexes
    CONSTRAINT users_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Pets table
CREATE TABLE pets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Basic information
    name VARCHAR(100) NOT NULL,
    species VARCHAR(50) NOT NULL,
    breed VARCHAR(100) NOT NULL,
    sex VARCHAR(20) CHECK (sex IN ('male', 'female', 'unknown')),
    date_of_birth DATE NOT NULL,
    
    -- Physical characteristics
    weight DECIMAL(5,2),
    color VARCHAR(100),
    microchip_number VARCHAR(50) UNIQUE,
    
    -- Health information
    health_status VARCHAR(50) DEFAULT 'healthy',
    allergies TEXT[],
    medical_conditions TEXT[],
    current_medications TEXT[],
    
    -- Metadata
    photo_url VARCHAR(500),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Calculated fields
    age_months INTEGER GENERATED ALWAYS AS (
        EXTRACT(YEAR FROM AGE(CURRENT_DATE, date_of_birth)) * 12 + 
        EXTRACT(MONTH FROM AGE(CURRENT_DATE, date_of_birth))
    ) STORED
);

-- Appointments table with comprehensive status tracking
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Relations
    pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    veterinarian_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Appointment details
    scheduled_date TIMESTAMP NOT NULL,
    consultation_type VARCHAR(50) NOT NULL,
    reason TEXT NOT NULL,
    location VARCHAR(100) DEFAULT 'Main Clinic',
    estimated_duration INTEGER DEFAULT 30, -- minutes
    
    -- Status and workflow
    status VARCHAR(20) NOT NULL DEFAULT 'pending_payment' 
        CHECK (status IN (
            'pending_payment', 'payment_validation', 'confirmed', 
            'attended', 'cancelled', 'expired', 'rejected', 'no_show'
        )),
    
    -- Payment information
    service_price DECIMAL(8,2) NOT NULL,
    payment_method VARCHAR(50),
    payment_proof_url VARCHAR(500),
    payment_validated_at TIMESTAMP,
    payment_validated_by UUID REFERENCES users(id),
    
    -- Notes and observations
    client_notes TEXT,
    admin_notes TEXT,
    veterinarian_notes TEXT,
    cancellation_reason TEXT,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    confirmed_at TIMESTAMP,
    attended_at TIMESTAMP,
    
    -- Constraints
    CONSTRAINT valid_scheduled_date CHECK (scheduled_date > CURRENT_TIMESTAMP),
    CONSTRAINT valid_veterinarian CHECK (
        (status IN ('confirmed', 'attended') AND veterinarian_id IS NOT NULL) OR
        (status NOT IN ('confirmed', 'attended'))
    )
);

-- Medical consultations (detailed medical history)
CREATE TABLE medical_consultations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
    pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    veterinarian_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Consultation metadata
    consultation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    consultation_type VARCHAR(50) NOT NULL,
    
    -- Vital signs
    weight DECIMAL(5,2),
    temperature DECIMAL(4,1),
    heart_rate INTEGER,
    respiratory_rate INTEGER,
    blood_pressure_systolic INTEGER,
    blood_pressure_diastolic INTEGER,
    
    -- Clinical examination
    chief_complaint TEXT NOT NULL,
    history_of_present_illness TEXT,
    physical_examination JSONB, -- Structured physical exam data
    
    -- Diagnosis and treatment
    primary_diagnosis TEXT NOT NULL,
    secondary_diagnoses TEXT[],
    differential_diagnoses TEXT[],
    
    treatment_plan TEXT NOT NULL,
    procedures_performed TEXT[],
    
    -- Follow-up
    next_appointment_recommended BOOLEAN DEFAULT FALSE,
    next_appointment_date DATE,
    home_care_instructions TEXT,
    diet_recommendations TEXT,
    exercise_recommendations TEXT,
    
    -- Additional notes
    veterinarian_observations TEXT,
    client_concerns TEXT,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Medications prescribed
CREATE TABLE prescribed_medications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    consultation_id UUID NOT NULL REFERENCES medical_consultations(id) ON DELETE CASCADE,
    
    -- Medication details
    medication_name VARCHAR(200) NOT NULL,
    active_ingredient VARCHAR(200),
    dosage VARCHAR(100) NOT NULL,
    frequency VARCHAR(100) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    quantity_prescribed INTEGER,
    
    -- Instructions
    administration_instructions TEXT,
    special_instructions TEXT,
    side_effects_warning TEXT,
    
    -- Metadata
    prescribed_date DATE DEFAULT CURRENT_DATE,
    start_date DATE DEFAULT CURRENT_DATE,
    end_date DATE
);

-- Notification system
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Notification content
    type VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    
    -- Related entity (polymorphic relation)
    related_entity_type VARCHAR(50), -- 'appointment', 'consultation', 'payment', etc.
    related_entity_id UUID,
    
    -- Status and priority
    is_read BOOLEAN DEFAULT FALSE,
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    
    -- Delivery channels
    email_sent BOOLEAN DEFAULT FALSE,
    sms_sent BOOLEAN DEFAULT FALSE,
    push_sent BOOLEAN DEFAULT FALSE,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP,
    expires_at TIMESTAMP
);

-- File attachments (images, documents, reports)
CREATE TABLE file_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- File information
    original_name VARCHAR(255) NOT NULL,
    filename VARCHAR(255) NOT NULL UNIQUE,
    file_path VARCHAR(500) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    
    -- Related entity (polymorphic)
    entity_type VARCHAR(50) NOT NULL, -- 'user', 'pet', 'appointment', 'consultation'
    entity_id UUID NOT NULL,
    attachment_type VARCHAR(50), -- 'avatar', 'photo', 'payment_proof', 'medical_report'
    
    -- Image-specific data
    image_width INTEGER,
    image_height INTEGER,
    thumbnail_url VARCHAR(500),
    
    -- Metadata
    uploaded_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Security
    is_public BOOLEAN DEFAULT FALSE,
    access_level VARCHAR(20) DEFAULT 'private' CHECK (access_level IN ('public', 'private', 'restricted'))
);

-- System configuration
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(100) NOT NULL,
    key VARCHAR(100) NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(category, key)
);

-- Audit log for security and compliance
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID,
    changes JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);

CREATE INDEX idx_pets_owner_id ON pets(owner_id);
CREATE INDEX idx_pets_species ON pets(species);
CREATE INDEX idx_pets_microchip ON pets(microchip_number);

CREATE INDEX idx_appointments_client_id ON appointments(client_id);
CREATE INDEX idx_appointments_vet_id ON appointments(veterinarian_id);
CREATE INDEX idx_appointments_pet_id ON appointments(pet_id);
CREATE INDEX idx_appointments_date ON appointments(scheduled_date);
CREATE INDEX idx_appointments_status ON appointments(status);

CREATE INDEX idx_consultations_pet_id ON medical_consultations(pet_id);
CREATE INDEX idx_consultations_vet_id ON medical_consultations(veterinarian_id);
CREATE INDEX idx_consultations_date ON medical_consultations(consultation_date);

CREATE INDEX idx_notifications_recipient ON notifications(recipient_id);
CREATE INDEX idx_notifications_unread ON notifications(recipient_id, is_read) WHERE is_read = FALSE;

CREATE INDEX idx_files_entity ON file_attachments(entity_type, entity_id);

-- Views for common queries
CREATE VIEW appointment_summary AS
SELECT 
    a.id,
    a.scheduled_date,
    a.status,
    a.consultation_type,
    a.service_price,
    p.name as pet_name,
    p.species,
    u.first_name || ' ' || u.last_name as client_name,
    u.email as client_email,
    u.phone as client_phone,
    v.first_name || ' ' || v.last_name as veterinarian_name
FROM appointments a
JOIN pets p ON a.pet_id = p.id
JOIN users u ON a.client_id = u.id
LEFT JOIN users v ON a.veterinarian_id = v.id;

CREATE VIEW pet_summary AS
SELECT 
    p.*,
    u.first_name || ' ' || u.last_name as owner_name,
    u.email as owner_email,
    u.phone as owner_phone,
    COUNT(a.id) as total_appointments,
    COUNT(mc.id) as total_consultations,
    MAX(mc.consultation_date) as last_consultation_date
FROM pets p
JOIN users u ON p.owner_id = u.id
LEFT JOIN appointments a ON p.id = a.pet_id
LEFT JOIN medical_consultations mc ON p.id = mc.pet_id
GROUP BY p.id, u.first_name, u.last_name, u.email, u.phone;
```

### 🔄 Database Migrations & Seeds

```javascript
// Migration example: Create appointments table
exports.up = async function(knex) {
  return knex.schema.createTable('appointments', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('pet_id').notNullable().references('id').inTable('pets').onDelete('CASCADE');
    table.uuid('client_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.uuid('veterinarian_id').references('id').inTable('users').onDelete('SET NULL');
    
    table.timestamp('scheduled_date').notNullable();
    table.string('consultation_type', 50).notNullable();
    table.text('reason').notNullable();
    table.string('location', 100).defaultTo('Main Clinic');
    table.integer('estimated_duration').defaultTo(30);
    
    table.enum('status', [
      'pending_payment', 'payment_validation', 'confirmed', 
      'attended', 'cancelled', 'expired', 'rejected', 'no_show'
    ]).defaultTo('pending_payment');
    
    table.decimal('service_price', 8, 2).notNullable();
    table.string('payment_method', 50);
    table.string('payment_proof_url', 500);
    table.timestamp('payment_validated_at');
    table.uuid('payment_validated_by').references('id').inTable('users');
    
    table.text('client_notes');
    table.text('admin_notes');
    table.text('veterinarian_notes');
    table.text('cancellation_reason');
    
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('confirmed_at');
    table.timestamp('attended_at');
    
    // Indexes
    table.index(['client_id']);
    table.index(['veterinarian_id']);
    table.index(['pet_id']);
    table.index(['scheduled_date']);
    table.index(['status']);
  });
};

// Seed data for services
exports.seed = async function(knex) {
  await knex('system_settings').insert([
    {
      category: 'services',
      key: 'consultation_types',
      value: JSON.stringify([
        { id: 'general', name: 'Consulta General', price: 80, duration: 30 },
        { id: 'vaccination', name: 'Vacunación', price: 65, duration: 20 },
        { id: 'emergency', name: 'Emergencia', price: 150, duration: 60 },
        { id: 'grooming', name: 'Grooming', price: 45, duration: 45 },
        { id: 'surgery', name: 'Cirugía', price: 250, duration: 120 },
        { id: 'diagnostic', name: 'Diagnóstico', price: 120, duration: 45 }
      ]),
      description: 'Available consultation types and pricing',
      is_public: true
    }
  ]);
};
```

---

## ⚛️ Frontend React

### 🎨 Technology Stack

```typescript
// Frontend dependencies
{
  "dependencies": {
    // Core React
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.0",
    
    // State Management
    "zustand": "^4.3.9",              // Global state
    "@tanstack/react-query": "^4.29.19", // Server state
    
    // UI Framework
    "@radix-ui/react-*": "latest",    // Headless UI primitives
    "tailwindcss": "^3.3.3",         // Utility-first CSS
    "tailwind-merge": "^1.14.0",     // Merge Tailwind classes
    "class-variance-authority": "^0.7.0", // Component variants
    "lucide-react": "^0.263.1",      // Icons
    
    // Forms & Validation
    "react-hook-form": "^7.45.2",    // Form handling
    "zod": "^3.21.4",                // Schema validation
    "@hookform/resolvers": "^3.1.1", // Form resolvers
    
    // HTTP Client
    "axios": "^1.4.0",               // HTTP client
    
    // Utilities
    "date-fns": "^2.30.0",           // Date manipulation
    "lodash-es": "^4.17.21",         // Utilities
    "clsx": "^2.0.0",                // Conditional classes
    
    // Development
    "typescript": "^5.1.6",
    "vite": "^4.4.5",
    "@vitejs/plugin-react": "^4.0.3"
  }
}
```

### 🏗️ Component Architecture

```typescript
// Shared component structure
// src/shared/components/ui/Button.tsx
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

export { Button, buttonVariants };
```

### 🗄️ State Management with Zustand

```typescript
// src/app/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/shared/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  
  // Actions
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: (user, token) => set({
        user,
        token,
        isAuthenticated: true
      }),
      
      logout: () => set({
        user: null,
        token: null,
        isAuthenticated: false
      }),
      
      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),
      
      setToken: (token) => set({ token })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

// src/app/store/appointmentStore.ts
interface AppointmentState {
  appointments: Appointment[];
  currentAppointment: Appointment | null;
  filters: AppointmentFilters;
  pagination: Pagination;
  
  // Actions
  setAppointments: (appointments: Appointment[]) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  removeAppointment: (id: string) => void;
  setFilters: (filters: Partial<AppointmentFilters>) => void;
  setCurrentAppointment: (appointment: Appointment | null) => void;
}

export const useAppointmentStore = create<AppointmentState>()((set) => ({
  appointments: [],
  currentAppointment: null,
  filters: {},
  pagination: { page: 1, limit: 10, total: 0 },
  
  setAppointments: (appointments) => set({ appointments }),
  
  addAppointment: (appointment) => set((state) => ({
    appointments: [...state.appointments, appointment]
  })),
  
  updateAppointment: (id, updates) => set((state) => ({
    appointments: state.appointments.map(apt => 
      apt.id === id ? { ...apt, ...updates } : apt
    )
  })),
  
  removeAppointment: (id) => set((state) => ({
    appointments: state.appointments.filter(apt => apt.id !== id)
  })),
  
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters }
  })),
  
  setCurrentAppointment: (appointment) => set({ currentAppointment: appointment })
}));
```

### 🔌 API Integration with React Query

```typescript
// src/shared/services/api.ts
import axios from 'axios';
import { useAuthStore } from '@/app/store/authStore';

const api = axios.create({
  baseURL: process.env.VITE_API_URL || 'http://localhost:3001/api/v1',
  timeout: 10000,
});

// Request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export { api };

// src/features/appointments/services/appointmentApi.ts
import { api } from '@/shared/services/api';
import { Appointment, CreateAppointmentDto, AppointmentFilters } from '../types';

export const appointmentApi = {
  getAll: async (filters?: AppointmentFilters) => {
    const { data } = await api.get<{ data: Appointment[]; pagination: Pagination }>('/appointments', {
      params: filters
    });
    return data;
  },
  
  getById: async (id: string) => {
    const { data } = await api.get<{ data: Appointment }>(`/appointments/${id}`);
    return data.data;
  },
  
  create: async (appointment: CreateAppointmentDto) => {
    const { data } = await api.post<{ data: Appointment }>('/appointments', appointment);
    return data.data;
  },
  
  update: async (id: string, updates: Partial<Appointment>) => {
    const { data } = await api.put<{ data: Appointment }>(`/appointments/${id}`, updates);
    return data.data;
  },
  
  updateStatus: async (id: string, status: AppointmentStatus) => {
    const { data } = await api.put<{ data: Appointment }>(`/appointments/${id}/status`, { status });
    return data.data;
  },
  
  uploadPaymentProof: async (id: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await api.post<{ data: FileUpload }>(`/appointments/${id}/payment-proof`, formData);
    return data.data;
  },
  
  delete: async (id: string) => {
    await api.delete(`/appointments/${id}`);
  }
};

// src/features/appointments/hooks/useAppointments.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { appointmentApi } from '../services/appointmentApi';
import { useAppointmentStore } from '@/app/store/appointmentStore';
import { toast } from 'sonner';

export const useAppointments = (filters?: AppointmentFilters) => {
  const queryClient = useQueryClient();
  const { setAppointments } = useAppointmentStore();
  
  return useQuery({
    queryKey: ['appointments', filters],
    queryFn: () => appointmentApi.getAll(filters),
    onSuccess: (data) => {
      setAppointments(data.data);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  const { addAppointment } = useAppointmentStore();
  
  return useMutation({
    mutationFn: appointmentApi.create,
    onSuccess: (newAppointment) => {
      queryClient.invalidateQueries(['appointments']);
      addAppointment(newAppointment);
      toast.success('Cita creada exitosamente');
    },
    onError: (error) => {
      toast.error('Error al crear la cita');
      console.error('Error creating appointment:', error);
    }
  });
};
```

### 🎨 Feature-Based Components

```typescript
// src/features/appointments/components/AppointmentForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { Select } from '@/shared/components/ui/Select';
import { Textarea } from '@/shared/components/ui/Textarea';
import { useCreateAppointment } from '../hooks/useAppointments';
import { usePets } from '@/features/pets/hooks/usePets';

const appointmentSchema = z.object({
  petId: z.string().min(1, 'Selecciona una mascota'),
  consultationType: z.string().min(1, 'Selecciona el tipo de consulta'),
  scheduledDate: z.string().min(1, 'Selecciona fecha y hora'),
  reason: z.string().min(10, 'Describe el motivo de la consulta (mínimo 10 caracteres)'),
  location: z.string().optional(),
  clientNotes: z.string().optional()
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

export const AppointmentForm = () => {
  const { data: pets } = usePets();
  const createAppointment = useCreateAppointment();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema)
  });
  
  const onSubmit = async (data: AppointmentFormData) => {
    try {
      await createAppointment.mutateAsync({
        ...data,
        scheduledDate: new Date(data.scheduledDate)
      });
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Mascota</label>
          <Select {...register('petId')}>
            <option value="">Selecciona una mascota</option>
            {pets?.map((pet) => (
              <option key={pet.id} value={pet.id}>
                {pet.name} ({pet.species})
              </option>
            ))}
          </Select>
          {errors.petId && (
            <p className="text-red-500 text-sm mt-1">{errors.petId.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Tipo de Consulta</label>
          <Select {...register('consultationType')}>
            <option value="">Selecciona el tipo</option>
            <option value="general">Consulta General (S/. 80)</option>
            <option value="vaccination">Vacunación (S/. 65)</option>
            <option value="emergency">Emergencia (S/. 150)</option>
            <option value="grooming">Grooming (S/. 45)</option>
            <option value="surgery">Cirugía (S/. 250)</option>
            <option value="diagnostic">Diagnóstico (S/. 120)</option>
          </Select>
          {errors.consultationType && (
            <p className="text-red-500 text-sm mt-1">{errors.consultationType.message}</p>
          )}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Fecha y Hora</label>
        <Input
          type="datetime-local"
          {...register('scheduledDate')}
          min={new Date().toISOString().slice(0, 16)}
        />
        {errors.scheduledDate && (
          <p className="text-red-500 text-sm mt-1">{errors.scheduledDate.message}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Motivo de la Consulta</label>
        <Textarea
          {...register('reason')}
          placeholder="Describe los síntomas o motivo de la consulta..."
          rows={4}
        />
        {errors.reason && (
          <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Notas Adicionales</label>
        <Textarea
          {...register('clientNotes')}
          placeholder="Información adicional que consideres importante..."
          rows={3}
        />
      </div>
      
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Creando cita...' : 'Agendar Cita'}
      </Button>
    </form>
  );
};
```

### 🛡️ Protected Routes & RBAC

```typescript
// src/shared/components/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/app/store/authStore';
import { UserRole } from '@/shared/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  requireAuth?: boolean;
}

export const ProtectedRoute = ({ 
  children, 
  allowedRoles = [], 
  requireAuth = true 
}: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();
  
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <>{children}</>;
};

// src/app/router/AppRouter.tsx
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/shared/components/ProtectedRoute';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      
      {/* Client routes */}
      <Route
        path="/pets/*"
        element={
          <ProtectedRoute allowedRoles={['cliente']}>
            <PetsRoutes />
          </ProtectedRoute>
        }
      />
      
      {/* Veterinarian routes */}
      <Route
        path="/calendar"
        element={
          <ProtectedRoute allowedRoles={['veterinario']}>
            <VeterinaryCalendar />
          </ProtectedRoute>
        }
      />
      
      {/* Admin routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminRoutes />
          </ProtectedRoute>
        }
      />
      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
```

---

## 🔐 Autenticación y Autorización

### 🔑 JWT Authentication Strategy

```typescript
// Backend authentication service
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

class AuthService {
  // Generate JWT tokens
  generateTokens(user) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    };
    
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '15m'
    });
    
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
    });
    
    return { accessToken, refreshToken };
  }
  
  // Verify access token
  verifyAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid access token');
    }
  }
  
  // Verify refresh token
  verifyRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
  
  // Hash password
  async hashPassword(password) {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }
  
  // Compare password
  async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
  
  // Login user
  async login(identifier, password) {
    // Find user by email, username, or phone
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: identifier },
          { username: identifier },
          { phone: identifier }
        ]
      }
    });
    
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    
    if (user.status !== 'active') {
      throw new Error('Cuenta inactiva. Contacta al administrador.');
    }
    
    const isValidPassword = await this.comparePassword(password, user.password_hash);
    if (!isValidPassword) {
      throw new Error('Contraseña incorrecta');
    }
    
    // Update last login
    await user.update({ last_login: new Date() });
    
    const tokens = this.generateTokens(user);
    
    // Remove sensitive data
    const userResponse = user.toJSON();
    delete userResponse.password_hash;
    
    return {
      user: userResponse,
      tokens
    };
  }
  
  // Register user
  async register(userData) {
    const { password, ...userInfo } = userData;
    
    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { email: userInfo.email },
          { username: userInfo.username }
        ]
      }
    });
    
    if (existingUser) {
      throw new Error('El usuario ya existe');
    }
    
    // Hash password
    const password_hash = await this.hashPassword(password);
    
    // Create user
    const user = await User.create({
      ...userInfo,
      password_hash,
      role: userInfo.role || 'cliente',
      status: 'active'
    });
    
    const tokens = this.generateTokens(user);
    
    // Remove sensitive data
    const userResponse = user.toJSON();
    delete userResponse.password_hash;
    
    return {
      user: userResponse,
      tokens
    };
  }
}

export default new AuthService();
```

### 🛡️ RBAC Middleware

```typescript
// Backend RBAC middleware
export const authorize = (allowedRoles = []) => {
  return (req, res, next) => {
    const { user } = req;
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado'
      });
    }
    
    if (allowedRoles.length === 0) {
      return next(); // No role restriction
    }
    
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Acceso denegado. Permisos insuficientes.'
      });
    }
    
    next();
  };
};

// Resource-based authorization
export const authorizeResource = (resourceChecker) => {
  return async (req, res, next) => {
    try {
      const { user } = req;
      const resourceId = req.params.id;
      
      const hasAccess = await resourceChecker(user, resourceId);
      
      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          message: 'No tienes acceso a este recurso'
        });
      }
      
      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error verificando permisos'
      });
    }
  };
};

// Usage in routes
router.get('/appointments/:id', 
  authenticate, 
  authorizeResource(async (user, appointmentId) => {
    const appointment = await Appointment.findByPk(appointmentId);
    
    if (!appointment) return false;
    
    // Admin can access all
    if (user.role === 'admin') return true;
    
    // Veterinarian can access assigned appointments
    if (user.role === 'veterinario') {
      return appointment.veterinarian_id === user.id;
    }
    
    // Client can access their own appointments
    if (user.role === 'cliente') {
      return appointment.client_id === user.id;
    }
    
    return false;
  }),
  appointmentController.getById
);
```

### 🔒 Frontend Auth Context

```typescript
// src/features/auth/hooks/useAuth.ts
import { useAuthStore } from '@/app/store/authStore';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../services/authApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { user, token, isAuthenticated, login, logout: logoutStore } = useAuthStore();
  const navigate = useNavigate();
  
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      login(data.user, data.tokens.accessToken);
      toast.success(`¡Bienvenido, ${data.user.first_name}!`);
      
      // Redirect based on role
      const redirectPath = getRoleBasedRedirect(data.user.role);
      navigate(redirectPath);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  });
  
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      logoutStore();
      navigate('/login');
      toast.success('Sesión cerrada correctamente');
    }
  });
  
  const getRoleBasedRedirect = (role: string) => {
    switch (role) {
      case 'admin':
        return '/admin/dashboard';
      case 'veterinario':
        return '/veterinary/calendar';
      case 'cliente':
        return '/client/dashboard';
      default:
        return '/dashboard';
    }
  };
  
  return {
    user,
    token,
    isAuthenticated,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isLoading,
    isLoggingOut: logoutMutation.isLoading
  };
};

// Permission checks
export const usePermissions = () => {
  const { user } = useAuthStore();
  
  const hasRole = (roles: string | string[]) => {
    if (!user) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
  };
  
  const canAccessResource = (resource: string, action: string = 'read') => {
    if (!user) return false;
    
    // Define permission matrix
    const permissions = {
      admin: {
        '*': ['create', 'read', 'update', 'delete']
      },
      veterinario: {
        appointments: ['read', 'update'],
        medical_history: ['create', 'read', 'update'],
        pets: ['read'],
        users: ['read'] // Only clients
      },
      cliente: {
        appointments: ['create', 'read'],
        pets: ['create', 'read', 'update', 'delete'],
        medical_history: ['read'] // Only own pets
      }
    };
    
    const userPermissions = permissions[user.role];
    if (!userPermissions) return false;
    
    // Check wildcard permission (admin)
    if (userPermissions['*']) {
      return userPermissions['*'].includes(action);
    }
    
    // Check specific resource permission
    const resourcePermissions = userPermissions[resource];
    if (!resourcePermissions) return false;
    
    return resourcePermissions.includes(action);
  };
  
  return {
    hasRole,
    canAccessResource,
    isAdmin: hasRole('admin'),
    isVeterinarian: hasRole('veterinario'),
    isClient: hasRole('cliente')
  };
};
```

---

## 📱 Casos de Uso del Sistema

### 🎯 Flujo Completo: Cliente Agenda Cita

```mermaid
sequenceDiagram
    participant C as Cliente
    participant F as Frontend
    participant B as Backend
    participant DB as Database
    participant E as Email Service
    participant N as Notification Service
    
    C->>F: Accede a "Nueva Cita"
    F->>B: GET /api/v1/pets (obtener mascotas)
    B->>DB: Query pets by owner_id
    DB-->>B: Pet list
    B-->>F: Pet data
    F-->>C: Muestra formulario con mascotas
    
    C->>F: Completa formulario cita
    F->>F: Validación frontend (Zod)
    F->>B: POST /api/v1/appointments
    B->>B: Validación backend
    B->>DB: Create appointment (status: pending_payment)
    DB-->>B: Appointment created
    B->>N: Create notification
    B-->>F: Success response
    F-->>C: Confirma creación + instrucciones pago
    
    C->>F: Sube comprobante pago
    F->>B: POST /api/v1/appointments/{id}/payment-proof
    B->>B: Process image upload
    B->>DB: Update appointment (status: payment_validation)
    B->>N: Notify admin (payment pending)
    B-->>F: Upload success
    F-->>C: Confirma comprobante subido
    
    Note over B, N: Admin valida pago
    B->>DB: Update appointment (status: confirmed)
    B->>N: Notify client (appointment confirmed)
    B->>E: Send confirmation email
    
    Note over B, N: Sistema asigna veterinario
    B->>DB: Assign veterinarian
    B->>N: Notify veterinarian
```

### 🩺 Flujo: Veterinario Atiende Consulta

```mermaid
sequenceDiagram
    participant V as Veterinario
    participant F as Frontend
    participant B as Backend
    participant DB as Database
    participant N as Notification Service
    
    V->>F: Accede a calendario
    F->>B: GET /api/v1/appointments?veterinarian_id={id}&date={today}
    B->>DB: Query assigned appointments
    DB-->>B: Appointment list
    B-->>F: Today's appointments
    F-->>V: Muestra agenda del día
    
    V->>F: Selecciona cita para atender
    F->>B: GET /api/v1/appointments/{id}
    B->>DB: Get full appointment details
    B->>DB: Get pet medical history
    DB-->>B: Complete data
    B-->>F: Appointment + history
    F-->>V: Modal con información completa
    
    V->>F: Completa formulario consulta
    F->>B: POST /api/v1/medical-history
    B->>B: Validate medical data
    B->>DB: Create medical consultation
    B->>DB: Update appointment (status: attended)
    B->>N: Notify client (consultation completed)
    B-->>F: Consultation saved
    F-->>V: Confirma consulta registrada
    
    Note over F, V: Cliente puede ver actualización
    F->>B: GET /api/v1/medical-history/pet/{id}
    B->>DB: Get updated history
    DB-->>B: Medical history
    B-->>F: Updated data
```

### 👨‍💼 Flujo: Admin Valida Pago

```mermaid
sequenceDiagram
    participant A as Admin
    participant F as Frontend
    participant B as Backend
    participant DB as Database
    participant E as Email Service
    participant W as WhatsApp API
    
    A->>F: Accede a validación pagos
    F->>B: GET /api/v1/appointments?status=payment_validation
    B->>DB: Query pending validations
    DB-->>B: Pending appointments
    B-->>F: Appointments list
    F-->>A: Lista citas pendientes
    
    A->>F: Selecciona cita para validar
    F->>B: GET /api/v1/appointments/{id}
    B->>DB: Get appointment + payment proof
    DB-->>B: Complete data
    B-->>F: Appointment details
    F-->>A: Modal con comprobante
    
    A->>F: Aprueba/Rechaza pago
    F->>B: PUT /api/v1/appointments/{id}/validate-payment
    B->>B: Update payment status
    B->>DB: Update appointment status
    B->>DB: Assign available veterinarian
    B->>E: Send email notification
    B->>W: Send WhatsApp message
    B-->>F: Validation complete
    F-->>A: Confirma validación
```

---

## 🚀 Configuración y Deploy

### 🐳 Docker Configuration

```dockerfile
# Backend Dockerfile
FROM node:18-alpine AS base

# Dependencies stage
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Build stage
FROM base AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM base AS production
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=build --chown=nextjs:nodejs /app/dist ./dist
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs package*.json ./

# Switch to non-root user
USER nextjs

EXPOSE 3001
ENV NODE_ENV production
ENV PORT 3001

CMD ["node", "dist/server.js"]
```

```dockerfile
# Frontend Dockerfile
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage with nginx
FROM nginx:alpine AS production

# Copy built files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### 🐙 Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  # Database
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: petla_db
      POSTGRES_USER: petla_user
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init:/docker-entrypoint-initdb.d
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U petla_user -d petla_db"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Redis Cache
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Backend API
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      NODE_ENV: production
      PORT: 3001
      DATABASE_URL: postgresql://petla_user:${POSTGRES_PASSWORD}@postgres:5432/petla_db
      REDIS_URL: redis://redis:6379
      JWT_SECRET: ${JWT_SECRET}
      JWT_REFRESH_SECRET: ${JWT_REFRESH_SECRET}
      AWS_ACCESS_KEY_ID: ${AWS_ACCESS_KEY_ID}
      AWS_SECRET_ACCESS_KEY: ${AWS_SECRET_ACCESS_KEY}
      AWS_S3_BUCKET: ${AWS_S3_BUCKET}
      SENDGRID_API_KEY: ${SENDGRID_API_KEY}
      TWILIO_ACCOUNT_SID: ${TWILIO_ACCOUNT_SID}
      TWILIO_AUTH_TOKEN: ${TWILIO_AUTH_TOKEN}
    ports:
      - "3001:3001"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    volumes:
      - upload_data:/app/uploads
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3001/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    restart: unless-stopped

  # Frontend
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - backend
    volumes:
      - ./nginx/ssl:/etc/nginx/ssl:ro
    restart: unless-stopped

  # Nginx Load Balancer
  nginx:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
    depends_on:
      - backend
      - frontend
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
  upload_data:

networks:
  default:
    driver: bridge
```

### ⚙️ Environment Configuration

```bash
# .env.production
# Database
POSTGRES_PASSWORD=your_secure_postgres_password
DATABASE_URL=postgresql://petla_user:password@postgres:5432/petla_db

# JWT Secrets
JWT_SECRET=your_super_secret_jwt_key_here
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Redis
REDIS_URL=redis://redis:6379

# AWS S3
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=petla-files
AWS_REGION=us-east-1

# Email Service (SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=noreply@petla.com

# SMS Service (Twilio)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Application
APP_URL=https://petla.com
API_URL=https://api.petla.com
FRONTEND_URL=https://petla.com

# Monitoring
SENTRY_DSN=your_sentry_dsn
LOG_LEVEL=info

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 🚀 CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install backend dependencies
        run: |
          cd backend
          npm ci
      
      - name: Run backend tests
        run: |
          cd backend
          npm run test:coverage
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
      
      - name: Install frontend dependencies
        run: |
          cd frontend
          npm ci
      
      - name: Run frontend tests
        run: |
          cd frontend
          npm run test:coverage
      
      - name: Build frontend
        run: |
          cd frontend
          npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Login to DockerHub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_TOKEN }}
      
      - name: Build and push backend
        uses: docker/build-push-action@v5
        with:
          context: ./backend
          push: true
          tags: petla/backend:latest
      
      - name: Build and push frontend
        uses: docker/build-push-action@v5
        with:
          context: ./frontend
          push: true
          tags: petla/frontend:latest
      
      - name: Deploy to server
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /opt/petla
            docker-compose pull
            docker-compose up -d
            docker system prune -f
```

### 📊 Monitoring & Health Checks

```typescript
// Backend health check endpoint
export const healthController = {
  // Basic health check
  health: async (req, res) => {
    const healthData = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.APP_VERSION || '1.0.0',
      environment: process.env.NODE_ENV
    };
    
    res.status(200).json(healthData);
  },
  
  // Detailed health check
  detailed: async (req, res) => {
    const checks = {
      database: await checkDatabase(),
      redis: await checkRedis(),
      email: await checkEmailService(),
      storage: await checkFileStorage()
    };
    
    const overallStatus = Object.values(checks).every(check => check.status === 'healthy')
      ? 'healthy'
      : 'unhealthy';
    
    res.status(overallStatus === 'healthy' ? 200 : 503).json({
      status: overallStatus,
      timestamp: new Date().toISOString(),
      checks
    });
  }
};

async function checkDatabase() {
  try {
    await sequelize.authenticate();
    return { status: 'healthy', message: 'Database connection successful' };
  } catch (error) {
    return { status: 'unhealthy', message: error.message };
  }
}

async function checkRedis() {
  try {
    await redis.ping();
    return { status: 'healthy', message: 'Redis connection successful' };
  } catch (error) {
    return { status: 'unhealthy', message: error.message };
  }
}
```

---

## 🧪 Testing y Calidad

### 🔬 Testing Strategy

```typescript
// Backend testing with Jest and Supertest
// tests/integration/appointments.test.js
import request from 'supertest';
import app from '../../src/app.js';
import { setupTestDB, cleanupTestDB } from '../helpers/testDB.js';
import { createTestUser, createTestPet } from '../helpers/factories.js';

describe('Appointments API', () => {
  let testUser, testPet, authToken;
  
  beforeAll(async () => {
    await setupTestDB();
  });
  
  afterAll(async () => {
    await cleanupTestDB();
  });
  
  beforeEach(async () => {
    testUser = await createTestUser({ role: 'cliente' });
    testPet = await createTestPet({ owner_id: testUser.id });
    
    // Login to get auth token
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({
        identifier: testUser.email,
        password: 'password123'
      });
    
    authToken = loginResponse.body.data.tokens.accessToken;
  });
  
  describe('POST /api/v1/appointments', () => {
    it('should create appointment successfully', async () => {
      const appointmentData = {
        petId: testPet.id,
        consultationType: 'general',
        scheduledDate: new Date(Date.now() + 86400000), // Tomorrow
        reason: 'Routine checkup for my pet',
        clientNotes: 'Pet seems healthy but want to be sure'
      };
      
      const response = await request(app)
        .post('/api/v1/appointments')
        .set('Authorization', `Bearer ${authToken}`)
        .send(appointmentData)
        .expect(201);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.status).toBe('pending_payment');
      expect(response.body.data.pet_id).toBe(testPet.id);
      expect(response.body.data.client_id).toBe(testUser.id);
    });
    
    it('should reject appointment with past date', async () => {
      const appointmentData = {
        petId: testPet.id,
        consultationType: 'general',
        scheduledDate: new Date(Date.now() - 86400000), // Yesterday
        reason: 'Routine checkup'
      };
      
      const response = await request(app)
        .post('/api/v1/appointments')
        .set('Authorization', `Bearer ${authToken}`)
        .send(appointmentData)
        .expect(400);
      
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('fecha');
    });
    
    it('should reject unauthorized access', async () => {
      const appointmentData = {
        petId: testPet.id,
        consultationType: 'general',
        scheduledDate: new Date(Date.now() + 86400000),
        reason: 'Routine checkup'
      };
      
      await request(app)
        .post('/api/v1/appointments')
        .send(appointmentData)
        .expect(401);
    });
  });
  
  describe('GET /api/v1/appointments', () => {
    it('should return user appointments', async () => {
      // Create test appointment
      await createTestAppointment({ 
        client_id: testUser.id, 
        pet_id: testPet.id 
      });
      
      const response = await request(app)
        .get('/api/v1/appointments')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].client_id).toBe(testUser.id);
    });
  });
});

// Frontend testing with React Testing Library
// src/features/appointments/components/__tests__/AppointmentForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppointmentForm } from '../AppointmentForm';
import { mockPets } from '../__mocks__/pets';

// Mock API calls
jest.mock('../../hooks/useAppointments');
jest.mock('@/features/pets/hooks/usePets');

const renderAppointmentForm = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });
  
  return render(
    <QueryClientProvider client={queryClient}>
      <AppointmentForm />
    </QueryClientProvider>
  );
};

describe('AppointmentForm', () => {
  beforeEach(() => {
    // Mock successful pets query
    require('@/features/pets/hooks/usePets').usePets.mockReturnValue({
      data: mockPets,
      isLoading: false,
      error: null
    });
  });
  
  it('renders all form fields', () => {
    renderAppointmentForm();
    
    expect(screen.getByLabelText(/mascota/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tipo de consulta/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/fecha y hora/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/motivo de la consulta/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /agendar cita/i })).toBeInTheDocument();
  });
  
  it('validates required fields', async () => {
    const user = userEvent.setup();
    renderAppointmentForm();
    
    const submitButton = screen.getByRole('button', { name: /agendar cita/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/selecciona una mascota/i)).toBeInTheDocument();
      expect(screen.getByText(/selecciona el tipo/i)).toBeInTheDocument();
      expect(screen.getByText(/selecciona fecha y hora/i)).toBeInTheDocument();
    });
  });
  
  it('submits form with valid data', async () => {
    const mockCreateAppointment = jest.fn();
    require('../../hooks/useAppointments').useCreateAppointment.mockReturnValue({
      mutateAsync: mockCreateAppointment,
      isLoading: false
    });
    
    const user = userEvent.setup();
    renderAppointmentForm();
    
    // Fill form
    await user.selectOptions(screen.getByLabelText(/mascota/i), mockPets[0].id);
    await user.selectOptions(screen.getByLabelText(/tipo de consulta/i), 'general');
    await user.type(screen.getByLabelText(/fecha y hora/i), '2024-12-25T10:00');
    await user.type(
      screen.getByLabelText(/motivo de la consulta/i), 
      'Routine checkup for my pet health'
    );
    
    // Submit
    await user.click(screen.getByRole('button', { name: /agendar cita/i }));
    
    await waitFor(() => {
      expect(mockCreateAppointment).toHaveBeenCalledWith({
        petId: mockPets[0].id,
        consultationType: 'general',
        scheduledDate: new Date('2024-12-25T10:00'),
        reason: 'Routine checkup for my pet health',
        location: undefined,
        clientNotes: ''
      });
    });
  });
});
```

### 📊 Code Quality & Coverage

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testMatch: [
    '<rootDir>/tests/**/*.test.js',
    '<rootDir>/src/**/__tests__/**/*.test.js'
  ],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js',
    '!src/config/**',
    '!**/node_modules/**'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  coverageReporters: ['text', 'lcov', 'html']
};

// ESLint configuration
module.exports = {
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off'
  }
};
```

---

## 📊 Monitoreo y Performance

### 📈 Monitoring Stack

```yaml
# monitoring/docker-compose.monitoring.yml
version: '3.8'

services:
  # Prometheus for metrics collection
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'

  # Grafana for visualization
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    volumes:
      - grafana_data:/var/lib/grafana
      - ./grafana/provisioning:/etc/grafana/provisioning
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin123

  # Node Exporter for system metrics
  node-exporter:
    image: prom/node-exporter:latest
    ports:
      - "9100:9100"
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.rootfs=/rootfs'
      - '--path.sysfs=/host/sys'

volumes:
  prometheus_data:
  grafana_data:
```

### 📊 Application Metrics

```typescript
// Backend metrics with Prometheus
import promClient from 'prom-client';

// Create metrics
const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

const appointmentsCreated = new promClient.Counter({
  name: 'appointments_created_total',
  help: 'Total number of appointments created'
});

const databaseConnections = new promClient.Gauge({
  name: 'database_connections_active',
  help: 'Number of active database connections'
});

// Middleware to collect metrics
export const metricsMiddleware = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    
    httpRequestsTotal
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .inc();
    
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path)
      .observe(duration);
  });
  
  next();
};

// Custom business metrics
export class BusinessMetrics {
  static recordAppointmentCreated() {
    appointmentsCreated.inc();
  }
  
  static updateDatabaseConnections(count) {
    databaseConnections.set(count);
  }
  
  static async collectCustomMetrics() {
    // Collect business-specific metrics
    const activeConnections = await getDatabaseConnectionCount();
    this.updateDatabaseConnections(activeConnections);
    
    // Daily appointment counts
    const todayAppointments = await getTodayAppointmentCount();
    appointmentsToday.set(todayAppointments);
  }
}

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  await BusinessMetrics.collectCustomMetrics();
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});
```

### 🚨 Error Tracking with Sentry

```typescript
// Backend error tracking
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0
});

// Error handling middleware
export const errorHandler = (error, req, res, next) => {
  // Log error to Sentry
  Sentry.captureException(error, {
    user: req.user ? { id: req.user.id, email: req.user.email } : undefined,
    extra: {
      body: req.body,
      params: req.params,
      query: req.query
    }
  });
  
  // Log to console for development
  if (process.env.NODE_ENV === 'development') {
    console.error(error);
  }
  
  // Send appropriate error response
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Datos inválidos',
      errors: error.details
    });
  }
  
  if (error.name === 'UnauthorizedError') {
    return res.status(401).json({
      success: false,
      message: 'No autorizado'
    });
  }
  
  // Generic error response
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
};

// Frontend error tracking
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes
      )
    })
  ],
  tracesSampleRate: 1.0
});

// Error boundary component
export const ErrorBoundary = Sentry.withErrorBoundary(App, {
  fallback: ({ error, resetError }) => (
    <div className="error-boundary">
      <h2>¡Oops! Algo salió mal</h2>
      <p>{error.message}</p>
      <button onClick={resetError}>Reintentar</button>
    </div>
  ),
  beforeCapture: (scope, error, errorInfo) => {
    scope.setTag('errorBoundary', true);
    scope.setContext('errorInfo', errorInfo);
  }
});
```

---

## 🔧 Performance Optimization

### ⚡ Frontend Optimizations

```typescript
// Code splitting and lazy loading
import { lazy, Suspense } from 'react';
import { Spinner } from '@/shared/components/ui/Spinner';

// Lazy load routes
const Dashboard = lazy(() => import('@/features/dashboard/Dashboard'));
const Appointments = lazy(() => import('@/features/appointments/AppointmentsList'));
const PetManagement = lazy(() => import('@/features/pets/PetManagement'));

// Loading component
const RouteLoader = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Spinner size="lg" />}>
    {children}
  </Suspense>
);

// Virtual scrolling for large lists
import { FixedSizeList as List } from 'react-window';

const VirtualizedAppointmentList = ({ appointments }) => {
  const itemRenderer = ({ index, style }) => (
    <div style={style}>
      <AppointmentCard appointment={appointments[index]} />
    </div>
  );
  
  return (
    <List
      height={600}
      itemCount={appointments.length}
      itemSize={120}
      itemData={appointments}
    >
      {itemRenderer}
    </List>
  );
};

// Image optimization
const OptimizedImage = ({ src, alt, ...props }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
    };
    img.src = src;
  }, [src]);
  
  if (isLoading) {
    return <div className="bg-gray-200 animate-pulse" {...props} />;
  }
  
  return (
    <img
      src={imageSrc}
      alt={alt}
      loading="lazy"
      {...props}
    />
  );
};

// Memoization for expensive computations
import { memo, useMemo, useCallback } from 'react';

const ExpensiveComponent = memo(({ data, filters }) => {
  const filteredData = useMemo(() => {
    return data.filter(item => 
      filters.every(filter => filter(item))
    );
  }, [data, filters]);
  
  const handleItemClick = useCallback((itemId) => {
    // Handle click
  }, []);
  
  return (
    <div>
      {filteredData.map(item => (
        <ItemCard 
          key={item.id} 
          item={item} 
          onClick={handleItemClick}
        />
      ))}
    </div>
  );
});
```

### 🚀 Backend Performance

```typescript
// Database query optimization
import { Op } from 'sequelize';

class AppointmentService {
  // Optimized query with eager loading
  async getAppointmentsWithDetails(filters = {}) {
    const whereClause = this.buildWhereClause(filters);
    
    return await Appointment.findAll({
      where: whereClause,
      include: [
        {
          model: Pet,
          as: 'pet',
          attributes: ['id', 'name', 'species', 'breed'],
          include: [{
            model: User,
            as: 'owner',
            attributes: ['id', 'first_name', 'last_name', 'email', 'phone']
          }]
        },
        {
          model: User,
          as: 'veterinarian',
          attributes: ['id', 'first_name', 'last_name', 'specialty']
        }
      ],
      order: [['scheduled_date', 'DESC']],
      limit: filters.limit || 20,
      offset: filters.offset || 0
    });
  }
  
  // Bulk operations for better performance
  async updateAppointmentStatuses(updates) {
    const transaction = await sequelize.transaction();
    
    try {
      const updatePromises = updates.map(({ id, status }) =>
        Appointment.update(
          { status, updated_at: new Date() },
          { where: { id }, transaction }
        )
      );
      
      await Promise.all(updatePromises);
      await transaction.commit();
      
      return { success: true, updated: updates.length };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

// Caching strategy with Redis
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

class CacheService {
  static async get(key) {
    try {
      const data = await redis.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }
  
  static async set(key, data, ttl = 3600) {
    try {
      await redis.setex(key, ttl, JSON.stringify(data));
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }
  
  static async del(pattern) {
    try {
      const keys = await redis.keys(pattern);
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }
}

// Cached controller method
export const getAppointments = async (req, res) => {
  const cacheKey = `appointments:${req.user.id}:${JSON.stringify(req.query)}`;
  
  // Try cache first
  let appointments = await CacheService.get(cacheKey);
  
  if (!appointments) {
    // Fetch from database
    appointments = await appointmentService.getAppointmentsWithDetails({
      userId: req.user.id,
      ...req.query
    });
    
    // Cache for 5 minutes
    await CacheService.set(cacheKey, appointments, 300);
  }
  
  res.json({
    success: true,
    data: appointments,
    cached: !!appointments._cached
  });
};

// File upload optimization with Multer and Sharp
import multer from 'multer';
import sharp from 'sharp';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes'));
    }
  }
});

export const uploadImage = async (req, res) => {
  try {
    const { buffer, originalname, mimetype } = req.file;
    
    // Optimize image with Sharp
    const optimizedBuffer = await sharp(buffer)
      .resize(1200, 1200, { 
        fit: 'inside', 
        withoutEnlargement: true 
      })
      .jpeg({ 
        quality: 80, 
        progressive: true 
      })
      .toBuffer();
    
    // Generate unique filename
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
    const key = `uploads/images/${filename}`;
    
    // Upload to S3
    await s3.send(new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: optimizedBuffer,
      ContentType: 'image/jpeg',
      ACL: 'public-read'
    }));
    
    const url = `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${key}`;
    
    res.json({
      success: true,
      data: {
        url,
        filename,
        originalName: originalname,
        size: optimizedBuffer.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al subir imagen'
    });
  }
};
```

---

## 🎯 Conclusión

**PetLA** representa una solución fullstack moderna y escalable para la gestión de cl��nicas veterinarias, diseñada con las mejores prácticas de desarrollo y una arquitectura robusta que elimina las limitaciones del localStorage.

### 🚀 Beneficios de la Arquitectura Propuesta

#### 🔧 **Técnicos**
- **Escalabilidad**: Separación clara entre frontend y backend
- **Performance**: Caching, optimización de queries, CDN
- **Seguridad**: JWT, RBAC, validación en múltiples capas
- **Mantenibilidad**: Código modular, testing automatizado
- **Observabilidad**: Monitoring completo, logs estructurados

#### 💼 **De Negocio**
- **Disponibilidad 99.9%**: Infraestructura redundante
- **Experiencia de Usuario**: Responsive, tiempo real, offline-ready
- **Compliance**: Auditoría completa, backup automático
- **Integración**: APIs para expandir funcionalidades
- **ROI**: Reducción 70% en tiempos administrativos

### 📈 **Roadmap de Implementación**

| Fase | Duración | Entregables |
|------|----------|-------------|
| **Fase 1** | 4 semanas | Backend MVP + Autenticación |
| **Fase 2** | 3 semanas | Frontend Core + Gestión Citas |
| **Fase 3** | 3 semanas | Historial Médico + Dashboard |
| **Fase 4** | 2 semanas | Testing + Deploy + Monitoring |
| **Fase 5** | 2 semanas | Optimización + Documentación |

### 🛠️ **Tecnologías de Vanguardia**

- **Backend**: Node.js + Express/Fastify
- **Frontend**: React 18 + TypeScript + Zustand
- **Base de Datos**: PostgreSQL + Redis
- **Deployment**: Docker + Kubernetes
- **Monitoring**: Prometheus + Grafana + Sentry

Este sistema no solo resuelve las necesidades actuales sino que está preparado para escalar y evolucionar con el crecimiento del negocio veterinario.

---

<div align="center">
  <p><strong>🩺 Desarrollado para revolucionar la medicina veterinaria digital</strong></p>
  <p><em>© 2024 PetLA. Sistema de gestión veterinaria de próxima generación.</em></p>
</div>
