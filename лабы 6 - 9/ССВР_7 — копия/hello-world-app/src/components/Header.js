import React from 'react';
import { AppBar, Toolbar, IconButton, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';

const Header = ({ onMenuToggle, drawerOpen, onDrawerClose, isLoggedIn, username }) => {
    return (
        <>
            <AppBar 
                position="static"
                sx={{ 
                    backgroundColor: '#4CAF50', // Ярко-зелёный (можно заменить на theme.palette.success.main)
                }}
            >
                <Toolbar>
                    <IconButton 
                        edge="start" 
                        color="inherit" 
                        onClick={onMenuToggle}
                        sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Button 
                            component={Link} 
                            to="/MainPage" 
                            color="inherit" 
                            sx={{ 
                                fontSize: { xs: '0.5rem', sm: '1rem' }, 
                                padding: { xs: '4px 8px', sm: '6px 12px' },
                                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                            }} 
                            onClick={onDrawerClose}
                        >
                            Главная
                        </Button>
                        <Button 
                            component={Link} 
                            to="/about" 
                            color="inherit" 
                            sx={{ 
                                fontSize: { xs: '0.5rem', sm: '1rem' }, 
                                padding: { xs: '4px 8px', sm: '6px 12px' },
                                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                            }} 
                            onClick={onDrawerClose}
                        >
                            О себе
                        </Button>
                        <Button 
                            component={Link} 
                            to="/counter" 
                            color="inherit" 
                            sx={{ 
                                fontSize: { xs: '0.5rem', sm: '1rem' }, 
                                padding: { xs: '4px 8px', sm: '6px 12px' },
                                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                            }} 
                            onClick={onDrawerClose}
                        >
                            Счетчик
                        </Button>
                        <Button 
                            component={Link} 
                            to="/Main" 
                            color="inherit" 
                            sx={{ 
                                fontSize: { xs: '0.5rem', sm: '0.8rem' }, 
                                padding: { xs: '2px 4px', sm: '4px 8px' },
                                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                            }} 
                            onClick={onDrawerClose}
                        >
                            Список
                        </Button>
                        <ThemeToggle />
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;