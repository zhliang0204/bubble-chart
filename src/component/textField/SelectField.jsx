import React from 'react';
import MuiTextField from '@material-ui/core/TextField';

const SelectField = ({
  InputProps,
  options,
  fullWidth = true,
  margin = 'dense',
  type = 'text',
  variant = 'outlined',
  customOnChange,
  value,
  ...rest
}) => {
  return (
    <MuiTextField
      fullWidth={fullWidth}
      variant={variant}
      type={type}
      margin={margin}
      select
      SelectProps={{
        native: true,
      }}
      value={value}
      onChange={customOnChange}
      {...rest}
      InputProps={InputProps}
    >
      {options && (
        <React.Fragment>
          {options.map((option, index) => (
            <option key={index + 1} value={option.value}>
              {option.label}
            </option>
          ))}
        </React.Fragment>
      )}
    </MuiTextField>
  );
};

export default SelectField;
