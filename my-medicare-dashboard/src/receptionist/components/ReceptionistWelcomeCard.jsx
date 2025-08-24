import React from "react";
// IMPORTANT: Import your receptionist image here.
// Replace 'your-receptionist-image.png' with the actual filename of your image.
import receptionistImage from "../../assets/doctor.png"; // Example path, adjust if your image is elsewhere

const ReceptionistWelcomeCard = () => {
  const [imageSrc, setImageSrc] = React.useState(receptionistImage);

  // Fallback placeholder image in case the main image fails to load
  const handleImageError = () => {
    setImageSrc("https://placehold.co/150x150/ffffff/000000?text=Receptionist");
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-lg mb-8 flex items-center justify-between">
      <div>
        <p className="text-lg mb-1">Good Morning,</p>
        <h2 className="text-4xl font-extrabold mb-2">Miss. Vicheka</h2>{" "}
        {/* Name can be dynamic later */}
        <p className="text-xl mb-4">Today's tasks</p>
        {/* Task Summary Cards - similar to InfoCards, but embedded directly or in a sub-component */}
        <div className="flex space-x-4">
          <div className="bg-teal-500 p-4 rounded-xl flex items-center">
            {" "}
            {/* Greenish-blue for Appointments */}
            <svg
              className="w-8 h-8 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h.01M10 16h.01" />
            </svg>
            <div>
              <p className="text-md font-semibold">12</p>
              <p className="text-sm">Appointments</p>
            </div>
          </div>
          <div className="bg-orange-500 p-4 rounded-xl flex items-center">
            {" "}
            {/* Orange for Billing */}
            <svg
              className="w-8 h-8 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L6 8v14h12V8L12 2zm0 2.828L15.172 8H8.828L12 4.828zM10 12h4v2h-4v-2z" />
            </svg>
            <div>
              <p className="text-md font-semibold">$ 2.300</p>
              <p className="text-sm">Billing</p>
            </div>
          </div>
        </div>
      </div>
      {/* Receptionist Illustration */}
      <img
        src={imageSrc} // Now uses state for dynamic source
        alt="Receptionist Illustration"
        className="w-40 h-40 object-contain rounded-full"
        onError={handleImageError} // Call onError if image fails to load
      />
    </div>
  );
};

export default ReceptionistWelcomeCard;
