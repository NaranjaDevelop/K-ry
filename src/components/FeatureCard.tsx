import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  bgColor: string;
  textColor?: string;
  icon: string;
  children?: React.ReactNode; // 👈 Sí admite children
}

const FeatureCard = ({ title, description, bgColor, textColor = "text-white", icon, children }: FeatureCardProps) => {
  return (
    <div className={`${bgColor} rounded-2xl p-8 h-60 relative overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer group`}>
      <div className="absolute top-4 right-4 text-2xl opacity-50 group-hover:opacity-100 transition-opacity">
        {icon}
      </div>
      <div className={`${textColor} h-full flex flex-col justify-between`}>
        <div>
          <h3 className="text-4xl font-bold mb-3">{title}</h3>
          <p className="text-base opacity-80 leading-relaxed">{description}</p>
        </div>
        {children && ( // 👈 Aquí se renderizan los children (el botón)
          <div className="mt-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureCard;

