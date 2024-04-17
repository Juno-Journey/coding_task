import AccountCircle from '@mui/icons-material/AccountCircle';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import AppsIcon from '@mui/icons-material/Apps';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
export type IconFontSize = 'inherit' | 'large' | 'medium' | 'small';
export type IconColor =
  | 'inherit'
  | 'action'
  | 'disabled'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning';

export type IconProps = {
  fontSize?: IconFontSize;
  color?: IconColor;
};

export type IconKeyType = keyof typeof mapTypeToIcon;

export const mapTypeToIcon = {
  apps: (props: IconProps) => <AppsIcon {...props} />,
  archive: (props: IconProps) => <ArchiveOutlinedIcon {...props} />,
  bell: (props: IconProps) => <NotificationsOutlinedIcon {...props} />,
  checkboxes: (props: IconProps) => <FactCheckOutlinedIcon {...props} />,
  colors: (props: IconProps) => <ColorLensOutlinedIcon {...props} />,
  collaborator: (props: IconProps) => <PersonAddAltOutlinedIcon {...props} />,
  grid: (props: IconProps) => <GridViewIcon {...props} />,
  delete: (props: IconProps) => <ClearOutlinedIcon {...props} />,
  image: (props: IconProps) => <ImageOutlinedIcon {...props} />,
  lamp: (props: IconProps) => <TipsAndUpdatesOutlinedIcon {...props} />,
  mail: (props: IconProps) => <MailIcon {...props} />,
  menu: (props: IconProps) => <MenuIcon {...props} />,
  more: (props: IconProps) => <MoreIcon {...props} />,
  note: (props: IconProps) => <DescriptionIcon {...props} />,
  notification: (props: IconProps) => <NotificationsIcon {...props} />,
  pin: (props: IconProps) => <PushPinOutlinedIcon {...props} />,
  pinFull: (props: IconProps) => <PushPinIcon {...props} />,
  pen: (props: IconProps) => <EditOutlinedIcon {...props} />,
  redo: (props: IconProps) => <RedoOutlinedIcon {...props} />,
  refresh: (props: IconProps) => <RefreshIcon {...props} />,
  reminder: (props: IconProps) => <AddAlertOutlinedIcon {...props} />,
  search: (props: IconProps) => <SearchIcon {...props} />,
  settings: (props: IconProps) => <SettingsIcon {...props} />,
  trash: (props: IconProps) => <DeleteOutlineOutlinedIcon {...props} />,
  undo: (props: IconProps) => <UndoOutlinedIcon {...props} />,
  user: (props: IconProps) => <AccountCircle {...props} />,
};
