import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const About = ({ username, password }) => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                О себе
            </Typography>
            {username ? (
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Ваши учетные данные:
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Логин: <strong>{username}</strong>
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Пароль: <strong>{password}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Внимание: Не передавайте свои учетные данные третьим лицам!
                    </Typography>
                </Paper>
            ) : (
                <Typography variant="body1">
                    Пожалуйста, войдите в систему, чтобы увидеть информацию о себе.
                </Typography>
            )}
        </Box>
    );
};

export default About;