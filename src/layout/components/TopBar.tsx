import { FunctionComponent, ReactNode } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { LoginButton } from '@/components/common/buttons/login-button';
import { NavBarButtons } from '@/components/common/nav-bar-buttons';


interface Props {
  endNode?: ReactNode;
  startNode?: ReactNode;
  title?: string;
}

/**
 * Renders TopBar composition
 * @component TopBar
 */
const TopBar: FunctionComponent<Props> = ({ endNode, startNode, title = '', ...restOfProps }) => {
  return (
    <AppBar
      component="div"
      sx={
        {
          // boxShadow: 'none', // Uncomment to hide shadow
        }
      }
      {...restOfProps}
    >
         
      <Toolbar disableGutters sx={{ paddingX: 1 }}>
        {startNode}

        <Typography
          variant="h6"
          sx={{
            marginX: 1,
            flexGrow: 1,
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </Typography>

        {endNode}
      <NavBarButtons />
      </Toolbar>
     
    </AppBar>
  );
};

export default TopBar;
