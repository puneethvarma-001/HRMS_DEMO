import { Box, Container, Grid, Paper, Typography } from '@mui/material';

export default function DashboardPage() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Welcome to the HRMS Admin Portal
      </Typography>

      <Grid container spacing={3}>
        {/* Key Metrics */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Total Employees
            </Typography>
            <Typography variant="h3">1,234</Typography>
            <Typography variant="body2" color="success.main">
              +12% from last month
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Active Leaves
            </Typography>
            <Typography variant="h3">45</Typography>
            <Typography variant="body2" color="text.secondary">
              Pending approvals: 8
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Outsourcing Users
            </Typography>
            <Typography variant="h3">89</Typography>
            <Typography variant="body2" color="warning.main">
              3 contracts expiring soon
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Open Positions
            </Typography>
            <Typography variant="h3">12</Typography>
            <Typography variant="body2" color="text.secondary">
              34 applications
            </Typography>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
              <Typography variant="body2">• Add new employee</Typography>
              <Typography variant="body2">• Approve pending leaves</Typography>
              <Typography variant="body2">• Run payroll</Typography>
              <Typography variant="body2">• Generate reports</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
              <Typography variant="body2">• John Doe joined the company</Typography>
              <Typography variant="body2">• Leave request from Jane Smith</Typography>
              <Typography variant="body2">• Performance review completed</Typography>
              <Typography variant="body2">• New job posting created</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
