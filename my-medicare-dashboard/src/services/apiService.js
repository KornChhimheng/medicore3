import axios from "axios";

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:9090",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Patient API functions
export const patientAPI = {
  // Get all patients with optional query parameters
  getPatients: async (params = {}) => {
    const response = await apiClient.get("/api/patient", { params });
    return response.data;
  },

  // Get patient by ID
  getPatientById: async (id) => {
    const response = await apiClient.get(`/api/patient/${id}`);
    return response.data;
  },

  // Add new patient
  addPatient: async (data) => {
    const response = await apiClient.post("/auth/patient-register", data);
    return response.data;
  },

  // Update patient
  updatePatient: async (id, data) => {
    const response = await apiClient.put(`/api/patient/${id}`, data);
    return response.data;
  },

  // Delete patient
  deletePatient: async (id) => {
    const response = await apiClient.delete(`/api/patient/${id}`);
    return response.data;
  },
};

// Appointment API functions
export const appointmentAPI = {
  // Get all appointments
  getAppointments: async () => {
    const response = await apiClient.get("/api/appointment");
    return response.data;
  },

  // Add new appointment
  addAppointment: async (data) => {
    const response = await apiClient.post("/api/appointment", data);
    return response.data;
  },

  // Update appointment
  updateAppointment: async (id, data) => {
    const response = await apiClient.put(`/api/appointment/${id}`, data);
    return response.data;
  },

  // Delete appointment
  deleteAppointment: async (id) => {
    const response = await apiClient.delete(`/api/appointment/${id}`);
    return response.data;
  },
};

// Doctor API functions (for future use)
export const doctorAPI = {
  // Get all doctors
  getDoctors: async () => {
    const response = await apiClient.get("/api/doctor");
    return response.data;
  },

  // Get doctor by ID
  getDoctorById: async (id) => {
    const response = await apiClient.get(`/api/doctor/${id}`);
    return response.data;
  },

  // Add new doctor
  addDoctor: async (data) => {
    const response = await apiClient.post("/auth/doctor-register", data);
    return response.data;
  },

  // Update doctor
  updateDoctor: async (id, data) => {
    const response = await apiClient.put(`/api/doctor/${id}`, data);
    return response.data;
  },

  // Delete doctor
  deleteDoctor: async (id) => {
    const response = await apiClient.delete(`/api/doctor/${id}`);
    return response.data;
  },
};

// Auth API functions
export const authAPI = {
  // Login
  login: async (credentials) => {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  },

  // Register
  register: async (userData) => {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  },
};

export default apiClient;
