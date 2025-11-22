import { useState, useCallback, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { signup } from "../api/auth";
import { EmailValidation } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

// Success Modal Component
const SuccessModal = ({ onClose }) => (
  <div className="fixed inset-0 backdrop-blur-sm bg-gray-900/30 flex items-center justify-center z-50 p-4">
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
          className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
        >
          Continue to Login
        </button>
      </div>
    </div>
  </div>
);

// Step 1 Component - Personal Information
const PersonalInfoStep = ({
  formData,
  errors,
  handleChange,
  handleNext,
  handleEmailBlur,
  isCheckingEmail,
}) => (
  <>
    <div className="text-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h1>
      <p className="text-gray-600 text-sm">Step 1: Personal Information</p>
    </div>

    <form onSubmit={handleNext} className="space-y-4">
      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Choose user Type
        </label>
        <select
          name="role"
          id="role"
          className={`w-full px-3 py-2.5 rounded-lg border ${
            errors.role
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-gray-500"
          } focus:outline-none focus:ring-2 transition-colors`}
          value={formData.role}
          onChange={handleChange}
        >
          <option value="">Select Role</option>
          <option value="BUYER">Buyer</option>
          <option value="SELLER">Seller</option>
        </select>
        {errors.role && (
          <p className="mt-1 text-sm text-red-600">{errors.role}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={`w-full px-3 py-2.5 rounded-lg border ${
            errors.fullName
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-gray-500"
          } focus:outline-none focus:ring-2 transition-colors`}
          placeholder="John Doe"
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleEmailBlur}
            className={`w-full px-3 py-2.5 rounded-lg border ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-gray-500"
            } ${
              isCheckingEmail ? "pr-10" : ""
            } focus:outline-none focus:ring-2 transition-colors`}
            placeholder="your@email.com"
            disabled={isCheckingEmail}
          />
          {isCheckingEmail && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
            </div>
          )}
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
        {!errors.email && formData.email && !isCheckingEmail && (
          <p className="mt-1 text-sm text-green-600">Email is available</p>
        )}
      </div>

      <div>
        <label
          htmlFor="phoneNumber"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className={`w-full px-3 py-2.5 rounded-lg border ${
            errors.phoneNumber
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-gray-500"
          } focus:outline-none focus:ring-2 transition-colors`}
          placeholder="1234567890"
        />
        {errors.phoneNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 mt-2"
      >
        Next
      </button>
    </form>

    <div className="mt-4 text-center">
      <p className="text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-gray-600 hover:text-gray-500"
        >
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
  isSubmitting,
}) => (
  <>
    <div className="text-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h1>
      <p className="text-gray-600 text-sm">Step 2: Password Setup</p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword.password ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2.5 rounded-lg border ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-gray-500"
            } focus:outline-none focus:ring-2 transition-colors pr-12`}
            placeholder="••••••••"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => togglePasswordVisibility("password")}
          >
            {showPassword.password ? (
              <EyeSlashIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showPassword.confirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-3 py-2.5 rounded-lg border ${
              errors.confirmPassword
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-gray-500"
            } focus:outline-none focus:ring-2 transition-colors pr-12`}
            placeholder="••••••••"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => togglePasswordVisibility("confirmPassword")}
          >
            {showPassword.confirmPassword ? (
              <EyeSlashIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={handleBack}
          className="flex-1 py-2.5 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex-1 py-2.5 px-4 rounded-lg bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center ${
            isSubmitting ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating...
            </>
          ) : (
            "Sign Up"
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
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Debounced email validation function
  const validateEmail = useCallback(
    debounce(async (email) => {
      if (!email) return;

      // Basic email format validation first
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email address",
        }));
        return;
      }

      setIsCheckingEmail(true);
      try {
        const result = await EmailValidation(email);
        if (!result.available) {
          setErrors((prev) => ({
            ...prev,
            email: "Email is already registered",
          }));
        } else {
          setErrors((prev) => ({ ...prev, email: "" }));
        }
      } catch (error) {
        console.error("Email validation failed:", error);
        // Don't show error to user if the validation API fails
      } finally {
        setIsCheckingEmail(false);
      }
    }, 500), // 500ms debounce delay
    []
  );

  // Handlers
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear email error when user starts typing again
      if (name === "email" && errors.email) {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    },
    [errors]
  );

  const handleEmailBlur = (e) => {
    validateEmail(e.target.value);
  };

  const togglePasswordVisibility = useCallback((field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  }, []);

  // Cleanup debounce on component unmount
  useEffect(() => {
    return () => {
      validateEmail.cancel();
    };
  }, [validateEmail]);

  // Validation
  const validatePart1 = () => {
    const newErrors = {};
    if (!formData.role) newErrors.role = "Please select a role";
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required";
    else if (!/^\d{10,15}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Invalid phone number (10-15 digits)";

    // Check if email validation has already flagged this email as taken
    if (errors.email && errors.email.includes("already registered")) {
      newErrors.email = errors.email;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePart2 = () => {
    const newErrors = {};
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
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
        role: formData.role,
      });
      console.log("✅ Registration successful:", data);
      setShowSuccessModal(true);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        formError:
          error.response?.data?.message ||
          error.message ||
          "Signup failed. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/login");
  };

  return (
    <div className="flex overflow-hidden mt-10  rounded-2xl shadow-lg max-w-6xl mx-auto h-[593px]">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-black to-gray-800 p-8 flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-white opacity-5"></div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full -mr-40 -mt-40"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-10 rounded-full -ml-40 -mb-40"></div>

          <div className="relative z-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-white text-xl font-bold">ShopMind</span>
            </div>
          </div>

          <div className="relative z-10 text-white">
            <h2 className="text-2xl font-bold mb-4">Join ShopMind Today</h2>
            <p className="text-gray-300 mb-6">
              Create your account and start your journey with our comprehensive
              e-commerce platform.
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5"
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
                <div>
                  <h3 className="font-semibold">Secure Platform</h3>
                  <p className="text-gray-400 text-sm">
                    Your data is protected with enterprise-grade security
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5"
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
                <div>
                  <h3 className="font-semibold">Easy Management</h3>
                  <p className="text-gray-400 text-sm">
                    Intuitive interface for seamless experience
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5"
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
                <div>
                  <h3 className="font-semibold">24/7 Support</h3>
                  <p className="text-gray-400 text-sm">
                    Our team is always here to help you
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-gray-400 text-xs">
            © 2024 ShopMind. All rights reserved.
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <div className="w-full max-w-sm">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-6 text-center">
              <div className="inline-flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-900 to-black rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <span className="text-gray-800 text-lg font-bold">
                  ShopMind
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl">
              {errors.formError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {errors.formError}
                </div>
              )}

              {step === 1 ? (
                <PersonalInfoStep
                  formData={formData}
                  errors={errors}
                  handleChange={handleChange}
                  handleNext={handleNext}
                  handleEmailBlur={handleEmailBlur}
                  isCheckingEmail={isCheckingEmail}
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
          </div>
        </div>
      

      {showSuccessModal && <SuccessModal onClose={closeSuccessModal} />}
    </div>
  );
};

export default RegistrationForm;
