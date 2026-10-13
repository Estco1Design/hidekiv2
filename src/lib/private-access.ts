export function hasPrivateAccess(
  user: { email: string; emailVerified: boolean } | null | undefined,
  invitationList: string,
): boolean {
  if (!user?.emailVerified) return false;
  const invited = new Set(
    invitationList
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );
  return invited.has(user.email.toLowerCase());
}
