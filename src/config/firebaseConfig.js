import auth from '@react-native-firebase/auth';

// Holds the in-progress phone confirmation between the Login screen (sendOtp)
// and the Otp screen (confirmOtp), since it can't be passed via navigation params.
let pendingConfirmation = null;
let pendingPhoneNumber = null;

export const sendOtp = async (phoneNumber) => {
  // phoneNumber must be in E.164 format, e.g. +919999999999
  const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  pendingConfirmation = confirmation;
  pendingPhoneNumber = phoneNumber;
  return confirmation; // call confirmation.confirm(otpCode) later
};

export const getPendingConfirmation = () => pendingConfirmation;

export const resendOtp = async (phoneNumber) => {
  return sendOtp(phoneNumber || pendingPhoneNumber);
};

export const confirmOtp = async (confirmation, code) => {
  const userCredential = await confirmation.confirm(code);
  pendingConfirmation = null;
  return userCredential.user; // contains uid, phoneNumber etc.
};

export const signInWithEmail = async (email, password) => {
  const userCredential = await auth().signInWithEmailAndPassword(email, password);
  return userCredential.user;
};

export const signUpWithEmail = async (email, password) => {
  const userCredential = await auth().createUserWithEmailAndPassword(email, password);
  return userCredential.user;
};

export const signOutFirebase = async () => {
  pendingConfirmation = null;
  pendingPhoneNumber = null;
  await auth().signOut();
};

// Maps Firebase Auth error codes to user-friendly messages.
export const getFriendlyAuthError = (error) => {
  const code = error?.code || '';
  switch (code) {
    case 'auth/invalid-phone-number':
      return 'That phone number looks invalid.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    case 'auth/invalid-verification-code':
      return 'Incorrect OTP. Please check and try again.';
    case 'auth/session-expired':
    case 'auth/code-expired':
      return 'This OTP has expired. Please resend.';
    case 'auth/email-already-in-use':
      return 'An account already exists with this email.';
    case 'auth/invalid-email':
      return 'Enter a valid email address.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password.';
    case 'auth/weak-password':
      return 'Password is too weak. Use at least 6 characters.';
    case 'auth/network-request-failed':
      return 'Network error. Check your connection and try again.';
    default:
      return error?.message || 'Something went wrong. Please try again.';
  }
};

export default auth;