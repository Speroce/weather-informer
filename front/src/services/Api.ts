export class Api {
  static async signUp(username: string, password: string) {
    return this.post<{ token: string }>('/api/signup', { username, password });
    
  }
  private static BACK_URL = 'http://localhost:1234';
  private static async get() {

  }
  private static async post<T>(url: string, body: any): Promise<T> {
    const response = await fetch(`${this.BACK_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return data;
  }
}
