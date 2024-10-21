import PropTypes from 'prop-types';
import Select from 'react-select';

const MultiSelectValues = ({
  name,
  options,
  selectedValues,
  handleSelectChange,
  label,
}) => {

  const formatOptionLabel = ({ label }) => {
    return (
      <div className="flex items-center">
        <span>{label}</span>
      </div>
    );
  };

  return (
    <div className="mb-2 col-span-2">
      <label className="mb-1 block text-white">{label}</label>
      <Select
        isMulti
        name={name}
        options={options}
        value={options?.filter(option => selectedValues.includes(option.value))}
        onChange={(selectedOptions) => handleSelectChange(selectedOptions, name)}
        className={`select text-black`}
        formatOptionLabel={formatOptionLabel}
        closeMenuOnSelect={false} // Giữ dropdown mở
        required
      />
    </div>
  );
};

// Define propTypes for component props validation
MultiSelectValues.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  selectedValues: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default MultiSelectValues;
