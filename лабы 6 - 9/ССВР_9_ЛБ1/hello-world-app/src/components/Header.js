import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AssessmentIcon from '@mui/icons-material/Assessment';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ListIcon from '@mui/icons-material/List';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';

const Header = ({ onMenuToggle, onDrawerClose, onToggleTheme, onLogout, onUpdateProfile, onAdmin, userRole }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#00FF00' }}> {/* Ярко-зелёный фон */}
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onMenuToggle}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: 'black' }}> {/* Чёрный текст для контраста */}
          {/* Заголовок приложения */}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'nowrap' }}>
          <Button 
            component={Link} 
            to="/MainPage" 
            color="inherit"
            sx={{ 
              fontSize: { xs: '0.5rem', sm: '1rem' }, 
              padding: { xs: '2px', sm: '6px 12px' }, 
              margin: '0 2px',
              color: 'black' // Чёрный текст для кнопок
            }}
            onClick={onDrawerClose}
          >
            <HomeIcon />
          </Button>
          <Button 
            component={Link} 
            to="/about" 
            color="inherit"
            sx={{ 
              fontSize: { xs: '0.5rem', sm: '1rem' }, 
              padding: { xs: '2px', sm: '6px 12px' }, 
              margin: '0 2px',
              color: 'black'
            }}
            onClick={onDrawerClose}
          >
            <InfoIcon />
          </Button>
          
          <IconButton 
            color="inherit" 
            onClick={handleMenuClick}
            sx={{ 
              fontSize: { xs: '0.5rem', sm: '1rem' }, 
              margin: '0 2px',
              color: 'black'
            }}
          >
            <MenuIcon />
          </IconButton>
          <ThemeToggle onToggle={onToggleTheme} />

          <IconButton 
            color="inherit" 
            onClick={onLogout}
            sx={{ 
              fontSize: { xs: '0.5rem', sm: '1rem' }, 
              margin: '0 2px',
              color: 'black'
            }}
          >
            <ExitToAppIcon />
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            style: {
              backgroundColor: '#00FF00', // Ярко-зелёный фон меню
            }
          }}
        >
          <MenuItem component={Link} to="/counter" onClick={handleMenuClose} sx={{ color: 'black' }}>
            <AssessmentIcon sx={{ marginRight: '8px', color: 'black' }} /> Счетчик
          </MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); onUpdateProfile(); }} sx={{ color: 'black' }}>
            <PersonIcon sx={{ marginRight: '8px', color: 'black' }} /> Обновление аккаунта
          </MenuItem>
          <MenuItem component={Link} to="/Main" onClick={handleMenuClose} sx={{ color: 'black' }}>
            <ListIcon sx={{ marginRight: '8px', color: 'black' }} /> Список
          </MenuItem>
          {userRole === 'admin' && (
            <MenuItem onClick={() => { handleMenuClose(); onAdmin(); }} sx={{ color: 'black' }}>
              <AdminPanelSettingsIcon sx={{ marginRight: '8px', color: 'black' }} /> Администрирование
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;