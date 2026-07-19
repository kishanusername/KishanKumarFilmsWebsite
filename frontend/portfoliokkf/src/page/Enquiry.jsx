import { Link } from "react-router-dom";
import { useState } from "react";
import "./Enquiry.css";

// ---------------------------------------------------------------------------
// OPTION A: EmailJS (client-side only, no backend required)
// 1. npm install @emailjs/browser
// 2. Uncomment the import below and the sendViaEmailJS() call in handleSubmit
// ---------------------------------------------------------------------------
// import emailjs from "@emailjs/browser";

// ---------------------------------------------------------------------------
// OPTION B: Express backend
// Point this at your Node/Express route, e.g. app.post('/api/enquiry', ...)
// ---------------------------------------------------------------------------
const BACKEND_ENDPOINT = "/api/enquiry";

const initialFormState = {
  // Personal Information
  fullName: "",
  email: "",
  whatsapp: "",
  altContact: "",

  // Project Information
  serviceRequired: "",
  projectName: "",
  projectDescription: "",

  // Event Details
  eventDate: "",
  eventLocation: "",
  eventDuration: "",

  // Creative Vision
  contentType: [],
  purpose: "",
  visionDescription: "",
  referenceLinks: "",

  // Shoot Requirements
  photography: false,
  drone: false,
  multipleLocations: false,
  scriptAvailability: "",
  specialInstructions: "",

  // Communication Preferences
  bestTimeToContact: "",
  preferredContactMethod: "",

  // Consent
  consent: false,
};

const SERVICE_OPTIONS = [
  "Photography",
  "Videography",
  "Event Coverage",
  "Brand Film",
  "Product Shoot",
  "Social Media Content",
  "Documentary",
  "Other",
];

const CONTENT_TYPE_OPTIONS = [
  "Reel / Short Form",
  "Long Form Video",
  "Photography Set",
  "Live Stream",
  "Behind the Scenes",
  "Testimonial / Interview",
];

const CONTACT_METHOD_OPTIONS = ["WhatsApp", "Phone Call", "Email"];

const CONTACT_TIME_OPTIONS = ["Morning", "Afternoon", "Evening", "Anytime"];

