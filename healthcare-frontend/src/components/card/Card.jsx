import "./Card.css";

export const Card = ({ children, title, subtitle, extraClass = "" }) => {
  return (
    <div className={`custom-card ${extraClass}`}>
      {(title || subtitle) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      )}

      <div className="card-body">
        {children}
      </div>
    </div>
  );
};