const fn = require("./function")

describe("calculateWageTS", () => {
    const expected: CalculatedWorkerWage = {
        workerName: "Amanda",
        clt: "CLT",
        hoursWorked: 160,
        wagePerHour: 20,
        overtime: 0,
        overtimeWagePerHour: 40,
        finalWage: 3200,
    };

    const workerName: string = "Amanda";
    const hoursWorked: number = 160;
    const wagePerHour: number = 20;
    const overtime: number = 0;
    const clt: boolean = true;
    
    it("should return the expected worker wage object when given valid input", () => {  
        const result: CalculatedWorkerWage = fn.calculateWageTS(workerName, hoursWorked, wagePerHour, overtime);
        expect(result).toMatchObject(expected);
    });
    it("should throw an error when workerName is not a string", () => {
        const args: (string | null | undefined | number | boolean | symbol)[] = [
          null,
          undefined,
          NaN,
          "",
          0,
          false,
        ];
        args.forEach((a: any) => {
          expect(() => {
            fn.calculateWageTS(a, hoursWorked, wagePerHour, overtime);
          }).toThrow();
        });
    });
    it("should throw an error when hoursWorked is negative", () => {
        const negativeHour: number = -10;
        try {
            const result: CalculatedWorkerWage = fn.calculateWageTS(workerName, negativeHour, wagePerHour, overtime);      
        } catch (error: any) {           
            expect(error.message).toBe("Hours worked, wage per hour and overtime must be positive numbers");
        }
    });

    it("should not return NaN or Infinity as the final wage", () => {
        const result: CalculatedWorkerWage = fn.calculateWageTS("Amanda", Number.MAX_SAFE_INTEGER, 1, 10);
        expect(isFinite(result.finalWage)).toBe(true);
    });

    it("should return zero final wage when hours worked is zero", () => {
        const result: CalculatedWorkerWage = fn.calculateWageTS(workerName, 0, wagePerHour, overtime)
        expect(result.finalWage).toBe(0);
    });
});