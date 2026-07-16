import React from 'react';
import './Form.css';

export const FormInput = React.forwardRef(({ label, error, ...props }, ref) => {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <input ref={ref} className={`form-control ${error ? 'is-invalid' : ''}`} {...props} />
      {error && <span className="error-message">{error.message}</span>}
    </div>
  );
});

export const FormSelect = React.forwardRef(({ label, options, error, ...props }, ref) => {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <select ref={ref} className={`form-control ${error ? 'is-invalid' : ''}`} {...props}>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <span className="error-message">{error.message}</span>}
    </div>
  );
});