import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const About = ({ username, password }) => {
    return (
        <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: '600px', margin: 'auto' }}>
            <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                О себе
            </Typography>
            {username ? (
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.5rem' } }}>
                        Ваши учетные данные:
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                        Логин: <strong>{username}</strong>
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                        Пароль: <strong>{password}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                        Внимание: Не передавайте свои учетные данные третьим лицам!
                    </Typography>
                </Paper>
            ) : (
                <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    Пожалуйста, войдите в систему, чтобы увидеть информацию о себе.
                </Typography>
            )}
        </Box>
    );
};

export default About;
