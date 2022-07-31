export class AppConstants {
    public static get apiURL(): string {
      return "http://my-booking.cba.pl/api";
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
  }
  