import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import ChartRenderer from '../components/ChartRenderer';
import Dashboard from '../components/Dashboard';
import DashboardItem from '../components/DashboardItem';
const DashboardItems = [
  {
    id: 0,
    name: 'New Chart',
    vizState: {
      query: {
        dimensions: ['PostData.sentimentScore'],
        timeDimensions: [
          {
            dimension: 'PostData.createdAt',
            granularity: 'day',
          },
        ],
        order: {},
        measures: ['PostData.count'],
        filters: [],
      },
      chartType: 'line',
    },
  },
  {
    id: 1,
    name: 'New Chart',
    vizState: {
      query: {
        measures: ['PostData.count'],
        timeDimensions: [
          {
            dimension: 'PostData.createdAt',
            granularity: 'hour',
          },
        ],
        order: {},
        dimensions: ['PostData.sentimentScore'],
        filters: [],
      },
      chartType: 'area',
    },
  },
  {
    id: 2,
    name: 'New Chart',
    vizState: {
      query: {
        dimensions: [],
        timeDimensions: [
          {
            dimension: 'PostData.createdAt',
            granularity: 'hour',
          },
        ],
        order: {},
        measures: ['PostData.count'],
        filters: [],
      },
      chartType: 'line',
    },
  },
  {
    id: 3,
    name: 'New Chart',
    vizState: {
      query: {
        dimensions: ['UsersOfInterest.name', 'PostData.sentimentScore'],
        timeDimensions: [
          {
            dimension: 'PostData.createdAt',
            granularity: 'day',
          },
        ],
        order: {},
        measures: ['PostIsAboutUser.count'],
        segments: [],
        filters: [
          {
            dimension: 'UsersOfInterest.name',
            operator: 'equals',
            values: ['president'],
          },
        ],
      },
      chartType: 'line',
    },
  },
];

const HomePage = () => {
  const dashboardItem = (item) => (
    <Grid item xs={12} lg={9} key={item.id}>
      <DashboardItem title={item.name}>
      {/*  <ChartRenderer vizState={item.vizState} />*/}
      </DashboardItem>
    </Grid>
  );

  const Empty = () => (
    <div
      style={{
        textAlign: 'center',
        padding: 0,
      }}
    >
      <Typography variant="h5" color="inherit">
        There are no charts on this dashboard. Use Playground Build to add one.
      </Typography>
    </div>
  );

  return DashboardItems.length ? (
    <Dashboard>{DashboardItems.map(dashboardItem)}</Dashboard>
  ) : (
    <Empty />
  );
};

export default HomePage;
