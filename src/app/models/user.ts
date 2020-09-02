export class User{
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
// musu Vartotojo interface

export interface Roles{
    guest: boolean;
    admin?: boolean;
}
//? reiskia, jog sis paremetras nebutinai gali buti grazinamoje/irasamoje informacijoje