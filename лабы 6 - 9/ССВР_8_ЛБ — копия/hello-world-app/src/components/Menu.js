import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

const Menu = ({ labs, onLabSelect, open, onClose }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List
        style={{
          width: '200px',
          minHeight: '100vh',
          borderRight: '1px solid #ccc',
          boxSizing: 'border-box'
        }}
      >
        {labs.map((lab, index) => (
          <ListItem button key={index} onClick={() => { onLabSelect(index); onClose(); }}>
            <ListItemText primary={lab.title} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Menu;