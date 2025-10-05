'use client';

import { useState } from 'react';
import { Button } from './Button';
import { Toast } from './Toast';

interface FormData {
  instagram: string;
  fullName: string;
  university: string;
  degree: string;
  phone: string;
  whyYou: string;
  experience: string;
  femaleUK: boolean;
  privacy: boolean;
  website: string; // honeypot field
}

interface FormErrors {
  [key: string]: string;
}

export function ApplicationForm() {
  const [formData, setFormData] = useState<FormData>({
    instagram: '',
    fullName: '',
    university: '',
    degree: '',
    phone: '',
    whyYou: '',
    experience: '',
    femaleUK: false,
    privacy: false,
    website: '', // honeypot
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Instagram validation
    if (!formData.instagram) {
      newErrors.instagram = 'Instagram handle is required';
    } else if (!formData.instagram.startsWith('@')) {
      newErrors.instagram = 'Instagram handle must start with @';
    } else if (formData.instagram.length < 3 || formData.instagram.length > 31) {
      newErrors.instagram = 'Instagram handle must be 2-30 characters after @';
    }

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    // University validation
    if (!formData.university.trim()) {
      newErrors.university = 'University is required';
    }

    // Degree validation
    if (!formData.degree.trim()) {
      newErrors.degree = 'Degree is required';
    }

    // Why you validation
    if (!formData.whyYou.trim()) {
      newErrors.whyYou = 'Please tell us why you\'d be a good fit';
    }

    // Experience validation
    if (!formData.experience.trim()) {
      newErrors.experience = 'Please share your social media experience';
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else {
      const phoneRegex = /^07\d{9}$/;
      if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Please enter a valid UK mobile number (07...)';
      }
    }

    // Checkboxes validation
    if (!formData.femaleUK) {
      newErrors.femaleUK = 'This confirmation is required';
    }
    
    if (!formData.privacy) {
      newErrors.privacy = 'You must agree to the privacy policy';
    }

    console.log('New validation errors:', newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Form submitted, validating...');
    console.log('Current form data:', formData);
    
    if (!validateForm()) {
      console.log('Form validation failed');
      console.log('Validation errors:', errors);
      return;
    }

    console.log('Form validation passed, submitting...');
    setIsSubmitting(true);

    try {
      console.log('Sending request to /api/apply');
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);

      let data: any = null;
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        try {
          data = await response.json();
          console.log('Response data (json):', data);
        } catch (jsonErr) {
          console.warn('Failed to parse JSON response:', jsonErr);
          data = { error: 'Invalid JSON response from server' };
        }
      } else {
        // If server returned non-JSON (HTML or empty), capture text for debugging
        try {
          const text = await response.text();
          console.warn('Response text:', text.slice(0, 1000));
          data = { error: text || 'Empty response from server' };
        } catch (textErr) {
          console.warn('Failed to read response text:', textErr);
          data = { error: 'Unknown server response' };
        }
      }

      if (response.ok) {
        setToast({ message: data?.message || 'Thanks! We\'ll be in touch.', type: 'success' });
        // Reset form
        setFormData({
          instagram: '',
          fullName: '',
          university: '',
          degree: '',
          phone: '',
          whyYou: '',
          experience: '',
          femaleUK: false,
          privacy: false,
          website: '',
        });
        setErrors({});
      } else {
        const message = data?.error || 'Something went wrong';
        console.error('Server returned error:', message);
        setToast({ message, type: 'error' });
      }
    } catch (err: any) {
      // This catches network errors and other unexpected issues
      console.error('Network or fetch error:', err);
      const message = err?.message || 'Network error. Please try again.';
      setToast({ message, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          name="website"
          className="hidden"
          value={formData.website}
          onChange={(e) => handleInputChange('website', e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />

        <div>
          <label htmlFor="instagram" className="block text-xs font-medium text-ink-900 mb-1">
            Instagram handle *
          </label>
          <input
            type="text"
            id="instagram"
            value={formData.instagram}
            onChange={(e) => handleInputChange('instagram', e.target.value)}
            placeholder="@yourusername"
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-100 outline-none transition-colors text-sm"
          />
          {errors.instagram && (
            <p className="text-pink-500 text-xs mt-0.5">{errors.instagram}</p>
          )}
        </div>

        <div>
          <label htmlFor="fullName" className="block text-xs font-medium text-ink-900 mb-1">
            Full name *
          </label>
          <input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-100 outline-none transition-colors text-sm"
          />
          {errors.fullName && (
            <p className="text-pink-500 text-xs mt-0.5">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label htmlFor="university" className="block text-xs font-medium text-ink-900 mb-1">
            University - e.g., &quot;Newcastle&quot; *
          </label>
          <input
            type="text"
            id="university"
            value={formData.university}
            onChange={(e) => handleInputChange('university', e.target.value)}
            placeholder="Newcastle"
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-100 outline-none transition-colors text-sm"
          />
          {errors.university && (
            <p className="text-pink-500 text-xs mt-0.5">{errors.university}</p>
          )}
        </div>

        <div>
          <label htmlFor="degree" className="block text-xs font-medium text-ink-900 mb-1">
            Degree - e.g., &quot;BA Marketing (2nd year)&quot; *
          </label>
          <input
            type="text"
            id="degree"
            value={formData.degree}
            onChange={(e) => handleInputChange('degree', e.target.value)}
            placeholder="BA Marketing (2nd year)"
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-100 outline-none transition-colors text-sm"
          />
          {errors.degree && (
            <p className="text-pink-500 text-xs mt-0.5">{errors.degree}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-medium text-ink-900 mb-1">
            Phone number (UK) *
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="07123456789"
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-100 outline-none transition-colors text-sm"
          />
          {errors.phone && (
            <p className="text-pink-500 text-xs mt-0.5">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="whyYou" className="block text-xs font-medium text-ink-900 mb-1">
            Why you? *
          </label>
          <textarea
            id="whyYou"
            value={formData.whyYou}
            onChange={(e) => handleInputChange('whyYou', e.target.value)}
            rows={3}
            placeholder="Why you're a great fit for social media manager (2-4 sentences)"
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-100 outline-none transition-colors resize-none text-sm"
          />
          {errors.whyYou && (
            <p className="text-pink-500 text-xs mt-0.5">{errors.whyYou}</p>
          )}
        </div>

        <div>
          <label htmlFor="experience" className="block text-xs font-medium text-ink-900 mb-1">
            What&apos;s your experience? *
          </label>
          <textarea
            id="experience"
            value={formData.experience}
            onChange={(e) => handleInputChange('experience', e.target.value)}
            rows={3}
            placeholder="Your social media experience"
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-100 outline-none transition-colors resize-none text-sm"
          />
          {errors.experience && (
            <p className="text-pink-500 text-xs mt-0.5">{errors.experience}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="femaleUK"
                type="checkbox"
                checked={formData.femaleUK}
                onChange={(e) => handleInputChange('femaleUK', e.target.checked)}
                className="w-4 h-4 text-pink-500 bg-white border-gray-300 rounded focus:ring-pink-500 focus:ring-2 flex-shrink-0"
              />
            </div>
            <div className="ml-3 text-xs">
              <label htmlFor="femaleUK" className="text-ink-900">
                I confirm I&apos;m female and based in the UK. *
              </label>
              {errors.femaleUK && (
                <p className="text-pink-500 text-xs mt-0.5">{errors.femaleUK}</p>
              )}
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="privacy"
                type="checkbox"
                checked={formData.privacy}
                onChange={(e) => handleInputChange('privacy', e.target.checked)}
                className="w-4 h-4 text-pink-500 bg-white border-gray-300 rounded focus:ring-pink-500 focus:ring-2 flex-shrink-0"
              />
            </div>
            <div className="ml-3 text-xs">
              <label htmlFor="privacy" className="text-ink-900">
                I agree to the privacy policy. *
              </label>
              {errors.privacy && (
                <p className="text-pink-500 text-xs mt-0.5">{errors.privacy}</p>
              )}
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
          size="lg"
          onClick={(e) => {
            console.log('Button clicked');
            // Don't prevent default here, let the form handle it
          }}
        >
          {isSubmitting ? 'Sending Application...' : 'Send Application'}
        </Button>
      </form>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}