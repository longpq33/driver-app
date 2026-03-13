import { COLORS } from '@/themes/colors';
import React, { useRef, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

export interface OtpInputRef {
  focus: () => void;
  clear: () => void;
}

interface OtpInputProps {
  length?: number;
  onCodeChange: (code: string) => void;
  autoFocus?: boolean;
  value?: string;
}

const OtpInput = forwardRef<OtpInputRef, OtpInputProps>(({
  length = 6,
  onCodeChange,
  autoFocus = true,
  value,
}, ref) => {
  const inputRefs = useRef<TextInput[]>([]);
  const [code, setCode] = useState<string[]>(() => {
    if (value) {
      const arr = value.split('');
      while (arr.length < length) arr.push('');
      return arr.slice(0, length);
    }
    return new Array(length).fill('');
  });

  useImperativeHandle(ref, () => ({
    focus: () => {
      // Find first empty or any input to focus
      const indexToFocus = code.findIndex(c => !c);
      inputRefs.current[indexToFocus >= 0 ? indexToFocus : 0]?.focus();
    },
    clear: () => {
      setCode(new Array(length).fill(''));
      onCodeChange('');
      // Focus first input after clear
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    },
  }));

  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [autoFocus]);

  useEffect(() => {
    onCodeChange(code.join(''));
  }, [code, onCodeChange]);

  const handleChangeText = (text: string, index: number) => {
    // Allow single digit input
    const cleanText = text.replace(/[^0-9]/g, '').slice(-1);

    const newCode = [...code];
    newCode[index] = cleanText;
    setCode(newCode);

    // Auto-focus to next input if current is filled
    if (cleanText && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace - go to previous input
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleFocus = (_index: number) => {
    // When focusing any input, select all text for easy replacement
  };

  return (
    <View style={styles.container}>
      {code.map((digit, index) => (
        <TextInput
          key={index}
          ref={(el) => {
            if (el) {
              inputRefs.current[index] = el;
            }
          }}
          style={[styles.input, digit && styles.inputFilled]}
          value={digit}
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          onFocus={() => handleFocus(index)}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus
          autoFocus={index === 0 && autoFocus}
          placeholderTextColor="#999"
        />
      ))}
    </View>
  );
});

export default OtpInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    width: 48,
    height: 56,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
    backgroundColor: '#fff',
  },
  inputFilled: {
    borderColor: COLORS.primary,
    backgroundColor: '#FFF5EB',
  },
});
