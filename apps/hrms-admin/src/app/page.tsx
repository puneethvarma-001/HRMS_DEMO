import { Box, Container, Typography } from '@mui/material';
import { Button } from '@hrms/design-system';

export default function HomePage() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <Typography variant="h1" component="h1" align="center">
          HRMS Admin Portal
        </Typography>
        <Typography variant="h5" component="h2" align="center" color="text.secondary">
          Enterprise-Grade HR Management System
        </Typography>
        <Typography variant="body1" align="center" maxWidth="md">
          Modern, scalable HRMS frontend built with Next.js 14+, TypeScript, MUI v6, and AI-first
          UX. Supports 100,000+ users with deep RBAC, multi-tenant administration, and outsourcing
          onboarding.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" size="large">
            Get Started
          </Button>
          <Button variant="outlined" size="large">
            Documentation
          </Button>
        </Box>

        <Box sx={{ mt: 8 }}>
          <Typography variant="h6" gutterBottom>
            Key Features
          </Typography>
          <Box component="ul" sx={{ textAlign: 'left' }}>
            <li>Policy-based RBAC with ABAC support</li>
            <li>Multi-tenant theming and configuration</li>
            <li>AI Copilot for HR queries and insights</li>
            <li>Virtualized tables for 100k+ rows</li>
            <li>Outsourcing user management</li>
            <li>Dark mode by default</li>
            <li>Server Components & Partial Prerendering</li>
            <li>Edge-optimized performance</li>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
