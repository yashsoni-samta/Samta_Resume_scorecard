import { useState } from 'react';
import { TextInput, TextInputProps } from '@mantine/core';
import styles from './FloatingLabelInput.module.css';

export function FloatingLabelInput({ ...props }: TextInputProps) {
  const [focused, setFocused] = useState(false);
  const { value, leftSection, description } = props;

  // Example function to validate the value
  function validateValue(
    value: string | number | readonly string[] | undefined
  ): boolean {
    switch (typeof value) {
      case 'undefined':
        return false;
      case 'string':
        return value.trim().length !== 0;
      case 'number':
        return !isNaN(value); // Ensure the number is not NaN
      case 'object':
        if (Array.isArray(value)) {
          return (
            value.length > 0 &&
            value.every(
              (item) => typeof item === 'string' && item.trim().length !== 0
            )
          );
        } else {
          return false;
        }
      default:
        return false;
    }
  }

  const isFloating = validateValue(value) || focused;
  const updatedDesp = description?.toLocaleString() || '';

  return (
    <TextInput
      {...props}
      classNames={{
        root: styles.root,
        label: isFloating
          ? leftSection
            ? `${styles.label} ${styles.labelFloating} ${styles.labelWithLeftSection}`
            : `${styles.label} ${styles.labelFloating}`
          : leftSection
            ? `${styles.label} ${styles.labelNotFloating} ${styles.labelWithLeftSection}`
            : `${styles.label} ${styles.labelNotFloating}`,
        required: isFloating ? styles.requiredVisible : styles.requiredHidden,
        input: isFloating ? '' : styles.inputPlaceholderVisible,
        description: leftSection
          ? `${styles.description} ${styles.descriptionWithLeftSection} `
          : styles.description,
      }}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        setFocused(false);
        if (props.onBlur) {
          props.onBlur(e);
        }
      }}
      description={`${!isFloating ? updatedDesp : ''}`}
    />
  );
}
