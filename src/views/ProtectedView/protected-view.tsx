import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { REACT_APP_AUTH0_AUDIENCE } from '@/config';
import { getProtectedResource } from '@/services/message.service';
import { useAuth0 } from '@auth0/auth0-react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import '../../App.css';
function ProtectedView() {
  const {isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const options = { authorizationParams: { audience: REACT_APP_AUTH0_AUDIENCE } }; //modification here
      const accessToken = await getAccessTokenSilently(options);
      console.log(accessToken);
      const { data, error } = await getProtectedResource(accessToken);

      if (!isMounted) {
        return;
      }

      if (data) {
        setMessage(JSON.stringify(data, null, 2));
      }

      if (error) {
        setMessage(JSON.stringify(error, null, 2));
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);
  

  return (
    <main style={{ padding: '1rem 0' }}>
      {isAuthenticated &&
      <Grid container>
        <Grid container justifyContent="center">
          
          <Grid item xs={12} sx={{ m: 1 }}>
            <TextField id="email" label="Email" value={message} variant="outlined" fullWidth />
          </Grid>

          <ScheduleComponent>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
          </ScheduleComponent>
          
        </Grid>
      </Grid>
      }
    </main>
  );
}

export default ProtectedView;
