export class EstimateComponent {
    id: number;
    name: string;
    complexity: string;
    notes: Text;
    createdAt: Date;
    updatedAt: Date;
    estimateId: number;
    breakdown: any[];

    constructor() {
        this.name = "";
        this.breakdown = [];
    }
}