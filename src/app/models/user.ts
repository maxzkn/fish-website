export class User { // kur naudojame?
    uid?: String;
    username: String;
    email: String;
    roles: Roles;
    signedVia: String;
    
    constructor(authData){ // authData??
        this.email = authData.email;
        this.roles = { guest: true }
    }
}

export interface Roles{ // kur naudojame?
    guest: boolean;
    admin?: boolean;
}