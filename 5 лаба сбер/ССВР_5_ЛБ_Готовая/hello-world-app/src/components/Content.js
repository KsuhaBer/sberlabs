import React from 'react';
import { Typography } from '@mui/material';

const Content = ({ title, content }) => {
  return (
    <div style={{ padding: 16, flex: 1 }}>
      {title && (
        <Typography variant="h5" style={{ marginBottom: '16px', fontWeight: 'bold' }}>
          {title}
        </Typography>
      )}
      {content && (
        <Typography variant="body1" style={{ lineHeight: '1.5', whiteSpace: 'pre-line' }}>
          {content}
        </Typography>
      )}
    </div>
  );
};

export default Content;