export class AppConstants {
    public static get apiURL(): string {
      return "http://fast-cms.pl/api";
    }
    public static get rootURL(): string {
      return "/pressure";
    }
    public static get tokenHeader(): string {
      return "X-Auth-Token";
    }
    public static get accessToken(): string {
      return "MyPressureAccessToken";
    }
    public static get userName(): string {
      return "MyPressureUserName";
    }
    public static get userEmail(): string {
      return "MyPressureUserEmail";
    }
    public static get userStatus(): string {
      return "MyPressureUserStatus";
    }
    public static get loggedIn(): string {
      return "MyPressureLoggedIn";
    }
    public static get loggedOut(): string {
      return "MyPressureLoggedOut";
    }
    public static get messageDelay(): number {
      return 3000;
    }
    public static get focusDelay(): number {
      return 500;
    }
    public static get routeDelay(): number {
      return 1000;
    }
  }
  