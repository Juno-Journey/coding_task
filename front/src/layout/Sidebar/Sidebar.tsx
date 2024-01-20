import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Link from '@mui/material/Link';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import IconWrapper from '../../Components/IconWrapper/IconWrapper';
import { IconKeyType } from '../../Components/IconWrapper/mapTypeToIcon';

interface SidebarData {
  id: number;
  title: string;
  icon: IconKeyType;
  link: string;
}

const drawerWidth = 280;

const SIDEBAR_DATA: SidebarData[] = [
  { id: 1, title: 'Notes', icon: 'lamp', link: '#notes' },
  { id: 2, title: 'Reminders', icon: 'bell', link: '#reminders' },
  { id: 3, title: 'Edit labels', icon: 'pen', link: '#' },
  { id: 4, title: 'Archive', icon: 'archive', link: '#archive' },
  { id: 5, title: 'Bin', icon: 'trash', link: '#bin' },
];

export default function Sidebar() {
  const [hash, setHash] = React.useState('');

  React.useEffect(() => {
    if (!window) return;
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const drawer = (
    <div>
      <List>
        {SIDEBAR_DATA.map(({ id, title, icon, link }) => (
          <Link
            key={id}
            href={link}
            sx={{ display: 'flex', color: 'inherit', textDecoration: 'none' }}
          >
            <ListItem
              sx={{
                minHeight: '45px',
                paddingLeft: '24px',
                background: hash === link ? '#feefc3' : 'inherit',
                borderRadius: '0 50px 50px 0',
                '&.MuiListItem-root': {
                  '&:hover': {
                    background: hash === link ? '#feefc3' : '#f1f3f4',
                  },
                },
              }}
            >
              <ListItemIcon>
                <IconWrapper type={icon} />
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component='nav'
      sx={{
        position: 'fixed',
        minWidth: drawerWidth,
        '& .MuiDrawer-paper': {
          top: '64px',
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: 0,
        },
      }}
    >
      <Drawer variant='permanent' open>
        {drawer}
      </Drawer>
    </Box>
  );
}
