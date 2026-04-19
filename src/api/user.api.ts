import { api } from '~/api/client';
import type { DeviceToken, UpdateProfileDto, User } from '~/types/api';

export const userApi = {
  getMe: () => api.get<User>('/api/users/me'),

  updateProfile: (data: UpdateProfileDto) => api.patch<User>('/api/users/me', data),

  uploadAvatar: (uri: string) => {
    const form = new FormData();
    const filename = uri.split('/').pop() ?? 'avatar.jpg';
    const ext = /\.(\w+)$/.exec(filename)?.[1];
    const type = ext ? `image/${ext.toLowerCase()}` : 'image/jpeg';
    // React Native FormData file shape — cast to satisfy DOM lib typing.
    form.append('file', { uri, name: filename, type } as unknown as Blob);
    return api.post<User>('/api/users/me/avatar', form);
  },

  registerDeviceToken: (data: DeviceToken) => api.post<void>('/api/users/me/device-tokens', data),

  deleteDeviceToken: (token: string) =>
    api.delete<void>(`/api/users/me/device-tokens/${encodeURIComponent(token)}`),
};
