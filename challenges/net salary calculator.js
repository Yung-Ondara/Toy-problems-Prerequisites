// Function to calculate PAYE (Tax)
function calculatePAYE(taxableIncome) {
    // Monthly PAYE tax bands as of 2024
    if (taxableIncome <= 24000) {
        return taxableIncome * 0.10;
    } else if (taxableIncome <= 32333) {
        return 2400 + (taxableIncome - 24000) * 0.25;
    } else if (taxableIncome <= 500000) {
        return 2400 + 2083.25 + (taxableIncome - 32333) * 0.30;
    } else if (taxableIncome <= 800000) {
        return 2400 + 2083.25 + 140300.1 + (taxableIncome - 500000) * 0.325;
    } else {
        return 2400 + 2083.25 + 140300.1 + 97500 + (taxableIncome - 800000) * 0.35;
    }
}
// Function to calculate NHIF deductions
function calculateNHIF(grossSalary) {
    // NHIF rates as of 2024
    if (grossSalary <= 5999) return 150;
    else if (grossSalary <= 7999) return 300;
    else if (grossSalary <= 11999) return 400;
    else if (grossSalary <= 14999) return 500;
    else if (grossSalary <= 19999) return 600;
    else if (grossSalary <= 24999) return 750;
    else if (grossSalary <= 29999) return 850;
    else if (grossSalary <= 34999) return 900;
    else if (grossSalary <= 39999) return 950;
    else if (grossSalary <= 44999) return 1000;
    else if (grossSalary <= 49999) return 1100;
    else if (grossSalary <= 59999) return 1200;
    else if (grossSalary <= 69999) return 1300;
    else if (grossSalary <= 79999) return 1400;
    else if (grossSalary <= 89999) return 1500;
    else if (grossSalary <= 99999) return 1600;
    else return 1700;
}
// Function to calculate NSSF deductions (using the new rates)
function calculateNSSF(grossSalary) {
    // NSSF Tier I and Tier II rates (6% for both employee and employer)
    const tierILimit = 6000; // First 6,000
    const tierIILimit = 18000; // Next 12,000

    let nssfDeduction = 0;

    // Tier I: 6% of income up to 6,000
    if (grossSalary > 0) {
        nssfDeduction += Math.min(grossSalary, tierILimit) * 0.06;
    }
    
    // Tier II: 6% of income between 6,001 and 18,000
    if (grossSalary > tierILimit) {
        nssfDeduction += Math.min(grossSalary - tierILimit, tierIILimit - tierILimit) * 0.06;
    }

    return nssfDeduction;
}

// Function to calculate personal relief
function calculatePersonalRelief() {
    // Standard personal relief is 2,400 per month
    return 2400;
}

// Function to calculate insurance relief
function calculateInsuranceRelief(nhif) {
    // Insurance relief is 15% of insurance premiums paid, max 5,000 per month
    // For simplicity, we'll just use 15% of NHIF as an example
    return Math.min(nhif * 0.15, 5000);
}

// Main function to calculate net salary
function calculateNetSalary(basicSalary, benefits = 0) {
    // Calculate gross salary
    const grossSalary = basicSalary + benefits;
    
    // Calculate NSSF deduction
    const nssfDeduction = calculateNSSF(grossSalary);
    
    // Calculate taxable income (gross salary minus pension contribution)
    const taxableIncome = grossSalary - nssfDeduction;
    
    // Calculate PAYE (tax) before relief
    const payeBeforeRelief = calculatePAYE(taxableIncome);
    
    // Calculate personal relief
    const personalRelief = calculatePersonalRelief();
    
    // Calculate NHIF deduction
    const nhifDeduction = calculateNHIF(grossSalary);
    
    // Calculate insurance relief
    const insuranceRelief = calculateInsuranceRelief(nhifDeduction);
    
    // Calculate net PAYE (tax after relief)
    const netPAYE = Math.max(0, payeBeforeRelief - personalRelief - insuranceRelief);
    
    // Calculate total deductions
    const totalDeductions = nssfDeduction + nhifDeduction + netPAYE;
    
    // Calculate net salary
    const netSalary = grossSalary - totalDeductions;
    
    // Return all calculated values
    return {
        basicSalary,
        benefits,
        grossSalary,
        nssfDeduction,
        taxableIncome,
        payeBeforeRelief,
        personalRelief,
        insuranceRelief,
        netPAYE,
        nhifDeduction,
        totalDeductions,
        netSalary
    };
}

// Function to display salary details
function displaySalaryDetails(salaryDetails) {
    console.log("===== SALARY DETAILS =====");
    console.log(`Basic Salary: KES ${salaryDetails.basicSalary.toFixed(2)}`);
    console.log(`Benefits: KES ${salaryDetails.benefits.toFixed(2)}`);
    console.log(`Gross Salary: KES ${salaryDetails.grossSalary.toFixed(2)}`);
    console.log("\n===== DEDUCTIONS =====");
    console.log(`NSSF Deduction: KES ${salaryDetails.nssfDeduction.toFixed(2)}`);
    console.log(`NHIF Deduction: KES ${salaryDetails.nhifDeduction.toFixed(2)}`);
    console.log(`PAYE (Tax): KES ${salaryDetails.netPAYE.toFixed(2)}`);
    console.log(`Total Deductions: KES ${salaryDetails.totalDeductions.toFixed(2)}`);
    console.log("\n===== NET SALARY =====");
    console.log(`Net Salary: KES ${salaryDetails.netSalary.toFixed(2)}`);
}

