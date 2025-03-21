function generateGrade() {
    // Prompt user for input
    const input = prompt("Enter student marks (0-100):");
    
    // Convert input to number
    const marks = parseFloat(input);
    
    // Validate input
    if (isNaN(marks)) {
        return "Invalid input! Please enter a number.";
    }
    
    // Validate input range
    if (marks < 0 || marks > 100) {
        return "Invalid input! Marks should be between 0 and 100.";
    }
    
    // Determine grade based on marks
    let grade;
    if (marks > 79) {
        grade = "A";
    } else if (marks >= 60) {
        grade = "B";
    } else if (marks >= 49) {
        grade = "C";
    } else if (marks >= 40) {
        grade = "D";
    } else {
        grade = "E";
    }
    
    return `Student grade: ${grade}`;
}

// Get user input
readline.question('Enter student marks (0-100): ', (input) => {
    const marks = parseFloat(input);
    
    if (isNaN(marks)) {
        console.log("Invalid input! Please enter a number.");
    } else {
        console.log(generateGrade(marks));
    }
    
    readline.close();
});