/* app/lib/auth-actions.ts ------------------------------------------------- */
"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/* ──────────────────────────
   Utils (kept in-file only)
   ────────────────────────── */

const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL ?? ""}/api`;

/** Quick “smart” capitalizer for names */
const capitalize = (s: string) =>
  typeof s === "string" && s.length
    ? s[0].toUpperCase() + s.slice(1).toLowerCase()
    : s;

/** Tiny helper for typed POST requests that throws on non-200 */
async function postJSON<TResponse>(
  endpoint: string,
  body: unknown,
  errorPrefix = "Request failed"
): Promise<TResponse> {
  console.log(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
    // (Optional) -- keep cookies/session
    cache: "no-store",
  });
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
    // (Optional) -- keep cookies/session
    cache: "no-store",
  });

  if (!res.ok) {
    // Try to capture an API-provided message
    let message = res.statusText;
    try {
      const json = (await res.json()) as { message?: string };
      if (json?.message) message = json.message;
    } catch {
      /* ignore JSON parse errors */
    }
    throw new Error(`${errorPrefix}: ${message}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return (await res.json()) as TResponse;
}

/* ──────────────────────────
   Type stubs (simplified)
   ────────────────────────── */

export interface TUserData {
  accessToken: string;
  accessTokenExpiresAt: string;
  signedInWith: string;
  profile: {
    id: number | string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    image: string;
    nationality: string;
    dateOfBirth: string;
    creationDate: string;
    gender: string;
    profilePicture: string;
  };
}

/* ──────────────────────────
   Auth helpers (server actions)
   ────────────────────────── */

export async function authenticateCR(formData: FormData): Promise<void> {
  try {
    const { accessToken } = await postJSON<{ accessToken: string }>("/Auth", {
      email: formData.get("email"),
      password: formData.get("password"),
    });

    // set HTTP-only cookie
    (await cookies()).set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });
  } catch (err: any) {
    // thrown errors become state.error in useActionState
    console.log(err);
    throw new Error(err?.message || "Login failed");
  }
}

/** Google OIDC login */
export async function authenticateGO(
  idToken: string | undefined,
  accessToken: string | undefined
) {
  try {
    if (!idToken || !accessToken) return "User not found";

    const user = await postJSON<TUserData>("/Auth/google-login", {
      idToken,
      accessToken,
    });

    // You might persist user in cookies/session here if needed
    redirect("/");
    return user;
  } catch (err) {
    console.error(err);
    return "Failed to login via Google. Please try another method.";
  }
}

/** Facebook login */
export async function authenticateFB(accessToken: string | undefined) {
  try {
    if (!accessToken) return "User not found";

    const user = await postJSON<TUserData>("/Auth/facebook-login", {
      accessToken,
    });

    redirect("/");
    return user;
  } catch (err) {
    console.error(err);
    return "Failed to login via Facebook. Please try another method.";
  }
}

/** Traditional e-mail registration */
export async function register(
  _prevState: string | undefined,
  formData: FormData
) {
  try {
    await postJSON("/Users/register", {
      firstName: capitalize(formData.get("firstName") as string),
      lastName: capitalize(formData.get("lastName") as string),
      number: formData.get("phone"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    redirect("/account-verification");
  } catch (err) {
    return (err as Error).message ?? "Failed to register user";
  }
}

/** Verify e-mail with OTP */
export async function verifyAccount(
  _prevState: string | undefined,
  { code }: { code: string }
) {
  try {
    await postJSON("/Users/activate", { code });
    redirect("/signin");
  } catch (err) {
    return (err as Error).message ?? "Failed to activate user";
  }
}

/** Validate “reset-password” OTP */
export async function resetPassOTP(
  _prevState: string | undefined,
  { code, email }: { code: string; email: string }
) {
  try {
    await postJSON("/Users/verify-reset-password", { resetCode: code, email });
    redirect("/set-new-password");
  } catch (err) {
    return (err as Error).message ?? "Failed to validate OTP";
  }
}

/** Trigger password-reset e-mail */
export async function resetPassViaEmail(
  _prevState: string | undefined,
  { email }: { email: string }
) {
  try {
    await postJSON("/Users/forgot-password", { email });
    redirect("/password-reset");
  } catch (err) {
    return (err as Error).message ?? "Failed to find user";
  }
}

/** Set a brand-new password */
export async function setNewPassword(
  _prevState: string | undefined,
  {
    email,
    resetCode,
    newPassword,
  }: { email: string; resetCode: string; newPassword: string }
) {
  try {
    await postJSON("/Users/reset-password", { email, resetCode, newPassword });
    redirect("/signin");
  } catch (err) {
    return (err as Error).message ?? "Password reset failed";
  }
}

/** Resend verification OTP */
export async function resendOtp(
  _prevState: string | undefined,
  email: string | undefined
) {
  if (!email) return "E-mail is missing";

  try {
    await postJSON("/Users/resend", { email });
    // No redirect; just return success so the UI can toast
    return undefined;
  } catch (err) {
    return (err as Error).message ?? "Failed to resend code";
  }
}

/** Log out current user */
export async function logOut() {
  try {
    await postJSON("/Auth/logout", {}, "Logout failed");
    redirect("/"); // or redirect("/signin")
  } catch (err) {
    console.error(err);
    throw err; // propagate to error.tsx
  }
}
