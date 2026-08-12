import auth from '@react-native-firebase/auth';

// Set to true to use hardcoded test OTP flow without real Firebase phone auth
// (useful during development so you don't burn SMS quota / need a real device)
export const USE_MOCK_AUTH = false;

export const sendOtp = async (phoneNumber) => {
  // phoneNumber must be in E.164 format, e.g. +919999999999
  const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  return confirmation; // call confirmation.confirm(otpCode) later
};

export const confirmOtp = async (confirmation, code) => {
  const userCredential = await confirmation.confirm(code);
  return userCredential.user; // contains uid, phoneNumber etc.
};

export const signOutFirebase = async () => {
  await auth().signOut();
};

export default auth;