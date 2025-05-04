import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const Menu = ({ labs, onLabSelect }) => {
  return (
    <List 
      style={{ 
        width: '200px', 
        minHeight: '100vh',
        borderRight: '1px solid #ccc',
        boxSizing: 'border-box'
      }}
    >
      {labs.map((lab, index) => (
        <ListItem button key={index} onClick={() => onLabSelect(index)}>
          <ListItemText primary={lab.title} />
        </ListItem>
      ))}
    </List>
  );
};

export default Menu;