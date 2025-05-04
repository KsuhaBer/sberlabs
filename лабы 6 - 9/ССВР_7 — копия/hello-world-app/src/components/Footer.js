import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleFeedbackClick = () => {
    navigate('/home');
  };

  return (
    <Box sx={{ 
      bgcolor: '#4CAF50', // Ярко-зелёный (как в Header)
      p: 2, 
      marginTop: 'auto', 
      display: 'flex', 
      flexDirection: { xs: 'column', sm: 'row' }, 
      justifyContent: 'space-between',
      alignItems: 'center' // Добавлено для вертикального выравнивания
    }}>
      <Typography variant="body1" color="white" align="center">
        © {new Date().getFullYear()} Египетская сила
      </Typography>
      <Box>
        <Button 
          color="inherit" 
          onClick={handleFeedbackClick}
          sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
        >
          Отзывы
        </Button>
        <Button 
          color="inherit" 
          onClick={() => console.log("Другие действия")}
          sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
        >
          Другие действия
        </Button>
      </Box>
    </Box>
  );
};

export default Footer;