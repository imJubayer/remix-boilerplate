export function forgotPasswordMail(OTP: string): string {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Your OTP is </h2>
      <p>${OTP}</p>
    </div>
  `;
}
