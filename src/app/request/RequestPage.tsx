'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { submitServiceRequest } from './actions';

export default function RequestPage() {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(event.currentTarget);
    const result = await submitServiceRequest(formData);
    
    setIsSubmitting(false);
    if (result.success) {
      setIsSuccess(true);
    } else {
      alert('Error: ' + result.error);
    }
  }

  if (isSuccess) {
    return (
      <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ fontSize: '4rem', color: '#22c55e', marginBottom: '1.5rem' }}>✓</div>
          <h1 style={{ marginBottom: '1rem' }}>Request Submitted!</h1>
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>
            Thank you for choosing Kabo Global Links. Our coordinator will contact you shortly to finalize details.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <a href="/" className="btn" style={{ border: '2px solid #22c55e', color: '#22c55e', textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: '0.5rem' }}>
              Back to Home
            </a>
            {session && (
              <a href="/admin" className="btn btn-primary" style={{ textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', background: '#22c55e', color: 'white' }}>
                Go to Dashboard
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>Book a <span style={{ color: '#22c55e' }}>Service</span></h1>
        <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '3rem' }}>
          Provide your details and the service you require. We'll handle the rest.
        </p>

        <form onSubmit={handleSubmit} className="card" style={{ display: 'grid', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600 }}>Full Name</label>
            <input name="customerName" required style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} placeholder="John Doe" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600 }}>Email Address</label>
              <input type="email" name="email" required style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} placeholder="john@example.com" />
            </div>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600 }}>Phone Number</label>
              <input name="phone" required style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} placeholder="08123456789" />
            </div>
          </div>

          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600 }}>Service Type</label>
            <select name="serviceType" required style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
              <option value="">Select a service</option>
              <option value="Construction">Construction & Building</option>
              <option value="Home Services">Home Services</option>
              <option value="Office & Business">Office & Business Support</option>
              <option value="Logistics">Logistics & Transportation</option>
              <option value="Staffing">Skilled Staffing</option>
            </select>
          </div>

          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600 }}>Specific Details (Optional)</label>
            <textarea name="details" rows={4} style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} placeholder="Describe your needs in detail..."></textarea>
          </div>

          <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ padding: '1rem', width: '100%', fontSize: '1.1rem' }}>
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
}
