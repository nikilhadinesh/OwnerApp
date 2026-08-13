import { loginOwner, registerOwner } from '../api/authApi';

// After a successful Firebase auth (phone OTP or email), sync with our own
// backend: try to log in an existing TrackOwner by firebaseUid, and if none
// exists yet, register a new one using whatever profile info we have.
//
// extra can contain: { name, email, phone } — filled in from the screen
// (phone screen passes phone, email screen passes name + email).
export const syncOwnerWithBackend = async (firebaseUser, extra = {}) => {
  const firebaseUid = firebaseUser.uid;

  try {
    const { data } = await loginOwner(firebaseUid);
    return data; // { owner, token }
  } catch (error) {
    const status = error?.response?.status;
    const isNotRegistered = status === 404;

    if (!isNotRegistered) {
      throw error;
    }

    const payload = {
      firebaseUid,
      name: extra.name || firebaseUser.displayName || 'Track Owner',
      phone: extra.phone || firebaseUser.phoneNumber || '',
      email: extra.email || firebaseUser.email || '',
    };

    const { data } = await registerOwner(payload);
    return data; // { owner, token }
  }
};