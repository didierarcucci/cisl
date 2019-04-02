import { LookupValue } from './lookupValue';

export class ComponentBreakdown {
    id: number;
    componentId: number;
    phaseId: number;
    hours: number;
    createdAt: Date;
    updatedAt: Date;
    phase: LookupValue;
    
}