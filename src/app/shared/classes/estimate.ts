import { EstimateComponent } from './estimatecomponent';

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
    components: EstimateComponent[];

    constructor() {
        this.name = "";
        this.active = true;
        //this.components = new Array<EstimateComponent>();
    }
}