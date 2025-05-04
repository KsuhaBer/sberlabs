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
      bgcolor: '#00C853', // Ярко-зеленый цвет
      p: 2, 
      marginTop: 'auto', 
      display: 'flex', 
      flexDirection: { xs: 'column', sm: 'row' }, 
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 -2px 10px rgba(0,0,0,0.1)' // Тень для красивого отделения
    }}>
      <Typography variant="body1" color="white" align="center" sx={{ fontWeight: 'bold' }}>
        © {new Date().getFullYear()} Моё Приложение
      </Typography>
      <Box>
        <Button 
          color="inherit" 
          onClick={handleFeedbackClick}
          sx={{ 
            fontWeight: 'bold',
            '&:hover': { 
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              transform: 'scale(1.05)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          Отзывы
        </Button>
        <Button 
          color="inherit" 
          onClick={() => console.log("Другие действия")}
          sx={{ 
            fontWeight: 'bold',
            '&:hover': { 
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              transform: 'scale(1.05)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          Другие действия
        </Button>
      </Box>
    </Box>
  );
};

export default Footer;