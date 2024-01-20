import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const ControlledCheckbox = ({ isChecked }: { isChecked: boolean }) => {
  const [checked, setChecked] = React.useState(isChecked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Checkbox
      checked={checked}
      size='small'
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
};

export default ControlledCheckbox;
