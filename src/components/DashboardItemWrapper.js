import React from 'react';
import Grid from '@material-ui/core/Grid';

const DashboardItemWrapper = ({children}) => (
    <Grid container
          spacing={3}
          style={{
              padding: 0,
          }}
          justify="space-around"
          alignItems="flex-start"
    >
        {children}
    </Grid>
);

export default DashboardItemWrapper;
