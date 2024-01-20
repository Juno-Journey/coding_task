import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import IconWrapper from '../../Components/IconWrapper/IconWrapper';
import { useNotes } from '../../Context/useNotes';

export default function Header() {
  const { setSearchTerm, searchTerm } = useNotes();

  const renderLeftSide = () => {
    return (
      <React.Fragment>
        <IconWrapper type='menu' sx={{ marginRight: '20px' }} />
        <IconWrapper type='note' fontSize='large' sx={{ marginRight: '10px' }} />
        <Typography variant='h6' component='div' sx={{ display: 'block', marginRight: '70px' }}>
          Keep
        </Typography>
      </React.Fragment>
    );
  };

  const renderRightSide = () => {
    return (
      <React.Fragment>
        <Box sx={{ flexGrow: 1 }} />
        <IconWrapper type='refresh' sx={{ margin: '10px' }} />
        <IconWrapper type='grid' sx={{ margin: '10px' }} />
        <IconWrapper type='settings' sx={{ margin: '10px' }} />
        <IconWrapper type='apps' sx={{ margin: '10px', marginLeft: '20px' }} />
        <IconWrapper type='user' fontSize='large' />
      </React.Fragment>
    );
  };

  const renderSearch = () => {
    return (
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          width: '720px',
          background: '#f1f3f4',
          borderRadius: '8px',
        }}
      >
        <IconWrapper type='search' sx={{ padding: '8px', margin: '3px' }} />
        <InputBase
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          placeholder='Search…'
          inputProps={{ 'aria-label': 'search' }}
          onKeyDown={(e) => {
            // if (e.key === 'Enter') {
            //   searchNotes(searchValue);
            // }
          }}
        />
        {searchTerm && <IconWrapper onClick={() => setSearchTerm('')} type='delete' />}
      </Box>
    );
  };

  return (
    <Box sx={{ flexGrow: 1, background: '#fff' }}>
      <AppBar
        position='fixed'
        color='transparent'
        sx={{ boxShadow: 'none', borderBottom: '1px solid #dadce0', background: '#fff' }}
      >
        <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
          {renderLeftSide()}
          {renderSearch()}
          {renderRightSide()}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
