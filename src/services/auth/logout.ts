// In JWT stateless auth, logout is handled client-side. This service is a stub for extensibility (e.g., token blacklist).
export async function logoutUserService() {
  // No server-side action for stateless JWT logout
  return { message: "Successfully logged out" };
}