export default function Enquiry() {
  const [formData, setFormData] = useState(initialFormState);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleContentTypeToggle = (option) => {
    setFormData((prev) => {
      const exists = prev.contentType.includes(option);
      return {
        ...prev,
        contentType: exists
          ? prev.contentType.filter((item) => item !== option)
          : [...prev.contentType, option],
      };
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files?.[0] || null);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp number is required.";
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(formData.whatsapp)) {
      newErrors.whatsapp = "Enter a valid phone number.";
    }

    if (!formData.serviceRequired) newErrors.serviceRequired = "Please select a service.";
    if (!formData.projectDescription.trim())
      newErrors.projectDescription = "Please describe your project.";

    if (!formData.consent) newErrors.consent = "You must agree before submitting.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setFile(null);
  };

  // Builds a plain-object payload (handy for both EmailJS templates and a JSON API body)
  const buildPayload = () => ({
    ...formData,
    contentType: formData.contentType.join(", "),
    fileName: file ? file.name : "No file attached",
  });

  const sendViaBackend = async (payload) => {
    // Use FormData instead of JSON if you want the file to travel with the request
    const body = new FormData();
    Object.entries(payload).forEach(([key, value]) => body.append(key, value));
    if (file) body.append("attachment", file);

    const response = await fetch(BACKEND_ENDPOINT, {
      method: "POST",
      body,
    });

    if (!response.ok) {
      throw new Error("Server responded with an error.");
    }
    return response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!validate()) {
      const firstErrorField = document.querySelector(".field-error");
      firstErrorField?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);
    const payload = buildPayload();

    try {
      const result = await sendViaBackend(payload);
      setOrderId(result.orderId || "");
      setIsSubmitted(true);
      resetForm();
    } catch (err) {
      console.error(err);
      setSubmitError(
        "Something went wrong sending your enquiry. Please try again or reach out directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="enquiry-page">
        <div className="enquiry-success" role="status">
          <div className="success-badge">✓</div>
          <h2>Enquiry received</h2>
          <p>
            Thank you for reaching out. Our team reviews every brief personally and
            will get back to you within 1–2 business days.
          </p>
          <button className="btn-secondary" onClick={() => setIsSubmitted(false)}>
            Submit another enquiry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="enquiry-page">
      <header className="enquiry-header">
        <span className="eyebrow">Start a project</span>
        <h1>Project Enquiry</h1>
        <p>
          Tell us about your vision. The more detail you share, the faster we can
          put together the right crew, kit, and quote for your shoot.
        </p>
      </header>

      <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
        {/* SCENE 01 — PERSONAL INFORMATION */}
        <fieldset className="form-section">
          <legend>
            <span className="scene-number">01</span> Personal Information
          </legend>

          <div className="field-grid">
            <div className="field">
              <label htmlFor="fullName">Full Name *</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Jane Doe"
                required
              />
              {errors.fullName && <span className="field-error">{errors.fullName}</span>}
            </div>

            <div className="field">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                required
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="field">
              <label htmlFor="whatsapp">WhatsApp Number *</label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                required
              />
              {errors.whatsapp && <span className="field-error">{errors.whatsapp}</span>}
            </div>

            <div className="field">
              <label htmlFor="altContact">Alternative Contact Number</label>
              <input
                id="altContact"
                name="altContact"
                type="tel"
                value={formData.altContact}
                onChange={handleChange}
                placeholder="Optional"
              />
            </div>
          </div>
        </fieldset>

        {/* SCENE 02 — PROJECT INFORMATION */}
        <fieldset className="form-section">
          <legend>
            <span className="scene-number">02</span> Project Information
          </legend>

          <div className="field-grid">
            <div className="field">
              <label htmlFor="serviceRequired">Service Required *</label>
              <select
                id="serviceRequired"
                name="serviceRequired"
                value={formData.serviceRequired}
                onChange={handleChange}
                required
              >
                <option value="">Select a service</option>
                {SERVICE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.serviceRequired && (
                <span className="field-error">{errors.serviceRequired}</span>
              )}
            </div>

            <div className="field">
              <label htmlFor="projectName">Project / Event Name</label>
              <input
                id="projectName"
                name="projectName"
                type="text"
                value={formData.projectName}
                onChange={handleChange}
                placeholder="e.g. Summer Product Launch"
              />
            </div>

            <div className="field field-full">
              <label htmlFor="projectDescription">Project Description *</label>
              <textarea
                id="projectDescription"
                name="projectDescription"
                rows={4}
                value={formData.projectDescription}
                onChange={handleChange}
                placeholder="What are we creating, and who is it for?"
                required
              />
              {errors.projectDescription && (
                <span className="field-error">{errors.projectDescription}</span>
              )}
            </div>
          </div>
        </fieldset>

        {/* SCENE 03 — EVENT DETAILS */}
        <fieldset className="form-section">
          <legend>
            <span className="scene-number">03</span> Event Details
          </legend>

          <div className="field-grid">
            <div className="field">
              <label htmlFor="eventDate">Event Date</label>
              <input
                id="eventDate"
                name="eventDate"
                type="date"
                value={formData.eventDate}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label htmlFor="eventLocation">Event Location</label>
              <input
                id="eventLocation"
                name="eventLocation"
                type="text"
                value={formData.eventLocation}
                onChange={handleChange}
                placeholder="City, venue, or address"
              />
            </div>

            <div className="field">
              <label htmlFor="eventDuration">Event Duration</label>
              <input
                id="eventDuration"
                name="eventDuration"
                type="text"
                value={formData.eventDuration}
                onChange={handleChange}
                placeholder="e.g. 3 hours, full day"
              />
            </div>
          </div>
        </fieldset>

        {/* SCENE 04 — CREATIVE VISION */}
        <fieldset className="form-section">
          <legend>
            <span className="scene-number">04</span> Creative Vision
          </legend>

          <div className="field-grid">
            <div className="field field-full">
              <label>Content Type</label>
              <div className="checkbox-group">
                {CONTENT_TYPE_OPTIONS.map((option) => (
                  <label key={option} className="checkbox-pill">
                    <input
                      type="checkbox"
                      checked={formData.contentType.includes(option)}
                      onChange={() => handleContentTypeToggle(option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="field">
              <label htmlFor="purpose">Purpose of Content</label>
              <input
                id="purpose"
                name="purpose"
                type="text"
                value={formData.purpose}
                onChange={handleChange}
                placeholder="e.g. Brand awareness, launch, recap"
              />
            </div>

            <div className="field">
              <label htmlFor="referenceLinks">Reference Video Links</label>
              <input
                id="referenceLinks"
                name="referenceLinks"
                type="text"
                value={formData.referenceLinks}
                onChange={handleChange}
                placeholder="Paste links, comma-separated"
              />
            </div>

            <div className="field field-full">
              <label htmlFor="visionDescription">Vision Description</label>
              <textarea
                id="visionDescription"
                name="visionDescription"
                rows={3}
                value={formData.visionDescription}
                onChange={handleChange}
                placeholder="Mood, tone, references, must-haves"
              />
            </div>

            <div className="field field-full">
              <label htmlFor="fileUpload">Reference File Upload</label>
              <input id="fileUpload" name="fileUpload" type="file" onChange={handleFileChange} />
              {file && <span className="file-name">Attached: {file.name}</span>}
            </div>
          </div>
        </fieldset>

        {/* SCENE 05 — SHOOT REQUIREMENTS */}
        <fieldset className="form-section">
          <legend>
            <span className="scene-number">05</span> Shoot Requirements
          </legend>

          <div className="field-grid">
            <div className="field field-full">
              <div className="checkbox-group">
                <label className="checkbox-pill">
                  <input
                    type="checkbox"
                    name="photography"
                    checked={formData.photography}
                    onChange={handleChange}
                  />
                  <span>Photography Needed</span>
                </label>
                <label className="checkbox-pill">
                  <input
                    type="checkbox"
                    name="drone"
                    checked={formData.drone}
                    onChange={handleChange}
                  />
                  <span>Drone Shots</span>
                </label>
                <label className="checkbox-pill">
                  <input
                    type="checkbox"
                    name="multipleLocations"
                    checked={formData.multipleLocations}
                    onChange={handleChange}
                  />
                  <span>Multiple Locations</span>
                </label>
              </div>
            </div>

            <div className="field">
              <label htmlFor="scriptAvailability">Script Availability</label>
              <select
                id="scriptAvailability"
                name="scriptAvailability"
                value={formData.scriptAvailability}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="Yes, finalized">Yes, finalized</option>
                <option value="Draft available">Draft available</option>
                <option value="Need help writing one">Need help writing one</option>
                <option value="Not applicable">Not applicable</option>
              </select>
            </div>

            <div className="field field-full">
              <label htmlFor="specialInstructions">Special Instructions</label>
              <textarea
                id="specialInstructions"
                name="specialInstructions"
                rows={3}
                value={formData.specialInstructions}
                onChange={handleChange}
                placeholder="Access restrictions, permits, VIPs, anything we should know"
              />
            </div>
          </div>
        </fieldset>

        {/* SCENE 06 — COMMUNICATION PREFERENCES */}
        <fieldset className="form-section">
          <legend>
            <span className="scene-number">06</span> Communication Preferences
          </legend>

          <div className="field-grid">
            <div className="field">
              <label htmlFor="bestTimeToContact">Best Time to Contact</label>
              <select
                id="bestTimeToContact"
                name="bestTimeToContact"
                value={formData.bestTimeToContact}
                onChange={handleChange}
              >
                <option value="">Select a time</option>
                {CONTACT_TIME_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="preferredContactMethod">Preferred Contact Method</label>
              <select
                id="preferredContactMethod"
                name="preferredContactMethod"
                value={formData.preferredContactMethod}
                onChange={handleChange}
              >
                <option value="">Select a method</option>
                {CONTACT_METHOD_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        {/* CONSENT + SUBMIT */}
        <div className="consent-row">
          <label className="checkbox-pill consent-pill">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
            />
            <span>
              I agree to be contacted about this enquiry and consent to the details
              above being used to prepare a proposal. *
            </span>
          </label>
          {errors.consent && <span className="field-error">{errors.consent}</span>}
        </div>

        {submitError && <div className="submit-error">{submitError}</div>}

        <button className="btn-primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Sending…
            </>
          ) : (
            "Submit Enquiry"
          )}
        </button>
      </form>
      <Link className="btn-secondary enquiry-home-link" to="/">
        Back to home
      </Link>
    </section>
  );
}
