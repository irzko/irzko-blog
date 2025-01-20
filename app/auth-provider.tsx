import React from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export default function AuthProvider({
  children,
  session,
}: Readonly<{ children: React.ReactNode; session: Session | null }>) {
  return (
    <SessionProvider
      basePath="/auth"
      session={session}
      refetchOnWindowFocus={false}
    >
      {children}
    </SessionProvider>
  );
}
