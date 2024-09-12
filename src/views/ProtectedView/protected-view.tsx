import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { ActionEventArgs } from '@syncfusion/ej2-schedule';
import { REACT_APP_AUTH0_AUDIENCE } from '@/config';
import { getUserEvents } from '@/services/message.service';
import { useAuth0 } from '@auth0/auth0-react'
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import '../../App.css';

function ProtectedView() {
  const {user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [message, setMessage] = useState<string>("");
  const [events, setEvents] = useState<object[]>([]);


  const onActionBegin = (args: ActionEventArgs) => {
    if (args.requestType === 'eventRemove') {
      // Add your custom logic here
      console.log('Event is being deleted:', args.data);

    }
  };

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const options = { authorizationParams: { audience: REACT_APP_AUTH0_AUDIENCE } }; 
      const accessToken = await getAccessTokenSilently(options);
      const { userEvents, userEventError } = await getUserEvents(accessToken, user?.sub);

      if (!isMounted) {
        return;
      }

      if (userEvents) {
        for (let i = 0; i < userEvents.length; i++) {
          userEvents[i].startFormatted = new Date(userEvents[i].start);  
          userEvents[i].endFormatted = new Date(userEvents[i].end);
        }
        setEvents(userEvents); // Set the fetched user events to the state
      }

      if (userEventError) {
        setMessage(JSON.stringify(userEventError, null, 2));
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




  return (
    <main style={{ padding: '1rem 0' }}>
      {isAuthenticated &&
      <Grid container>
        <Grid container justifyContent="center">
          <ScheduleComponent height='950px' selectedDate={new Date()} eventSettings={eventSettings} actionBegin={onActionBegin}>
              <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
          </ScheduleComponent>
        </Grid>
      </Grid>
      }
    </main>
  );
}

export default ProtectedView;
