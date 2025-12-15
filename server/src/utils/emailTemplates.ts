export const emailVerificationMailGenContent = (fullname: string, verificationUrl: string) => ({
  body: {
    name: fullname,
    intro: "Welcome to Sparcle Cart! We're very excited to have you on board.",
    action: {
      instructions: "Please verify your email to continue with Sparcle Cart.",
      button: {
        color: "#15181cff",
        text: "Verify Email",
        link: verificationUrl,
      },
    },
    outro: "Ignore this email if you haven't created an account with Sparcle Cart.",
  },
});

export const forgotPasswordMailGenContent = (fullname: string, forgotPasswordUrl: string) => ({
  body: {
    name: fullname,
    intro: "You recently requested to reset your password for your Sparcle Cart account.",
    action: {
      instructions: "Click the button below to reset your password:",
      button: {
        color: "#15181cff",
        text: "Reset Password",
        link: forgotPasswordUrl,
      },
    },
    outro:
      "If you did not request a password reset, no further action is required. This link will expire shortly for your security.",
  },
});
