import { REACT_APP_AUTH0_AUDIENCE } from '@/config';
import { getProtectedResource } from '@/services/message.service';
import { useAuth0 } from '@auth0/auth0-react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { useQuery } from 'react-query';

const ProtectedView: React.FC = () => {
  const {  getAccessTokenSilently } = useAuth0();

  const fetchProtectedResource = async () => {
    const options = { authorizationParams: { audience: REACT_APP_AUTH0_AUDIENCE } };
    const accessToken = await getAccessTokenSilently(options);
    return getProtectedResource(accessToken);
  };

  const { data: message, error, isLoading } = useQuery('protectedMessage', fetchProtectedResource);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{(error as Error).message}</div>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Protected Message"
          value={message?.data?.text || ''}
          multiline
          rows={4}
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};

export default ProtectedView;
