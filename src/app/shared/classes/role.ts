export class Role {
    id: number;
    name: string;
    team: string;
    billRate: number;
    active: boolean;
    default: boolean;
    overhead:number;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
        this.name = "";
        this.team = "";
        this.active = true;
        this.default = false;
    }
}
