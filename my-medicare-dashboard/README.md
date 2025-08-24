# MediCore Dashboard v3

A modern React-based hospital management system dashboard with separate interfaces for patients and receptionists.

## 🚀 Features

### Patient Dashboard

- **Profile Section**: View personal information and medical details
- **Appointments**: View and manage personal appointments
- **Medication Lookup**: AI-powered medication information using Gemini API
- **Billing History**: View personal billing records

### Receptionist Dashboard

- **Patient Management**: Add, edit, and delete patient records
- **Appointment Management**: Schedule and manage appointments
- **Patient Registration**: Form to register new patients
- **Overview Statistics**: Quick view of daily tasks and metrics

### Static Pages (Placeholders)

- **Billing Page**: Sample billing history with summary cards
- **Prescriptions Page**: Sample prescription management interface

## 🏗️ Project Structure

```
my-medicare-dashboard/
├── src/
│   ├── common/              # Shared reusable components
│   │   ├── Header.jsx
│   │   ├── InfoCards.jsx
│   │   ├── MedicationLookup.jsx
│   │   ├── Sidebar.jsx
│   │   └── AuthModal.jsx
│   ├── patient/             # Patient-specific app
│   │   ├── PatientApp.jsx   # Router + layout for patient dashboard
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── BillingPage.jsx
│   │   │   └── PrescriptionsPage.jsx
│   │   └── components/
│   │       ├── WelcomeCard.jsx
│   │       ├── AppointmentsTable.jsx
│   │       └── BillingHistoryTable.jsx
│   ├── receptionist/        # Receptionist-specific app
│   │   ├── ReceptionistApp.jsx # Router + layout for receptionist dashboard
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   └── components/
│   │       ├── ReceptionistAppointments.jsx
│   │       ├── RegisterPatientForm.jsx
│   │       ├── ReceptionistWelcomeCard.jsx
│   │       ├── PatientManagementPage.jsx
│   │       ├── CreateAppointmentForm.jsx
│   │       └── AppointmentsPage.jsx
│   ├── services/            # API services
│   │   └── apiService.js
│   ├── App.jsx             # Main app with routing
│   └── main.jsx
```

## 🛣️ Routing

The application uses React Router with the following routes:

- `/` → Redirects to `/patient`
- `/patient/*` → Patient Dashboard and sub-routes
- `/receptionist/*` → Receptionist Dashboard and sub-routes

Patient sub-routes:
- `/patient/` → Patient Dashboard
- `/patient/billing` → Patient Billing Page
- `/patient/prescriptions` → Patient Prescriptions Page

Receptionist sub-routes:
- `/receptionist/` → Receptionist Dashboard
- `/receptionist/patients` → Patient Management Page

## 🔧 API Integration

### Configuration

Set the API URL in your environment:

```bash
VITE_API_URL=http://localhost:9090
```

### Available API Functions

#### Patients

- `getPatients(params)` → GET /api/patient
- `getPatientById(id)` → GET /api/patient/{id}
- `addPatient(data)` → POST /auth/patient-register
- `updatePatient(id, data)` → PUT /api/patient/{id}
- `deletePatient(id)` → DELETE /api/patient/{id}

#### Appointments

- `getAppointments()` → GET /api/list-appointment
- `addAppointment(data)` → POST /api/appointment
- `updateAppointment(id, data)` → PUT /api/appointment/{id}
- `deleteAppointment(id)` → DELETE /api/delete-appointment/id={id}

## 🚀 Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env` file in the root directory:

   ```
   VITE_API_URL=http://localhost:9090
   ```

3. **Start development server**:

   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface using Tailwind CSS
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Automatic theme detection
- **Interactive Components**: Hover effects, transitions, and animations
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🔮 Future Enhancements

- **Real-time Updates**: WebSocket integration for live data
- **Advanced Filtering**: Search and filter capabilities
- **Export Features**: PDF generation for reports
- **Mobile App**: React Native companion app
- **Analytics Dashboard**: Advanced reporting and analytics
- **Multi-language Support**: Internationalization (i18n)

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **AI Integration**: Gemini API for medication lookup

## 📝 Notes

- Static pages (Billing, Prescriptions) are placeholders until backend API endpoints are available
- Current implementation uses mock data for demonstration
- API service is ready for integration with the Spring Boot backend
- All components are modular and reusable
