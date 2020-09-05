export class UserLogin{
    username:string;
    password:string;

    constructor()
    {
        this.username = '';
        this.password = '';
    }
}

export class JwtToken {
    accessToken: string;
    refreshToken: string;
  
    constructor() {
        this.accessToken = '';
        this.refreshToken = '';
    }
}