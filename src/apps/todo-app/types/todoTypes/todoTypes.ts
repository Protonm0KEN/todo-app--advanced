import { todoStepI } from "../todoStepTypes/todoStepStypes";

export interface todoI {
    todoTitle: string,
    todoContent: string,
    todoId: string,
    todoDateOfCreation: string,
    todoDateOfFinishing: string,
    todoTimeOfCreation: string,
    todoTimeOfFinishing: string,
    todoState: string,
    todoSteps: todoStepI[]
}
export enum todoStates {
    Active = "Active",
    Deffered = "Deffered",
    Complete = "Complete"
}