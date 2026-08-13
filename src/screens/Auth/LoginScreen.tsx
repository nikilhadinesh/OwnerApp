import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme } from '../../context/ThemeContext';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import { loginOwnerEmail, registerOwnerEmail } from '../../api/authApi';
import { setLoading, setError, loginSuccess } from '../../redux/slices/authSlice';

type Mode = 'phone' | 'email';

const LoginScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const [mode, setMode] = useState<Mode>('phone');

  // ---- phone state ----
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // ---- email state ----
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErrors, setEmailErrors] = useState<{ [k: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const handleContinuePhone = () => {
    setPhoneError('');
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length !== 10) {
      setPhoneError('Enter a valid 10-digit phone number');
      return;
    }
    const e164Phone = `+91${digitsOnly}`;
    // OtpScreen triggers the actual Firebase sendOtp() call on mount,
    // so it can also handle "resend" without duplicating logic here.
    navigation.navigate('Otp', { phoneNumber: e164Phone });
  };

  const validateEmailForm = () => {
    const errors: { [k: string]: string } = {};
    if (isRegister && !name.trim()) errors.name = 'Name is required';
    if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Enter a valid email';
    if (password.length < 6) errors.password = 'Password must be at least 6 characters';
    setEmailErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEmailSubmit = async () => {
    if (!validateEmailForm()) return;

    try {
      setSubmitting(true);
      dispatch(setLoading(true));

      const response = isRegister
        ? await registerOwnerEmail({ name: name.trim(), email: email.trim(), password })
        : await loginOwnerEmail(email.trim(), password);

      const { owner, token } = response.data;
      dispatch(loginSuccess({ owner, token }));
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || 'Something went wrong. Please try again.';
      setEmailErrors({ form: message });
      dispatch(setError(message));
    } finally {
      setSubmitting(false);
      dispatch(setLoading(false));
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <AppText variant="h2">Welcome back 👋</AppText>
          <AppText variant="body" color="secondary">
            Manage your track, bookings and events in one place.
          </AppText>
        </View>

        {/* ---- tab switcher ---- */}
        <View style={[styles.tabRow, { backgroundColor: colors.surface }]}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              mode === 'phone' && { backgroundColor: colors.primary },
            ]}
            onPress={() => setMode('phone')}
          >
            <AppText
              variant="bodyBold"
              color={mode === 'phone' ? 'onAccent' : 'secondary'}
            >
              Phone OTP
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              mode === 'email' && { backgroundColor: colors.primary },
            ]}
            onPress={() => setMode('email')}
          >
            <AppText
              variant="bodyBold"
              color={mode === 'email' ? 'onAccent' : 'secondary'}
            >
              Email
            </AppText>
          </TouchableOpacity>
        </View>

        {mode === 'phone' ? (
          <View style={styles.form}>
            <View style={styles.phoneRow}>
              <View
                style={[
                  styles.countryCode,
                  { borderColor: colors.border, backgroundColor: colors.surface },
                ]}
              >
                <AppText variant="bodyBold">+91</AppText>
              </View>
              <AppInput
                style={styles.phoneInput}
                placeholder="10-digit phone number"
                keyboardType="number-pad"
                maxLength={10}
                value={phone}
                onChangeText={(t: string) => setPhone(t.replace(/\D/g, ''))}
                error={phoneError} label={undefined} secureTextEntry={undefined}              />
            </View>

            <AppButton
              title="Send OTP"
              onPress={handleContinuePhone}
              style={{ marginTop: 8 }}
            />
          </View>
        ) : (
          <View style={styles.form}>
            {isRegister && (
              <AppInput
                  label="Name"
                  placeholder="Your full name"
                  value={name}
                  onChangeText={setName}
                  error={emailErrors.name} secureTextEntry={undefined} keyboardType={undefined} maxLength={undefined} style={undefined}              />
            )}
            <AppInput
                label="Email"
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                error={emailErrors.email} secureTextEntry={undefined} maxLength={undefined} style={undefined}            />
            <AppInput
                label="Password"
                placeholder="••••••••"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                error={emailErrors.password} keyboardType={undefined} maxLength={undefined} style={undefined}            />
            {emailErrors.form ? (
              <AppText variant="caption" color={colors.danger} style={{ marginBottom: 8 }}>
                {emailErrors.form}
              </AppText>
            ) : null}

            <AppButton
              title={isRegister ? 'Create account' : 'Login'}
              onPress={handleEmailSubmit}
              loading={submitting}
              style={{ marginTop: 8 }}
            />

            <TouchableOpacity
              style={styles.switchModeLink}
              onPress={() => {
                setIsRegister((prev) => !prev);
                setEmailErrors({});
              }}
            >
              <AppText variant="body" color="secondary">
                {isRegister ? 'Already have an account? ' : "Don't have an account? "}
                <AppText variant="bodyBold" color="primary">
                  {isRegister ? 'Login' : 'Register'}
                </AppText>
              </AppText>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1, padding: 24, justifyContent: 'center' },
  header: { marginBottom: 24, gap: 4 },
  tabRow: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 4,
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  form: { gap: 4 },
  phoneRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  countryCode: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneInput: { flex: 1, marginBottom: 0 },
  switchModeLink: { marginTop: 16, alignItems: 'center' },
});

export default LoginScreen;