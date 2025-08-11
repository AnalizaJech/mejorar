# 🩺 Manual de Usuario - Sistema PetLA
## Guía Completa para Clínicas Veterinarias

---

## 📖 Índice General

1. [Introducción al Sistema](#introducción-al-sistema)
2. [Tipos de Usuario y Acceso](#tipos-de-usuario-y-acceso)
3. [Navegación Inicial](#navegación-inicial)
4. [Manual del Cliente](#manual-del-cliente)
5. [Manual del Veterinario](#manual-del-veterinario)
6. [Manual del Administrador](#manual-del-administrador)
7. [Funciones Comunes](#funciones-comunes)
8. [Resolución de Problemas](#resolución-de-problemas)

---

## 🌟 Introducción al Sistema

**PetLA** es un sistema web diseñado específicamente para clínicas veterinarias que permite gestionar citas, pacientes, historiales médicos y toda la operación de su clínica desde cualquier computadora con internet.

### ¿Qué hace este sistema?
- ✅ Los clientes pueden agendar citas desde su casa
- ✅ Los veterinarios pueden ver su agenda y registrar consultas
- ✅ Los administradores pueden gestionar toda la clínica
- ✅ Todos pueden acceder desde cualquier dispositivo (celular, tablet, computadora)

### ¿Cómo funciona?
El sistema funciona como una página web a la que se accede escribiendo la dirección en el navegador (Chrome, Firefox, Safari, etc.). Cada persona tiene su propia cuenta con usuario y contraseña.

---

## 👥 Tipos de Usuario y Acceso

### 🟦 Cliente (Dueño de Mascotas)
**¿Quién es?** Cualquier persona que tiene una mascota y quiere usar los servicios de la clínica.

**¿Qué puede hacer?**
- Registrar sus mascotas
- Agendar citas médicas
- Ver el historial médico de sus mascotas
- Subir comprobantes de pago
- Recibir notificaciones

**¿Cómo obtiene acceso?**
- Se registra él mismo desde la página web
- El administrador puede crear su cuenta

### 🟩 Veterinario
**¿Quién es?** El doctor veterinario que atiende a las mascotas.

**¿Qué puede hacer?**
- Ver su agenda de citas
- Atender consultas y registrar diagnósticos
- Ver el historial de sus pacientes
- Registrar tratamientos y medicamentos

**¿Cómo obtiene acceso?**
- Solo el administrador puede crear cuentas de veterinario

### 🟥 Administrador
**¿Quién es?** La persona encargada de gestionar toda la clínica (gerente, recepcionista principal, dueño).

**¿Qué puede hacer?**
- Gestionar todos los usuarios
- Validar pagos de citas
- Ver estadísticas de la clínica
- Configurar servicios y precios
- Gestionar veterinarios

**¿Cómo obtiene acceso?**
- Es la primera cuenta que se crea al instalar el sistema

---

## 🌐 Navegación Inicial

### 🏠 Página Principal (Ruta: `/`)
**¿Quién puede verla?** Cualquier persona que visite la página web.

**¿Qué se ve?**
- Información sobre la clínica
- Botones para iniciar sesión o registrarse
- Información de contacto
- Testimonios de clientes

**Botones disponibles:**
- **"Iniciar Sesión"** → Te lleva a `/login`
- **"Registrarse"** → Te lleva a `/registro`
- **"Sobre Nosotros"** → Información de la clínica
- **"Servicios"** → Lista de servicios disponibles

### 🔐 Página de Inicio de Sesión (Ruta: `/login`)
**¿Quién puede verla?** Personas que no han iniciado sesión.

**¿Qué se ve?**
- Formulario para ingresar email/usuario y contraseña
- Dos pestañas: "Iniciar Sesión" y "Registrarse"

**Campos del formulario:**
- **Email/Usuario:** Donde escribes tu correo o nombre de usuario
- **Contraseña:** Tu clave secreta

**Botones disponibles:**
- **"Iniciar Sesión"** → Te lleva a tu dashboard según tu rol
- **"¿Olvidaste tu contraseña?"** → Te lleva a `/forgot-password`
- **Pestaña "Registrarse"** → Cambia al formulario de registro

### 📝 Página de Registro (Ruta: `/registro`)
**¿Quién puede verla?** Personas que quieren crear una cuenta nueva.

**¿Qué se ve?**
- Formulario para crear cuenta de cliente
- Solo se pueden registrar clientes (los veterinarios los crea el admin)

**Campos obligatorios:**
- **Nombres:** Tu nombre completo
- **Apellidos:** Tus apellidos
- **Email:** Tu correo electrónico
- **Teléfono:** Tu número de celular
- **Usuario:** Nombre único para identificarte
- **Contraseña:** Mínimo 6 caracteres
- **Confirmar Contraseña:** Debe ser igual a la anterior

**Campos opcionales:**
- **Dirección:** Donde vives
- **Fecha de Nacimiento:** Tu edad
- **Género:** Masculino/Femenino/Otro

**Botones disponibles:**
- **"Registrarse"** → Crea tu cuenta y te lleva al dashboard del cliente
- **Pestaña "Iniciar Sesión"** → Cambia al formulario de login

---

## 🟦 Manual del Cliente

### 📊 Dashboard del Cliente (Ruta: `/dashboard`)
**¿Cuándo llegas aquí?** Inmediatamente después de iniciar sesión como cliente.

**¿Qué ves?**
- Resumen de tus mascotas registradas
- Tus próximas citas
- Estadísticas rápidas (número de mascotas, citas pendientes)
- Accesos rápidos a funciones principales

**Botones y enlaces:**
- **"Ver Mis Mascotas"** → Te lleva a `/mis-mascotas`
- **"Agendar Nueva Cita"** → Te lleva a `/nueva-cita`
- **"Ver Mis Citas"** → Te lleva a `/mis-citas`
- **"Ver Historial"** → Te lleva a `/historial`

**Navegación superior:**
- **Logo PetLA** → Vuelve al dashboard
- **"Dashboard"** → Página actual (activa)
- **"Mis Mascotas"** → Gestión de mascotas
- **"Mis Citas"** → Ver todas tus citas
- **"Historial"** → Historial médico
- **Ícono de campana** → Notificaciones
- **Ícono de usuario** → Menú de cuenta (configuración, cerrar sesión)

### 🐕 Gestión de Mascotas (Ruta: `/mis-mascotas`)
**¿Para qué sirve?** Registrar y gestionar la información de tus mascotas.

**¿Qué ves?**
- Lista de todas tus mascotas con sus fotos
- Botón para agregar nueva mascota
- Información básica de cada mascota (nombre, especie, raza)

**Botones disponibles:**
- **"Agregar Nueva Mascota"** → Abre formulario para registrar mascota
- **"Ver Detalles"** (en cada mascota) → Muestra información completa
- **"Editar"** → Permite modificar datos de la mascota
- **"Eliminar"** → Borra la mascota (con confirmación)

**Formulario de Nueva Mascota:**
- **Nombre:** Nombre de tu mascota
- **Especie:** Perro, gato, ave, etc.
- **Raza:** Raza específica
- **Sexo:** Macho/hembra
- **Fecha de Nacimiento:** Para calcular la edad
- **Peso:** Peso actual (opcional)
- **Microchip:** Número de microchip (opcional)
- **Foto:** Puedes subir una imagen

**Botones del formulario:**
- **"Guardar Mascota"** → Registra la nueva mascota
- **"Cancelar"** → Cierra el formulario sin guardar

### 📅 Nueva Cita (Ruta: `/nueva-cita`)
**¿Para qué sirve?** Agendar una cita médica para tu mascota.

**¿Qué ves?**
- Formulario paso a paso para agendar cita
- Lista de servicios disponibles con precios

**Campos del formulario:**
- **Seleccionar Mascota:** Lista de tus mascotas registradas
- **Tipo de Consulta:** 
  - Consulta General (S/. 80)
  - Vacunación (S/. 65)
  - Emergencia (S/. 150)
  - Grooming (S/. 45)
  - Cirugía (S/. 250)
  - Diagnóstico (S/. 120)
- **Fecha y Hora:** Calendario para seleccionar cuando quieres la cita
- **Motivo:** Describe qué le pasa a tu mascota
- **Notas Adicionales:** Información extra que quieras compartir

**Botones disponibles:**
- **"Agendar Cita"** → Crea la cita (estado: pendiente de pago)
- **"Cancelar"** → Vuelve al dashboard

**¿Qué pasa después de agendar?**
1. Se crea la cita en estado "Pendiente de Pago"
2. Recibes instrucciones para hacer el pago
3. Debes subir el comprobante de pago
4. El administrador valida tu pago
5. Se confirma tu cita y se asigna veterinario

### 📋 Mis Citas (Ruta: `/mis-citas`)
**¿Para qué sirve?** Ver todas tus citas agendadas y su estado.

**¿Qué ves?**
- Lista de todas tus citas ordenadas por fecha
- Estado de cada cita con colores:
  - 🔴 **Pendiente de Pago:** Necesitas subir comprobante
  - 🟡 **En Validación:** El admin está revisando tu pago
  - 🟢 **Aceptada:** Cita confirmada
  - 🔵 **Atendida:** Ya fue realizada la consulta
  - ⚫ **Cancelada/Rechazada:** Cita no válida

**Botones por cita:**
- **"Ver Detalles"** → Muestra información completa de la cita
- **"Subir Comprobante"** → Solo aparece si está pendiente de pago
- **"Cancelar Cita"** → Solo si no ha sido atendida
- **"Ver Consulta"** → Solo aparece si ya fue atendida

**¿Cómo subir comprobante?**
1. Haz clic en "Subir Comprobante"
2. Selecciona el archivo de tu comprobante (imagen o PDF)
3. El sistema lo comprime automáticamente
4. Haz clic en "Guardar Comprobante"
5. El estado cambia a "En Validación"

### 📖 Historial Clínico (Ruta: `/historial`)
**¿Para qué sirve?** Ver el historial médico completo de tus mascotas.

**¿Qué ves?**
- Lista de todas las consultas realizadas
- Filtros para buscar por mascota o fecha
- Información de cada consulta (veterinario, diagnóstico, tratamiento)

**Información mostrada:**
- **Fecha de la consulta**
- **Mascota atendida**
- **Veterinario que atendió**
- **Tipo de consulta**
- **Diagnóstico**
- **Tratamiento aplicado**
- **Medicamentos recetados**
- **Próxima cita recomendada**

**Botones disponibles:**
- **"Ver Detalles"** → Muestra la consulta completa
- **"Exportar PDF"** → Descarga el historial en PDF
- **Filtros por mascota** → Muestra solo historiales de una mascota específica

---

## 🟩 Manual del Veterinario

### 🩺 Dashboard del Veterinario (Ruta: `/dashboard`)
**¿Cuándo llegas aquí?** Inmediatamente después de iniciar sesión como veterinario.

**¿Qué ves?**
- Tus citas del día actual
- Resumen de pacientes asignados
- Estadísticas de tu trabajo (citas atendidas, pacientes únicos)
- Próximas citas programadas

**Botones y enlaces:**
- **"Ver Calendario Completo"** → Te lleva a `/calendario`
- **"Mis Pacientes"** → Te lleva a `/mis-pacientes`
- **"Historial Clínico"** → Te lleva a `/historial-clinico-veterinario`

**Navegación superior:**
- **"Dashboard"** → Página actual
- **"Calendario"** → Tu agenda médica
- **"Mis Pacientes"** → Pacientes asignados
- **"Historial Clínico"** → Consultas registradas

### 📅 Calendario Médico (Ruta: `/calendario`)
**¿Para qué sirve?** Ver tu agenda médica y programación de citas.

**¿Qué ves?**
- Calendario mensual con tus citas marcadas
- Lista de citas del día seleccionado
- Información de cada cita (mascota, cliente, hora, motivo)

**Tipos de vista:**
- **Vista Mensual:** Calendario completo del mes
- **Vista de Lista:** Lista detallada de citas

**Estados de citas que puedes ver:**
- 🟢 **Confirmada:** Lista para atender
- 🔵 **Atendida:** Ya completada
- 🟡 **No Asistió:** El cliente no vino

**Botones disponibles:**
- **"Atender Cita"** → Solo aparece en citas confirmadas
- **"Ver Detalles"** → Información completa de la cita
- **"Marcar como No Asistió"** → Si el cliente no viene

### 🐕 Mis Pacientes (Ruta: `/mis-pacientes`)
**¿Para qué sirve?** Ver todos los pacientes (mascotas) que tienes asignados.

**¿Qué ves?**
- Lista de todas las mascotas que has atendido o tienes asignadas
- Información del propietario de cada mascota
- Historial de citas de cada paciente
- Herramientas de búsqueda

**Información mostrada:**
- **Nombre y foto de la mascota**
- **Especie, raza, edad**
- **Nombre del propietario**
- **Contacto del propietario**
- **Última consulta**
- **Próxima cita programada**

**Botones disponibles:**
- **"Ver Historial"** → Historial médico completo
- **"Contactar Propietario"** → Opciones de comunicación
- **"Nueva Consulta"** → Solo si hay cita activa

**Buscador:**
- Puedes buscar por nombre de mascota
- Filtrar por especie
- Buscar por nombre del propietario

### 📝 Atender Consulta
**¿Cuándo aparece?** Al hacer clic en "Atender Cita" desde el calendario.

**¿Qué ves?**
- Información de la mascota y el propietario
- Historial médico previo
- Formulario para registrar la consulta actual

**Información del paciente:**
- **Datos básicos:** Nombre, edad, peso, especie, raza
- **Propietario:** Nombre, teléfono, email
- **Historial:** Consultas anteriores, alergias, condiciones médicas

**Formulario de consulta:**
- **Motivo de consulta:** Por qué vino el cliente
- **Síntomas observados:** Lo que notaste en el examen
- **Signos vitales:**
  - Peso actual
  - Temperatura
  - Frecuencia cardíaca
  - Presión arterial
- **Diagnóstico:** Tu diagnóstico médico
- **Tratamiento:** Plan de tratamiento
- **Medicamentos:** Lista de medicinas recetadas
- **Exámenes:** Pruebas realizadas o solicitadas
- **Observaciones:** Notas adicionales
- **Próxima visita:** Cuándo debe volver

**Botones disponibles:**
- **"Guardar Consulta"** → Registra la consulta y marca cita como atendida
- **"Guardar Borrador"** → Guarda sin finalizar
- **"Cancelar"** → No guarda cambios

### 📖 Historial Clínico Veterinario (Ruta: `/historial-clinico-veterinario`)
**¿Para qué sirve?** Ver todas las consultas que has registrado.

**¿Qué ves?**
- Lista de todas las consultas que has realizado
- Filtros por fecha, mascota o tipo de consulta
- Estadísticas de tu trabajo

**Filtros disponibles:**
- **Por mascota:** Solo consultas de una mascota específica
- **Por fecha:** Rango de fechas
- **Por tipo de consulta:** General, emergencia, cirugía, etc.
- **Por cliente:** Consultas de un propietario específico

**Botones disponibles:**
- **"Ver Consulta"** → Detalles completos
- **"Editar"** → Modificar consulta (solo las más recientes)
- **"Exportar"** → Generar reporte en PDF

---

## 🟥 Manual del Administrador

### 👨‍💼 Dashboard del Administrador (Ruta: `/dashboard`)
**¿Cuándo llegas aquí?** Inmediatamente después de iniciar sesión como administrador.

**¿Qué ves?**
- Estadísticas generales de la clínica
- Citas pendientes de validación
- Resumen de ingresos
- Alertas y notificaciones importantes

**Estadísticas mostradas:**
- **Total de usuarios** (clientes, veterinarios)
- **Citas del día**
- **Citas pendientes de pago**
- **Ingresos del mes**
- **Mascotas registradas**

**Botones y enlaces:**
- **"Validar Pagos"** → Te lleva a `/validacion-pagos`
- **"Gestionar Citas"** → Te lleva a `/gestion-citas`
- **"Gestionar Usuarios"** → Te lleva a `/usuarios`
- **"Gestionar Veterinarios"** → Te lleva a `/veterinarios`

**Navegación superior:**
- **"Dashboard"** → Página actual
- **"Gestión de Citas"** → Administrar todas las citas
- **"Validación de Pagos"** → Aprobar/rechazar pagos
- **"Usuarios"** → Gestionar clientes
- **"Veterinarios"** → Gestionar doctores
- **"Servicios"** → Configurar precios y servicios

### 💳 Validación de Pagos (Ruta: `/validacion-pagos`)
**¿Para qué sirve?** Revisar y aprobar los comprobantes de pago subidos por los clientes.

**¿Qué ves?**
- Lista de citas con pagos pendientes de validación
- Comprobantes subidos por los clientes
- Información de cada cita y cliente

**Por cada cita pendiente:**
- **Información del cliente:** Nombre, contacto
- **Detalles de la cita:** Mascota, fecha, servicio, precio
- **Comprobante:** Imagen o PDF subido
- **Fecha de pago:** Cuándo se hizo la transferencia

**Botones disponibles:**
- **"Ver Comprobante"** → Muestra la imagen en tamaño completo
- **"Aprobar Pago"** → Confirma el pago y programa la cita
- **"Rechazar Pago"** → Rechaza el comprobante con motivo
- **"Agregar Notas"** → Comentarios sobre el pago

**¿Qué pasa al aprobar un pago?**
1. La cita cambia a estado "Aceptada"
2. Se asigna automáticamente un veterinario disponible
3. Se envía notificación al cliente
4. Se envía notificación al veterinario asignado

**¿Qué pasa al rechazar un pago?**
1. La cita cambia a estado "Rechazada"
2. Se envía notificación al cliente explicando el motivo
3. El cliente puede corregir y volver a subir el comprobante

### 📅 Gestión de Citas (Ruta: `/gestion-citas`)
**¿Para qué sirve?** Ver y administrar todas las citas de la clínica.

**¿Qué ves?**
- Lista completa de todas las citas (pasadas y futuras)
- Filtros para buscar citas específicas
- Estadísticas de citas por estado

**Filtros disponibles:**
- **Por estado:** Pendientes, confirmadas, atendidas, canceladas
- **Por fecha:** Rango de fechas específico
- **Por veterinario:** Citas de un doctor específico
- **Por cliente:** Citas de un cliente específico
- **Por mascota:** Citas de una mascota específica

**Botones por cita:**
- **"Ver Detalles"** → Información completa
- **"Editar"** → Modificar fecha, hora o detalles
- **"Cancelar"** → Cancelar la cita
- **"Eliminar"** → Borrar permanentemente
- **"Reasignar Veterinario"** → Cambiar el doctor asignado

**Estados de citas:**
- 🔴 **Pendiente de Pago:** Cliente debe subir comprobante
- 🟡 **En Validación:** Esperando aprobación de pago
- 🟢 **Aceptada:** Confirmada y programada
- 🔵 **Atendida:** Consulta realizada
- ⚫ **Cancelada:** No se realizará
- 🟤 **No Asistió:** Cliente no vino

### 👥 Gestión de Usuarios (Ruta: `/usuarios`)
**¿Para qué sirve?** Administrar todas las cuentas de clientes.

**¿Qué ves?**
- Lista de todos los clientes registrados
- Información básica de cada usuario
- Herramientas para gestionar cuentas

**Información mostrada:**
- **Nombre completo**
- **Email y teléfono**
- **Fecha de registro**
- **Número de mascotas**
- **Número de citas**
- **Estado de la cuenta** (activa/suspendida)

**Botones disponibles:**
- **"Ver Perfil"** → Información completa del cliente
- **"Editar"** → Modificar datos del usuario
- **"Suspender/Activar"** → Bloquear o desbloquear cuenta
- **"Eliminar"** → Borrar usuario (con confirmación)
- **"Ver Mascotas"** → Mascotas del cliente
- **"Ver Citas"** → Historial de citas

**Crear nuevo usuario:**
- **"Agregar Cliente"** → Formulario para crear cuenta manualmente
- Útil cuando el cliente no puede registrarse solo

### 🩺 Gestión de Veterinarios (Ruta: `/veterinarios`)
**¿Para qué sirve?** Administrar las cuentas de los doctores veterinarios.

**¿Qué ves?**
- Lista de todos los veterinarios
- Información profesional de cada uno
- Estadísticas de rendimiento

**Información mostrada:**
- **Nombre y foto**
- **Especialidad**
- **Experiencia**
- **Número de colegiatura**
- **Citas atendidas**
- **Calificación promedio**
- **Estado** (activo/inactivo)

**Botones disponibles:**
- **"Ver Perfil"** → Información completa
- **"Editar"** → Modificar datos profesionales
- **"Ver Agenda"** → Calendario del veterinario
- **"Ver Estadísticas"** → Rendimiento detallado
- **"Activar/Desactivar"** → Habilitar o deshabilitar

**Crear nuevo veterinario:**
- **"Agregar Veterinario"** → Formulario para registrar doctor

**Campos del formulario:**
- **Información personal:** Nombre, email, teléfono
- **Información profesional:** Especialidad, experiencia, colegiatura
- **Credenciales:** Usuario y contraseña
- **Horarios:** Disponibilidad de trabajo

### ⚙️ Servicios (Ruta: `/servicios`)
**¿Para qué sirve?** Configurar los servicios que ofrece la clínica y sus precios.

**¿Qué ves?**
- Lista de todos los servicios disponibles
- Precios actuales
- Configuración de cada servicio

**Servicios configurables:**
- **Consulta General**
- **Vacunación**
- **Emergencia**
- **Grooming**
- **Cirugía**
- **Diagnóstico**

**Por cada servicio puedes configurar:**
- **Nombre del servicio**
- **Descripción**
- **Precio en soles (S/.)**
- **Duración estimada**
- **Disponibilidad** (activo/inactivo)

**Botones disponibles:**
- **"Editar Servicio"** → Modificar configuración
- **"Activar/Desactivar"** → Habilitar o quitar del sistema
- **"Agregar Servicio"** → Crear nuevo tipo de consulta

---

## 🔧 Funciones Comunes

### 🔔 Notificaciones (Ruta: `/notificaciones`)
**¿Quién puede usarla?** Todos los usuarios registrados.

**¿Para qué sirve?** Ver todas las notificaciones y alertas del sistema.

**Tipos de notificaciones:**
- **Para clientes:**
  - Cita aceptada
  - Pago validado
  - Recordatorio de cita
  - Consulta registrada
- **Para veterinarios:**
  - Nueva cita asignada
  - Cambio en agenda
  - Recordatorio de consulta
- **Para administradores:**
  - Nuevo cliente registrado
  - Pago pendiente de validación
  - Alertas del sistema

**Botones disponibles:**
- **"Marcar como leída"** → Marca notificación como vista
- **"Marcar todas como leídas"** → Marca todas como vistas
- **"Eliminar"** → Borra notificación específica

### ⚙️ Configuración (Ruta: `/configuracion`)
**¿Quién puede usarla?** Todos los usuarios registrados.

**¿Para qué sirve?** Gestionar tu perfil personal y configuración de cuenta.

**Secciones disponibles:**
- **Información Personal:**
  - Nombre y apellidos
  - Email y teléfono
  - Dirección
  - Fecha de nacimiento
- **Seguridad:**
  - Cambiar contraseña
  - Configurar autenticación
- **Preferencias:**
  - Notificaciones por email
  - Idioma del sistema
  - Zona horaria

**Para veterinarios adicional:**
- **Información Profesional:**
  - Especialidad
  - Experiencia
  - Número de colegiatura
  - Biografía profesional

**Botones disponibles:**
- **"Guardar Cambios"** → Actualiza la información
- **"Subir Foto"** → Cambiar avatar
- **"Cambiar Contraseña"** → Actualizar clave de acceso

### 🚪 Cerrar Sesión
**¿Cómo hacerlo?**
1. Haz clic en tu avatar/foto en la esquina superior derecha
2. Selecciona "Cerrar Sesión" del menú desplegable
3. Confirma que quieres salir del sistema

**¿Qué pasa?**
- Se cierra tu sesión actual
- Vuelves a la página principal
- Necesitarás volver a iniciar sesión para acceder

---

## 🔍 Estados de las Citas - Explicación Completa

### 🔴 Pendiente de Pago
**¿Qué significa?** La cita fue creada pero falta el comprobante de pago.

**¿Qué debe hacer el cliente?**
1. Realizar el pago por transferencia o depósito
2. Tomar foto del comprobante
3. Subir el comprobante en "Mis Citas"

**¿Qué puede hacer el admin?** Esperar a que el cliente suba el comprobante.

### 🟡 En Validación
**¿Qué significa?** El cliente subió el comprobante y está esperando aprobación.

**¿Qué debe hacer el cliente?** Esperar la validación del administrador.

**¿Qué debe hacer el admin?**
1. Revisar el comprobante en "Validación de Pagos"
2. Verificar que coincida el monto y los datos
3. Aprobar o rechazar el pago

### 🟢 Aceptada/Confirmada
**¿Qué significa?** El pago fue aprobado y la cita está programada.

**¿Qué debe hacer el cliente?** Presentarse en la fecha y hora programada.

**¿Qué debe hacer el veterinario?** Prepararse para atender la consulta.

### 🔵 Atendida
**¿Qué significa?** La consulta ya fue realizada y registrada.

**¿Qué puede hacer el cliente?** Ver los detalles de la consulta en su historial.

**¿Qué hizo el veterinario?** Completó la consulta y registró el diagnóstico.

### ⚫ Cancelada
**¿Qué significa?** La cita fue cancelada por el cliente o por la clínica.

**¿Por qué puede pasar?**
- El cliente ya no necesita el servicio
- Emergencia del veterinario
- Problemas con el pago

### 🟤 No Asistió
**¿Qué significa?** El cliente no se presentó a su cita confirmada.

**¿Qué hace el veterinario?** Marca la cita como "No Asistió" después de esperar.

### 🔴 Rechazada
**¿Qué significa?** El comprobante de pago no fue válido.

**¿Qué debe hacer el cliente?**
1. Revisar el motivo del rechazo
2. Corregir el problema
3. Volver a subir un comprobante válido

---

## 📱 Acceso desde Dispositivos Móviles

### 📲 ¿Cómo acceder desde el celular?
1. Abre el navegador de tu celular (Chrome, Safari, Firefox)
2. Escribe la dirección web de tu clínica
3. La página se adapta automáticamente al tamaño de tu pantalla
4. Inicia sesión normalmente

### 🎯 ¿Qué funciona igual en móvil?
- Todas las funciones están disponibles
- Los formularios se adaptan al tamaño de pantalla
- Puedes subir fotos directamente desde la cámara
- Las notificaciones funcionan normalmente

### 📸 ¿Cómo subir fotos desde móvil?
1. Cuando el sistema pida una imagen
2. Selecciona "Cámara" para tomar foto nueva
3. O selecciona "Galería" para elegir foto existente
4. La imagen se comprime automáticamente

---

## ❓ Resolución de Problemas Comunes

### 🔐 No puedo iniciar sesión
**Posibles causas y soluciones:**

1. **Contraseña incorrecta:**
   - Verifica que no esté activado el Bloq Mayús
   - Usa "¿Olvidaste tu contraseña?" para resetearla

2. **Email/usuario incorrecto:**
   - Verifica que escribiste bien tu email
   - Contacta al administrador si no recuerdas tu usuario

3. **Cuenta suspendida:**
   - Contacta al administrador de la clínica

### 📤 No puedo subir comprobante
**Posibles causas y soluciones:**

1. **Archivo muy grande:**
   - La imagen debe ser menor a 10MB
   - Comprime la imagen antes de subirla

2. **Formato no válido:**
   - Solo se aceptan: JPG, PNG, PDF
   - Convierte la imagen al formato correcto

3. **Internet lento:**
   - Espera un poco más
   - Intenta desde una conexión más rápida

### 📅 No veo mis citas
**Posibles causas y soluciones:**

1. **Filtros activados:**
   - Revisa si hay filtros aplicados
   - Limpia todos los filtros

2. **No has agendado citas:**
   - Ve a "Nueva Cita" para agendar
   - Contacta a la clínica si agendaste por teléfono

### 🔄 La página no carga
**Soluciones:**

1. **Actualiza la página:**
   - Presiona F5 o Ctrl+R
   - En móvil: desliza hacia abajo para refrescar

2. **Verifica internet:**
   - Asegúrate de tener conexión
   - Intenta abrir otras páginas web

3. **Limpia caché:**
   - Borra datos del navegador
   - Cierra y abre el navegador nuevamente

### 📞 ¿Cuándo contactar a soporte?
- No puedes acceder después de varios intentos
- Ves errores extraños en la página
- Los datos no se guardan correctamente
- Tienes problemas con el pago que no puedes resolver

---

## 📞 Información de Contacto y Soporte

### 🏥 Contacto de la Clínica
- **Teléfono:** [Número de la clínica]
- **Email:** [Email de la clínica]
- **Dirección:** [Dirección física]
- **Horarios:** [Horarios de atención]

### 💻 Soporte Técnico
- **Email de soporte:** [Email técnico]
- **Horarios de soporte:** [Horarios disponibles]
- **Documentación:** Esta guía y tutoriales adicionales

### 🚨 Emergencias Veterinarias
- **Teléfono de emergencias:** [Número 24/7]
- **Para emergencias reales:** Llama directamente, no uses el sistema web

---

## 📖 Glosario de Términos

**Dashboard:** Página principal donde ves el resumen de tu información.

**Comprobante:** Imagen o documento que prueba que realizaste un pago.

**Estado de cita:** Situación actual de tu cita (pendiente, confirmada, atendida, etc.).

**Historial clínico:** Registro de todas las consultas médicas de tu mascota.

**Notificación:** Mensaje que el sistema te envía para informarte sobre algo importante.

**Validación:** Proceso donde el administrador verifica que tu pago es correcto.

**Rol:** Tipo de usuario que eres (cliente, veterinario, administrador).

**Sesión:** Período de tiempo que estás conectado al sistema.

**URL/Dirección web:** La dirección que escribes en el navegador para acceder al sistema.

---

## ✅ Lista de Verificación para Nuevos Usuarios

### 👤 Para Clientes Nuevos:
- [ ] Registrarte en el sistema con email válido
- [ ] Completar tu perfil con información de contacto
- [ ] Registrar al menos una mascota
- [ ] Agendar tu primera cita
- [ ] Subir comprobante de pago
- [ ] Verificar notificaciones

### 🩺 Para Veterinarios Nuevos:
- [ ] Recibir credenciales del administrador
- [ ] Iniciar sesión y cambiar contraseña
- [ ] Completar perfil profesional
- [ ] Revisar agenda de citas asignadas
- [ ] Familiarizarse con el formulario de consultas
- [ ] Probar el registro de una consulta de prueba

### 👨‍💼 Para Administradores Nuevos:
- [ ] Configurar información básica de la clínica
- [ ] Crear cuentas de veterinarios
- [ ] Configurar servicios y precios
- [ ] Probar el proceso de validación de pagos
- [ ] Configurar notificaciones del sistema
- [ ] Revisar estadísticas y reportes

---

**💡 Consejo Final:** Este manual cubre todas las funciones principales del sistema. Si encuentras algo que no está explicado aquí, no dudes en contactar al soporte técnico o al administrador de tu clínica. ¡El sistema está diseñado para ser fácil de usar, así que con un poco de práctica te sentirás cómodo usándolo!

---

<div align="center">
  <p><strong>🩺 Manual de Usuario PetLA v1.0</strong></p>
  <p><em>Sistema de Gestión Veterinaria - Diseñado para clínicas modernas</em></p>
  <p>© 2024 - Todos los derechos reservados</p>
</div>
