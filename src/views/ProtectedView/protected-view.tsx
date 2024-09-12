import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { ActionEventArgs } from '@syncfusion/ej2-schedule';
import { REACT_APP_AUTH0_AUDIENCE } from '@/config';
import { getUserEvents } from '@/services/message.service';
import { deleteEvent } from '@/services/message.service';
import { useAuth0 } from '@auth0/auth0-react'
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import '../../App.css';
import { UserEvent } from '@/models/user-event';

function ProtectedView() {
  const {user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [message, setMessage] = useState<string>("");
  const [events, setEvents] = useState<UserEvent[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [eventDeleted, setEventDeleted] = useState(false);


  

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const options = { authorizationParams: { audience: REACT_APP_AUTH0_AUDIENCE } }; 
      const token = await getAccessTokenSilently(options);
      setAccessToken(token);
      const { userEvents, userEventError } = await getUserEvents(token, user?.sub);

      if (!isMounted) {
        return;
      }

      if (userEvents) {
        for (let i = 0; i < userEvents.length; i++) {
          userEvents[i].startFormatted = new Date(userEvents[i].start);  
          userEvents[i].endFormatted = new Date(userEvents[i].end);
        }
        setEvents(userEvents); 
      }

      if (userEventError) {
        setMessage(JSON.stringify(userEventError, null, 2));
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently, eventDeleted]);


  const onActionBegin = async (args: ActionEventArgs) => {
    if (args.requestType === 'eventRemove') {
      if (args.data && Array.isArray(args.data) && args.data[0]) {
        try {
          const eventIdToDelete = args.data[0].EventId;
          const result = await deleteEvent(accessToken, eventIdToDelete);

          console.log('Event was successfully deleted:', result);
          // Assuming `events` is an array of `Event` objects
          const updatedEvents = events.filter(event => event.EventId !== eventIdToDelete);
          
          setEvents(updatedEvents);

          // Update any other state related to the deletion
          setEventDeleted(!eventDeleted);
  
        } catch (error) {
          console.error('Failed to delete event:', error);
        }
      } else {
        console.error('No event data available for deletion.');
      }
    }
  };

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
