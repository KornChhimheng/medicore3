import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx'; // Your existing Header component

// New page components
import AppointmentsPage from './components/AppointmentsPage.jsx';
import PrescriptionsPage from './components/PrescriptionsPage.jsx';
import BillingPage from './components/BillingPage.jsx';
import PatientManagementPage from './components/PatientManagementPage.jsx'; 

// Import the PatientDashboard component (assuming its path is correct)
import PatientDashboard from './pages/PatientDashboard.jsx';

// Import the new ReceptionistDashboard component (assuming its path is correct)
import ReceptionistDashboard from './pages/Receptionist/ReceptionistDashboard.jsx';

// Firebase imports
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore'; // Removed orderBy as per earlier instructions

// Main App component
const App = () => {
  // Firebase and Auth States
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [firebaseInitError, setFirebaseInitError] = useState(null); // State for Firebase init errors

  // State for medication lookup feature (local to App, passed to MedicationLookup via PatientDashboard)
  const [medicationName, setMedicationName] = useState('');
  const [medicationInfo, setMedicationInfo] = useState('');
  const [isLoadingMedInfo, setIsLoadingMedInfo] = useState(false);
  const [medInfoError, setMedInfoError] = useState('');

  // State for Appointments data (fetched from Firestore, passed to PatientDashboard and AppointmentsPage)
  const [appointments, setAppointments] = useState([]);

  // State for Billing History data (fetched from Firestore, passed to PatientDashboard and BillingPage)
  const [billingHistory, setBillingHistory] = useState([]);

  // State for current page/view (controls content rendered in main area)
  const [currentPage, setCurrentPage] = useState('dashboard'); // Default to 'dashboard'


  // Effect hook for Firebase Initialization and Authentication Listener
  useEffect(() => {
    let appInstance;
    let firestoreInstance;
    let authInstance;

    try {
      // Accessing global variables provided by the Canvas environment
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
      const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

      console.log("Firebase Init: Attempting to initialize Firebase...");
      console.log("Firebase Init: App ID:", appId);
      console.log("Firebase Init: Config provided:", Object.keys(firebaseConfig).length > 0);

      if (Object.keys(firebaseConfig).length === 0) {
        const errorMsg = "Firebase config is missing or empty. Cannot initialize Firebase. Please ensure __firebase_config is set.";
        console.error("Firebase Init Error:", errorMsg);
        setFirebaseInitError(errorMsg);
        setIsAuthReady(true); // Unblock UI even on init failure
        return;
      }

      // Initialize Firebase app, Firestore, and Auth instances
      appInstance = initializeApp(firebaseConfig);
      firestoreInstance = getFirestore(appInstance);
      authInstance = getAuth(appInstance);

      setDb(firestoreInstance);
      setAuth(authInstance);

      console.log("Firebase Init: App initialized successfully. Setting up auth listener...");

      // Set up authentication state observer
      const unsubscribeAuth = onAuthStateChanged(authInstance, async (user) => {
        if (user) {
          console.log("Auth State: User is signed in. UID:", user.uid);
          setUserId(user.uid);
        } else {
          console.log("Auth State: No user signed in. Attempting anonymous sign-in or custom token...");
          try {
            if (initialAuthToken) {
              await signInWithCustomToken(authInstance, initialAuthToken);
              console.log("Auth State: Signed in with custom token.");
            } else {
              await signInAnonymously(authInstance);
              console.log("Auth State: Signed in anonymously.");
            }
            // Ensure userId is set after successful sign-in
            setUserId(authInstance.currentUser?.uid || crypto.randomUUID());
          } catch (error) {
            const authErrorMsg = `Auth State Error: Failed to sign in: ${error.message}`;
            console.error(authErrorMsg, error);
            setFirebaseInitError(authErrorMsg);
            setUserId(crypto.randomUUID()); // Fallback to random ID to proceed if sign-in fails
          }
        }
        setIsAuthReady(true); // Auth state is now ready, whether successful or with fallback/error
        console.log("Auth State: isAuthReady set to true.");
      });

      // Cleanup function for auth listener
      return () => {
        console.log("Firebase Cleanup: Unsubscribing from auth listener.");
        unsubscribeAuth();
      };
    } catch (err) {
      // Catch any errors during the initial Firebase setup
      const initErrorMsg = `Firebase Initialization Failed: ${err.message}`;
      console.error(initErrorMsg, err);
      setFirebaseInitError(initErrorMsg);
      setIsAuthReady(true); // Unblock UI even on critical init failure
    }
  }, []); // Empty dependency array means this effect runs only once on component mount

  // Effect hook for fetching Appointments and Billing History from Firestore
  useEffect(() => {
    // Only proceed if Firebase is initialized, authentication is ready, and a userId is available
    if (!db || !isAuthReady || !userId || firebaseInitError) {
      console.log("Firestore Data Fetch: Skipping fetch. Conditions not met:",
        "DB:", !!db, "AuthReady:", isAuthReady, "UserID:", !!userId, "InitError:", !!firebaseInitError);
      return;
    }

    console.log("Firestore Data Fetch: Attempting to fetch data for user:", userId);

    // Subscribe to Appointments collection for real-time updates
    // Data stored in /artifacts/{appId}/users/${userId}/appointments
    const appointmentsCollectionPath = `artifacts/${__app_id}/users/${userId}/appointments`;
    console.log("Firestore: Subscribing to appointments at:", appointmentsCollectionPath);
    const qAppointments = query(collection(db, appointmentsCollectionPath));

    const unsubscribeAppointments = onSnapshot(qAppointments, (snapshot) => {
      console.log("Firestore: Appointments data received.");
      const appointmentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAppointments(appointmentsData);
    }, (error) => {
      console.error("Firestore Error: Error fetching appointments:", error);
    });

    // Subscribe to Billing History collection for real-time updates
    // Data stored in /artifacts/{appId}/users/${userId}/billingHistory
    const billingCollectionPath = `artifacts/${__app_id}/users/${userId}/billingHistory`;
    console.log("Firestore: Subscribing to billing history at:", billingCollectionPath);
    const qBillingHistory = query(collection(db, billingCollectionPath));

    const unsubscribeBillingHistory = onSnapshot(qBillingHistory, (snapshot) => {
      console.log("Firestore: Billing history data received.");
      const billingHistoryData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBillingHistory(billingHistoryData);
    }, (error) => {
      console.error("Firestore Error: Error fetching billing history:", error);
    });

    return () => {
      console.log("Firestore Cleanup: Unsubscribing from Firestore listeners.");
      unsubscribeAppointments();
      unsubscribeBillingHistory();
    };
  }, [db, isAuthReady, userId, firebaseInitError]); // Re-run effect if these dependencies change


  // Function to fetch medication information using Gemini API (remains in App.jsx as it uses API key logic)
  const getMedicationInformation = async () => {
    if (!medicationName.trim()) {
      setMedInfoError("Please enter a medication name.");
      setMedicationInfo(""); // Clear previous info if validation fails
      return;
    }

    setIsLoadingMedInfo(true);
    setMedInfoError(""); // Clear previous errors
    setMedicationInfo(""); // Clear previous info on new search

    try {
      const prompt = `Provide a concise summary about the medication "${medicationName}". Include its primary uses and common side effects.`;
      
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });

      const payload = { contents: chatHistory };
      const apiKey = ""; // Canvas will automatically provide the API key
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setMedicationInfo(text);
      } else {
        setMedInfoError("Could not retrieve information. Please try again.");
        console.error("Gemini API response structure unexpected:", result);
      }
    } catch (error) {
      console.error("Error fetching medication info:", error);
      setMedInfoError("Failed to fetch information. Please check your network connection or try again later.");
    } finally {
      setIsLoadingMedInfo(false);
    }
  };

  // Function to render the current page content based on currentPage state
  const renderPageContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          // PatientDashboard component will handle its own padding/background
          <PatientDashboard
            medicationName={medicationName}
            setMedicationName={setMedicationName}
            medicationInfo={medicationInfo}
            setMedicationInfo={setMedicationInfo}
            isLoadingMedInfo={isLoadingMedInfo}
            setIsLoadingMedInfo={setIsLoadingMedInfo}
            medInfoError={medInfoError}
            setMedInfoError={setMedInfoError}
            getMedicationInformation={getMedicationInformation}
            appointments={appointments}
            billingHistory={billingHistory}
          />
        );
      case 'appointments':
        return (
          // AppointmentsPage component will handle its own padding/background
          <AppointmentsPage appointments={appointments} />
        );
      case 'prescriptions':
        return (
          // PrescriptionsPage component will handle its own padding/background
          <PrescriptionsPage />
        );
      case 'billing':
        return (
          // BillingPage component will handle its own padding/background
          <BillingPage billingHistory={billingHistory} />
        );
      case 'receptionistDashboard':
        return (
          // ReceptionistDashboard component will handle its own padding/background
          <ReceptionistDashboard />
        );
      case 'patientManagement':
        return (
          // PatientManagementPage component will handle its own padding/background
          <PatientManagementPage />
        );
      default:
        return (
          <div className="text-center py-10 px-8 w-full bg-white rounded-2xl shadow-lg"> {/* Added default styling for unknown page */}
            <h2 className="text-2xl text-gray-700">Page Not Found</h2>
            <p className="text-gray-500">Please select an option from the sidebar.</p>
          </div>
        );
    }
  };

  // Display loading screen if authentication is not yet ready or if there's a Firebase init error
  if (!isAuthReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700 text-lg">
          Loading dashboard...
          {firebaseInitError && (
            <span className="text-red-500 block text-sm mt-2">
              Error: {firebaseInitError}. Please check your console for more details.
            </span>
          )}
        </p>
      </div>
    );
  }

  // Main application layout once authentication is ready
  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased flex w-full">
      {/* Sidebar - fixed and full height */}
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />

      {/* Main Content Wrapper - takes up remaining space and is offset by sidebar width */}
      <div className="flex flex-col flex-1 ml-64"> {/* This div ensures header and content are shifted */}
        <Header /> {/* Your Header component */}

        {/* This div wraps the user ID display and the current page content */}
        {/* Added padding-top to ensure content starts below the header */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8"> {/* Adjusted padding here */}
          {/* Display User ID for debugging/multi-user context */}
          {userId && (
              <div className="bg-blue-100 text-blue-800 p-2 rounded-lg mb-4 text-sm"> {/* No mx-8 here, as outer div has padding */}
                  User ID: <span className="font-mono text-xs">{userId}</span>
              </div>
          )}

          {/* Render the current page content */}
          {renderPageContent()}
        </div>
      </div>
    </div>
  );
};

export default App;
