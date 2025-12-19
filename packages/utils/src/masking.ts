/**
 * Mask sensitive data (e.g., SSN, bank account)
 */
export function maskSensitive(value: string, visibleChars = 4): string {
  if (value.length <= visibleChars) return value;
  const masked = '*'.repeat(value.length - visibleChars);
  return masked + value.slice(-visibleChars);
}

/**
 * Mask email (show only first char and domain)
 */
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!local || !domain) return email;
  return `${local[0]}${'*'.repeat(local.length - 1)}@${domain}`;
}

/**
 * Mask phone number
 */
export function maskPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 4) return phone;
  return '*'.repeat(cleaned.length - 4) + cleaned.slice(-4);
}

/**
 * Check if field should be masked based on user permissions
 */
export function shouldMaskField(fieldName: string, sensitiveFields: string[]): boolean {
  return sensitiveFields.includes(fieldName);
}

/**
 * Mask object fields based on sensitive field list
 */
export function maskObjectFields<T extends Record<string, unknown>>(
  obj: T,
  sensitiveFields: string[]
): T {
  const masked = { ...obj };

  for (const field of sensitiveFields) {
    if (field in masked && typeof masked[field] === 'string') {
      masked[field] = maskSensitive(masked[field] as string) as T[Extract<keyof T, string>];
    }
  }

  return masked;
}
