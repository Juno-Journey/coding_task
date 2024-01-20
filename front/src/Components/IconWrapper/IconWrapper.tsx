import { Box, Button, SxProps } from '@mui/material';
import { mapTypeToIcon, IconFontSize, IconColor, IconKeyType } from './mapTypeToIcon';

interface IconWrapperProps {
  onClick?: () => void;
  type: IconKeyType;
  fontSize?: IconFontSize;
  color?: IconColor;
  sx?: SxProps;
}

const IconWrapper = ({ onClick, type, fontSize, color, sx }: IconWrapperProps) => {
  const defaultIconProps = {
    fontSize: fontSize || 'medium',
    color: color || 'inherit',
  };

  const IconComponent = mapTypeToIcon[type](defaultIconProps);

  if (!IconComponent) {
    return (
      <div>
        Icon type: <b>{type}</b> doesn't exist
      </div>
    );
  }

  return onClick ? (
    <Button
      className={`icon icon-${type}`}
      sx={{ color: 'inherit', minWidth: '40px', ...sx }}
      onClick={onClick}
    >
      {IconComponent}
    </Button>
  ) : (
    <Box
      className={`icon icon-${type}`}
      sx={{ color: '#808080', display: 'flex', alignItems: 'center', ...sx }}
    >
      {IconComponent}
    </Box>
  );
};

export default IconWrapper;
