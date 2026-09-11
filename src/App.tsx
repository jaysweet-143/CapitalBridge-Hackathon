import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { ChoosePathPage } from './pages/ChoosePathPage';
import { ConnectMomoPage } from './pages/ConnectMomoPage';
import { UploadStatementPage } from './pages/UploadStatementPage';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { EvidencePage } from './pages/EvidencePage';
import { ExplainabilityPage } from './pages/ExplainabilityPage';
import { ImprovementPage } from './pages/ImprovementPage';
import { WhatIfPage } from './pages/WhatIfPage';
import { AICoachPage } from './pages/AICoachPage';
import { PassportPage } from './pages/PassportPage';
import { ProfileSettingsPage } from './pages/ProfileSettingsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public & Onboarding Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<ChoosePathPage />} />
        <Route path="/connect-momo" element={<ConnectMomoPage />} />
        <Route path="/upload-statement" element={<UploadStatementPage />} />

        {/* Authenticated Application Shell */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/evidence" element={<EvidencePage />} />
          <Route path="/readiness" element={<ExplainabilityPage />} />
          <Route path="/improvement" element={<ImprovementPage />} />
          <Route path="/what-if" element={<WhatIfPage />} />
          <Route path="/coach" element={<AICoachPage />} />
          <Route path="/passport" element={<PassportPage />} />
          <Route path="/settings" element={<ProfileSettingsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
