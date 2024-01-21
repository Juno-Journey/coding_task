import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Header from './layout/Header/Header';
import Sidebar from './layout/Sidebar/Sidebar';
import NoteScreen from './Screens/NoteScreen';

const App = () => {
  return (
    <Container maxWidth='xl' disableGutters>
      <Header />
      <Box sx={{ display: 'flex', marginTop: '64px' }}>
        <Box sx={{ minWidth: '280px' }}>
          <Sidebar />
        </Box>
        <Container disableGutters>
          <NoteScreen />
        </Container>
      </Box>
    </Container>
  );
};

export default App;
