import { mockUser } from '../data/mockData';
import { UserProfile } from '../types';

class AuthService {
  private currentUser: UserProfile = { ...mockUser };

  getUser(): UserProfile {
    const stored = localStorage.getItem('cb_user');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return this.currentUser;
      }
    }
    return this.currentUser;
  }

  updateUser(updated: Partial<UserProfile>): UserProfile {
    this.currentUser = { ...this.currentUser, ...updated };
    localStorage.setItem('cb_user', JSON.stringify(this.currentUser));
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return true;
  }

  logout(): void {
    localStorage.removeItem('cb_user');
    localStorage.removeItem('cb_momo_connected');
    localStorage.removeItem('cb_statement_uploaded');
  }
}

export const authService = new AuthService();
