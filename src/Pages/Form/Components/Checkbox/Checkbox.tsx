const CheckboxAnswerOption: React.FC<{ text: string, isSelected: boolean, onChange: () => void }> = ({ text, isSelected, onChange }) => {
    return (
      <div className="checkbox-answer">
        <label>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onChange}
          />

          <span
            className="custom-checkbox"
            style={{
              width: '20px',
              height: '20px', 
              border: '5px solid #D9D9D9',
              borderRadius: '50%',
              display: 'inline-block',
              justifyContent: 'center',
              marginRight: '25px',
              alignItems: 'center',
              backgroundColor: isSelected ? '#8644DB' : 'transparent',
              transition: 'background-color 0.1s ease',
            }}
          />
          <span>{text}</span>
        </label>
      </div>
    );
  };

  export default CheckboxAnswerOption;