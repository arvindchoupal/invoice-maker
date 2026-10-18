"use client";

import Script from "next/script";
import { useCallback, useRef, useState } from "react";

type GoogleCredentialResponse = { credential?: string };

type GoogleAccountsApi = {
  accounts: {
    id: {
      initialize(options: { client_id: string; callback: (response: GoogleCredentialResponse) => void; ux_mode: "popup" }): void;
      renderButton(element: HTMLElement, options: Record<string, string | number | boolean>): void;
    };
  };
};

declare global {
  interface Window {
    google?: GoogleAccountsApi;
  }
}

export function GoogleSignInButton({
  onCredential,
  disabled = false,
}: {
  onCredential: (credential: string) => void | Promise<void>;
  disabled?: boolean;
}) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [scriptError, setScriptError] = useState(false);
  const [buttonReady, setButtonReady] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const renderButton = useCallback(() => {
    if (!clientId || !buttonRef.current || !window.google) return;
    const buttonWidth = Math.max(240, Math.floor(buttonRef.current.clientWidth));
    buttonRef.current.replaceChildren();
    window.google.accounts.id.initialize({
      client_id: clientId,
      ux_mode: "popup",
      callback: (response) => {
        if (response.credential) void onCredential(response.credential);
      },
    });
    window.google.accounts.id.renderButton(buttonRef.current, {
      type: "standard",
      theme: "outline",
      size: "large",
      text: "continue_with",
      shape: "rectangular",
      logo_alignment: "left",
      width: buttonWidth,
    });
    setButtonReady(true);
  }, [clientId, onCredential]);

  if (!clientId) {
    return (
      <button className="min-h-11 w-full cursor-not-allowed rounded-xl border border-white/15 bg-white/[0.04] text-sm font-semibold text-slate-400" disabled type="button">
        Google login setup pending
      </button>
    );
  }

  return (
    <div aria-busy={disabled} className={disabled ? "pointer-events-none opacity-60" : undefined}>
      <Script
        id="google-identity-services"
        onError={() => setScriptError(true)}
        onReady={renderButton}
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
      />
      {scriptError ? (
        <p className="rounded-xl border border-red-400/20 bg-red-500/10 p-3 text-center text-sm text-red-100">
          Google login could not load. Please try again.
        </p>
      ) : (
        <div className="relative min-h-11 w-full">
          {!buttonReady ? (
            <div
              aria-live="polite"
              className="absolute inset-0 flex items-center justify-center gap-2 border border-slate-200 bg-white text-sm font-medium text-slate-600"
            >
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
              Loading Google sign-in…
            </div>
          ) : null}
          <div
            className={`min-h-11 w-full transition-opacity duration-150 ${buttonReady ? "opacity-100" : "opacity-0"}`}
            ref={buttonRef}
          />
        </div>
      )}
    </div>
  );
}
