import { useState, useCallback } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { signup } from '../api/auth';
import { useNavigate } from 'react-router-dom';

// Success Modal Component
const SuccessModal = ({ onClose }) => (
  <div className="fixed inset-0 backdrop-blur-sm bg-purple-100/30 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full animate-fade-in">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
        <p className="text-gray-600 mb-6 text-1xl font-bold">
          Account created successfully! 🎉 Check your email for verification.
        </p>
        <button
          onClick={onClose}
          className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
        >
          Continue to Login
        </button>
      </div>
    </div>
  </div>
);

// Step 1 Component - Personal Information
const PersonalInfoStep = ({ formData, errors, handleChange, handleNext }) => (
  <>
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
      <p className="text-gray-600">Step 1: Personal Information</p>
    </div>

    <form onSubmit={handleNext}>
      <div className="mb-4">
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2 transition-colors`}
          placeholder="John Doe"
        />
        {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2 transition-colors`}
          placeholder="your@email.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border ${errors.phoneNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2 transition-colors`}
          placeholder="1234567890"
        />
        {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
      >
        Next
      </button>
    </form>

    <div className="mt-6 text-center">
      <p className="text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
          Login
        </Link>
      </p>
    </div>
  </>
);

// Step 2 Component - Password Setup
const PasswordStep = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
  showPassword,
  togglePasswordVisibility,
  handleBack,
  isSubmitting
}) => (
  <>
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
      <p className="text-gray-600">Step 2: Password Setup</p>
    </div>

    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword.password ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2 transition-colors pr-12`}
            placeholder="••••••••"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => togglePasswordVisibility('password')}
          >
            {showPassword.password ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showPassword.confirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2 transition-colors pr-12`}
            placeholder="••••••••"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => togglePasswordVisibility('confirmPassword')}
          >
            {showPassword.confirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>
        {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex-1 py-3 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </>
          ) : (
            'Sign Up'
          )}
        </button>
      </div>
    </form>
  </>
);

// Main RegistrationForm Component
const RegistrationForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Handlers
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  }, [errors]);

  const togglePasswordVisibility = useCallback((field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  }, []);

  // Validation
  const validatePart1 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    else if (!/^\d{10,15}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Invalid phone number (10-15 digits)';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePart2 = () => {
    const newErrors = {};
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation
  const handleNext = (e) => {
    e.preventDefault();
    if (validatePart1()) setStep(2);
  };

  const handleBack = () => setStep(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePart2()) return;

    setIsSubmitting(true);
    try {
      const data = await signup({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phoneNumber,
        password: formData.password,
        role: "BUYER"
      });
      console.log("✅ Registration successful:", data);
      setShowSuccessModal(true);
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        formError: error.response?.data?.message || error.message || 'Signup failed. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    // You can redirect to login page here if you want
    navigate('/login');
  };

  return (
    <div className="h-3/4 bg-gradient-to-br flex items-center justify-center p-3 mt-6">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transition-all duration-500 ease-in-out relative">
        {errors.formError && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
            {errors.formError}
          </div>
        )}
        
        {step === 1 ? (
          <PersonalInfoStep
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleNext={handleNext}
          />
        ) : (
          <PasswordStep
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            handleBack={handleBack}
            isSubmitting={isSubmitting}
          />
        )}
      </div>

      {showSuccessModal && <SuccessModal onClose={closeSuccessModal} />}
    </div>
  );
};

export default RegistrationForm;