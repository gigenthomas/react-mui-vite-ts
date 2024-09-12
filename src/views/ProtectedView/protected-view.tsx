import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { REACT_APP_AUTH0_AUDIENCE } from '@/config';
import { getProtectedResource } from '@/services/message.service';
import { getUserEvents } from '@/services/message.service';
import { useAuth0 } from '@auth0/auth0-react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import '../../App.css';

function ProtectedView() {
  const {user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [message, setMessage] = useState<string>("");
  const [events, setEvents] = useState<object[]>([]);

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const options = { authorizationParams: { audience: REACT_APP_AUTH0_AUDIENCE } }; 
      const accessToken = await getAccessTokenSilently(options);
      const { data, error } = await getProtectedResource(accessToken);
      const { userEvents, userEventError } = await getUserEvents(accessToken, user?.sub);

      if (!isMounted) {
        return;
      }

      if (data) {
        setMessage(JSON.stringify(data, null, 2));
      }

      if (userEvents) {
        for (let i = 0; i < userEvents.length; i++) {
          userEvents[i].startFormatted = new Date(userEvents[i].start);  
          userEvents[i].endFormatted = new Date(userEvents[i].end);
        }
        setEvents(userEvents); // Set the fetched user events to the state
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

  // Date Objects follow this format: (year, monthIndex, day, hours, minutes, seconds, milliseconds)
const fieldsData = {
    id: 'Id',
    subject: { name: 'title' },
    isAllDay: { name: 'IsAllDay' },
    startTime: { name: 'startFormatted' },
    endTime: { name: 'endFormatted' }
}
const eventSettings = { dataSource: events, fields: fieldsData }


  const currentDate = new Date(); //Get current Date

  return (
    <main style={{ padding: '1rem 0' }}>
      {isAuthenticated &&
      <Grid container>
        <Grid container justifyContent="center">
          
          <Grid item xs={12} sx={{ m: 1 }}>
            <TextField id="email" label="Email" value={message} variant="outlined" fullWidth />
          </Grid>

          <ScheduleComponent height='550px' selectedDate={new Date(2024, 8, 12)} eventSettings={eventSettings}>
              <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
          </ScheduleComponent>
        </Grid>
      </Grid>
      }
    </main>
  );
}

export default ProtectedView;
