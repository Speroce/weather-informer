export class Api {
  static async signUp(username: string, password: string) {
    return this.post<{ token: string }>('/api/signup', { username, password });
  }
  static async signIn(username: string, password: string) {
    return this.post<{ token: string }>('/api/signin', { username, password });
  }
  static async signOut(token: string) {
    return this.post('/api/signin', { token });
  }
  static async getMe(token: string) {
    return this.get<{ isAuth: boolean; username?: string }>('api/me', {
      token
    });
  }
  private static BACK_URL = 'http://localhost:1234';
  private static async get<T = void>(
    url: string,
    params: Record<string, any> = {}
  ): Promise<T> {
    const fullUrl = new URL(url);
    for (const key in params) {
      fullUrl.searchParams.set(key, params[key]);
    }
    try {
      const response = await fetch(`${this.BACK_URL}${fullUrl.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw 0;
    }
  }
  private static async post<T = void>(url: string, body: any): Promise<T> {
    try {
      const response = await fetch(`${this.BACK_URL}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw 0;
    }
  }
}
