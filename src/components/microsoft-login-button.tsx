"use client";

import { useState, useEffect, useRef } from "react";
import {
  AuthenticationResult,
  PublicClientApplication,
} from "@azure/msal-browser";
import { loginRequest, msalConfig } from "@/lib/msal-config";
import { MicrosoftIcon, TriangeErrorIcon } from "./icons";

export default function MicrosoftLoginButton({
  handleAuthentication,
}: {
  handleAuthentication: (accessToken: string) => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const msalInstanceRef = useRef<PublicClientApplication | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initializeMsal = async () => {
      try {
        const instance = new PublicClientApplication(msalConfig);

        await instance.initialize();

        // Handle any redirects that might be in progress
        await instance.handleRedirectPromise().catch((e) => {
          console.error("Error handling redirect:", e);
        });

        msalInstanceRef.current = instance;
        setIsInitialized(true);
      } catch (err) {
        console.error("Failed to initialize MSAL:", err);
        setError("Failed to initialize authentication service");
      }
    };

    initializeMsal();

    return () => {
      msalInstanceRef.current = null;
    };
  }, []);

  const handleMicrosoftLogin = async () => {
    if (!isInitialized || !msalInstanceRef.current) {
      setError(
        "Authentication service is not initialized yet. Please try again."
      );
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      let authResult: AuthenticationResult;
      const accounts = msalInstanceRef.current.getAllAccounts();
      if (accounts.length > 0) {
        // Try silent token acquisition
        try {
          const silentRequest = {
            scopes: loginRequest.scopes,
            account: accounts[0],
          };
          authResult = await msalInstanceRef.current.acquireTokenSilent(
            silentRequest
          );
        } catch (e) {
          // If silent fails, fallback to interactive
          console.error(
            "Silent token acquisition failed, falling back to popup:",
            e
          );
          authResult = await msalInstanceRef.current.loginPopup(loginRequest);
        }
      } else {
        // No accounts, do interactive login
        authResult = await msalInstanceRef.current.loginPopup(loginRequest);
      }
      if (authResult.accessToken) {
        await handleAuthentication(authResult.accessToken);
      } else {
        setError("Failed to get ID token from Microsoft");
      }
    } catch (err: any) {
      console.error("Microsoft login error:", err);
      setError(err.message || "Microsoft authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleMicrosoftLogin}
        disabled={isLoading || !isInitialized}
        className="w-[320px] flex text-[#3C4043] hover:bg-[rgba(66, 133, 244, 0.05)] items-center cursor-pointer w-50 gap-3 px-4 py-2 rounded-sm h-[38px] border border-gray-200 disabled:opacity-70"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <MicrosoftIcon />
        )}
        <span
          className="text-sm flex-1 text-center"
          style={{ fontFamily: "Google Sans,arial,sans-serif" }}
        >
          {isLoading
            ? "Signing in..."
            : !isInitialized
            ? "Initializing..."
            : "Sign in with Microsoft"}
        </span>
      </button>
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
          <p className="flex items-center text-sm text-red-700">
            <TriangeErrorIcon />
            {error}
          </p>
        </div>
      )}
    </div>
  );
}
