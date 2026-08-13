import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme } from '../../context/ThemeContext';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import { sendOtp, confirmOtp } from '../../config/firebaseConfig';
import { loginOwner, registerOwner } from '../../api/authApi';
import { setLoading, setError, loginSuccess } from '../../redux/slices/authSlice';

const RESEND_SECONDS = 30;

const OtpScreen = ({ route, navigation }: any) => {
  const { phoneNumber } = route.params;
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const confirmationRef = useRef<any>(null);
  const [code, setCode] = useState('');
  const [error, setLocalError] = useState('');
  const [sending, setSending] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [timer, setTimer] = useState(RESEND_SECONDS);

  // For the flow where a brand-new owner needs a name before we can register them
  const [needsName, setNeedsName] = useState(false);
  const [name, setName] = useState('');
  const [firebaseUid, setFirebaseUid] = useState('');
  const [registering, setRegistering] = useState(false);

  const triggerSendOtp = async () => {
    try {
      setSending(true);
      setLocalError('');
      confirmationRef.current = await sendOtp(phoneNumber);
      setTimer(RESEND_SECONDS);
    } catch (err: any) {
      setLocalError(err?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    triggerSendOtp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const handleVerify = async () => {
    if (code.length !== 6) {
      setLocalError('Enter the 6-digit OTP');
      return;
    }
    if (!confirmationRef.current) {
      setLocalError('OTP session expired, please resend');
      return;
    }

    try {
      setVerifying(true);
      setLocalError('');
      const user = await confirmOtp(confirmationRef.current, code);

      dispatch(setLoading(true));
      try {
        const response = await loginOwner(user.uid);
        const { owner, token } = response.data;
        dispatch(loginSuccess({ owner, token }));
      } catch (err: any) {
        if (err?.response?.status === 404) {
          // New owner: ask for name, then register
          setFirebaseUid(user.uid);
          setNeedsName(true);
        } else {
          throw err;
        }
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || 'Invalid OTP, please try again.';
      setLocalError(message);
      dispatch(setError(message));
    } finally {
      setVerifying(false);
      dispatch(setLoading(false));
    }
  };

  const handleRegister = async () => {
    if (!name.trim()) {
      setLocalError('Enter your name to continue');
      return;
    }
    try {
      setRegistering(true);
      setLocalError('');
      const response = await registerOwner({
        name: name.trim(),
        phone: phoneNumber,
        firebaseUid,
      });
      const { owner, token } = response.data;
      dispatch(loginSuccess({ owner, token }));
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || 'Registration failed, please try again.';
      setLocalError(message);
    } finally {
      setRegistering(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backLink}>
          <AppText variant="body" color="secondary">
            ← Back
          </AppText>
        </TouchableOpacity>

        <AppText variant="h2">Verify your number</AppText>
        <AppText variant="body" color="secondary" style={{ marginBottom: 24 }}>
          {sending ? `Sending OTP to ${phoneNumber}...` : `Enter the OTP sent to ${phoneNumber}`}
        </AppText>

        {!needsName ? (
          <>
            <AppInput
              placeholder="6-digit OTP"
              keyboardType="number-pad"
              maxLength={6}
              value={code}
              onChangeText={(t: string) => setCode(t.replace(/\D/g, ''))}
              error={error}
              editable={!sending} label={undefined} secureTextEntry={undefined} style={undefined}            />

            <AppButton
              title="Verify & Continue"
              onPress={handleVerify}
              loading={verifying}
              disabled={sending}
              style={{ marginTop: 8 }}
            />

            <TouchableOpacity
              style={styles.resendLink}
              disabled={timer > 0 || sending}
              onPress={triggerSendOtp}
            >
              <AppText variant="body" color={timer > 0 ? 'secondary' : 'primary'}>
                {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
              </AppText>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <AppText variant="bodyBold" style={{ marginBottom: 8 }}>
              Looks like you're new here — what's your name?
            </AppText>
            <AppInput
                placeholder="Your full name"
                value={name}
                onChangeText={setName}
                error={error} label={undefined} secureTextEntry={undefined} keyboardType={undefined} maxLength={undefined} style={undefined}            />
            <AppButton
              title="Create account"
              onPress={handleRegister}
              loading={registering}
              style={{ marginTop: 8 }}
            />
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  backLink: { position: 'absolute', top: 24, left: 24 },
  resendLink: { marginTop: 16, alignItems: 'center' },
});

export default OtpScreen;