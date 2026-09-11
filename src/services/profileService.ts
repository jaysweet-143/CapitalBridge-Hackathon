import { authService } from './authService';
import { UserProfile } from '../types';

class ProfileService {
  getProfile(): UserProfile {
    return authService.getUser();
  }

  saveProfile(profile: Partial<UserProfile>): UserProfile {
    return authService.updateUser(profile);
  }
}

export const profileService = new ProfileService();
