export class Estimate {
    id: number;
    name: string;
    version: number;
    inScope: Text;
    outOfScope: Text;
    assumptions: Text;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
        this.name = "";
        this.active = true;
    }
}