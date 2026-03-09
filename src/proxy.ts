export { auth as proxy } from "@/app/auth";

export const config = {
  matcher: ["/((?!api/auth|auth/signin|_next|favicon.ico).*)"],
};
