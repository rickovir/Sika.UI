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
    expiresIn: number;
  
    constructor() {
        this.accessToken = '';
        this.expiresIn = 0;
    }
}