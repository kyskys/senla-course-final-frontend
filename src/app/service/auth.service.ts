export class AuthService{

	setToken(token: string) {
		localStorage.setItem('token',token);
	}

	getToken(): string {
		return localStorage.getItem('token');
	}
	
	isAuthenticated(): boolean {
		let token: string = localStorage.getItem('token');
		return (token != null && token != '');
	}
}