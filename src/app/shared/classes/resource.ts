export class Resource {
    id: number;
    resourceName: string;
    team: string;
    organization: string;
    resourceType: string;
    role: string;
    techStack: string;
    billRate: number;
    startDateActive: Date;
    endDateActive: Date;
    location: string;
    capitalizationRatio: number;
    budgetedFlag: boolean;
    loadHoursFlag: boolean;
    activeFlag: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
        this.resourceName = "";
        this.team = "";
        this.organization = "";
        this.resourceType = "";
        this.role = "";
        this.techStack = "";
        this.location = "";
        this.budgetedFlag = true;
        this.loadHoursFlag = true;
        this.activeFlag = true;
    }
}
