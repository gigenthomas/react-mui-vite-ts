import { Card, CardActions, CardContent, CardHeader, Grid, TextField, Button } from '@mui/material';
import { AppButton, AppView } from '@/components';
import { getCurrentVersion } from '@/utils';
import { Stack, Typography } from '@mui/material';
import { useState } from 'react';

/**
 * Renders "About" view
 * url: /about
 * @page About
 */
const AboutView = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleInvite = () => {
    // Logic to invite the client 
    console.log('Invite sent to:', email);
  };

  return (
    <AppView>
      <Typography variant="h3">Invite a Client</Typography>
      
      <Stack spacing={2} sx={{ mt: 2 }}>
        <TextField
          label="Client Email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleInvite}>
          Send Invite
        </Button>
      </Stack>
    </AppView>
  );
};

export default AboutView;
