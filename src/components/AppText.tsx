import React from 'react';
import { Text, TextStyle, StyleProp } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { typography } from '../theme/typography';

type Variant = 'h1' | 'h2' | 'h3' | 'body' | 'bodyBold' | 'caption' | 'button';

interface AppTextProps {
  variant?: Variant;
  color?: 'secondary' | 'onAccent' | 'primary' | string;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  [key: string]: any;
}

const AppText = ({ variant = 'body', color, style, children, ...props }: AppTextProps) => {
  const { colors } = useTheme();

  let textColor: string = colors.text;
  if (color === 'secondary') textColor = colors.textSecondary;
  else if (color === 'onAccent') textColor = colors.onAccent;
  else if (color === 'primary') textColor = colors.primary;
  else if (color) textColor = color;

  const variantStyle = typography[variant] as TextStyle;

  return (
    <Text style={[variantStyle, { color: textColor }, style]} {...props}>
      {children}
    </Text>
  );
};

export default AppText;