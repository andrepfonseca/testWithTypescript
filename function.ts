
interface CalculatedWorkerWage {
    workerName: string;
    clt: string;
    hoursWorked: number;
    wagePerHour: number;
    overtime: number;
    overtimeWagePerHour: number;
    finalWage: number;
}

function calculateWageTS(
    workerName: string,
    hoursWorked: number,
    wagePerHour: number,
    overtime: number = 0,
    clt: boolean = true
): CalculatedWorkerWage {
    if (!workerName || typeof workerName !== "string") {
        throw new Error("Worker name is required and must be a string");
    }

    if (
        typeof hoursWorked !== "number" ||
        typeof wagePerHour !== "number" ||
        typeof overtime !== "number"
    ) {
        throw new Error("Hours worked, wage per hour and overtime must be numbers");
    }

    if (hoursWorked < 0 || wagePerHour < 0 || overtime < 0) {
        throw new Error("Hours worked, wage per hour and overtime must be positive numbers");
    }

    const OVERTIME_MULTIPLIER: number = 2;
    const normalWage: number = hoursWorked * wagePerHour;
    const overtimeWage: number = overtime * OVERTIME_MULTIPLIER * wagePerHour;
    const finalWage: number = normalWage + overtimeWage;
  
    return{
        workerName,
        clt: clt ? "CLT" : "PJ",
        hoursWorked,
        wagePerHour,
        overtime,
        overtimeWagePerHour: OVERTIME_MULTIPLIER * wagePerHour,
        finalWage,
    };
}
  
  console.log(calculateWageTS("Amanda", 2, 160, 20));
  
  module.exports = {
    calculateWageTS,
  };