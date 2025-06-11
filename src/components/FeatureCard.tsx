
interface FeatureCardProps {
  title: string;
  description: string;
  bgColor: string;
  textColor?: string;
  icon: string;
}

const FeatureCard = ({ title, description, bgColor, textColor = "text-white", icon }: FeatureCardProps) => {
  return (
    <div className={`${bgColor} rounded-2xl p-8 h-48 relative overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer group`}>
      <div className="absolute top-4 right-4 text-2xl opacity-50 group-hover:opacity-100 transition-opacity">
        {icon}
      </div>
      <div className={`${textColor} h-full flex flex-col justify-between`}>
        <div>
          <h3 className="text-2xl font-bold mb-3">{title}</h3>
          <p className="text-sm opacity-80 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
