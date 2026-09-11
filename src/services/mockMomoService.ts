import { MomoProvider } from '../types';
import { momoProviders } from '../data/mockData';

export interface MomoConnectionState {
  isConnected: boolean;
  providerId: 'mtn' | 'telecel' | 'airteltigo' | null;
  providerName: string | null;
  phoneNumber: string | null;
  connectedAt: string | null;
  lastSyncedAt: string | null;
  autoSyncEnabled: boolean;
  consentGranted: boolean;
  consentedDataTypes: string[];
}

const DEFAULT_STATE: MomoConnectionState = {
  isConnected: true,
  providerId: 'mtn',
  providerName: 'MTN Mobile Money',
  phoneNumber: '+233 24 412 8904',
  connectedAt: '2026-06-12T08:15:00Z',
  lastSyncedAt: 'Today at 07:45 AM',
  autoSyncEnabled: true,
  consentGranted: true,
  consentedDataTypes: [
    'incoming_transactions',
    'outgoing_transactions',
    'transaction_dates',
    'transaction_categories',
    'account_activity_patterns',
  ],
};

class MockMomoService {
  getProviders(): MomoProvider[] {
    return momoProviders;
  }

  getConnectionState(): MomoConnectionState {
    const stored = localStorage.getItem('cb_momo_connected');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return DEFAULT_STATE;
      }
    }
    return DEFAULT_STATE;
  }

  async simulateConnect(
    providerId: 'mtn' | 'telecel' | 'airteltigo',
    phoneNumber: string,
    onProgress?: (step: string) => void
  ): Promise<MomoConnectionState> {
    const provider = momoProviders.find((p) => p.id === providerId) || momoProviders[0];

    onProgress?.(`Sending authorization request to ${phoneNumber}...`);
    await new Promise((r) => setTimeout(r, 900));

    onProgress?.(`Waiting for MoMo PIN prompt confirmation on phone...`);
    await new Promise((r) => setTimeout(r, 1100));

    onProgress?.(`Consent verified with ${provider.name}. Initializing secure data bridge...`);
    await new Promise((r) => setTimeout(r, 900));

    onProgress?.(`Syncing initial 6-month historical activity...`);
    await new Promise((r) => setTimeout(r, 800));

    const newState: MomoConnectionState = {
      isConnected: true,
      providerId: provider.id,
      providerName: provider.name,
      phoneNumber,
      connectedAt: new Date().toISOString(),
      lastSyncedAt: 'Just now',
      autoSyncEnabled: true,
      consentGranted: true,
      consentedDataTypes: [
        'incoming_transactions',
        'outgoing_transactions',
        'transaction_dates',
        'transaction_categories',
        'account_activity_patterns',
      ],
    };

    localStorage.setItem('cb_momo_connected', JSON.stringify(newState));
    return newState;
  }

  disconnect(): void {
    const disconnected: MomoConnectionState = {
      isConnected: false,
      providerId: null,
      providerName: null,
      phoneNumber: null,
      connectedAt: null,
      lastSyncedAt: null,
      autoSyncEnabled: false,
      consentGranted: false,
      consentedDataTypes: [],
    };
    localStorage.setItem('cb_momo_connected', JSON.stringify(disconnected));
  }
}

export const mockMomoService = new MockMomoService();
