export const generateSecurePassword = (length = 12) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    const values = new Uint32Array(length);
    crypto.getRandomValues(values);
  
    return Array.from(values).map(v => charset[v % charset.length]).join('');
  }