import { Match } from "./Match";

export interface SingleMatch{
    handleAccordionClick: (id: string) => void;
    isExpanded:boolean;
    match:Match
}