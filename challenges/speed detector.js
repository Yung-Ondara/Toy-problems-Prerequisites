function checkSpeed(speed) {
    // Define the speed limit
    const speedLimit = 70;
    const kmPerPoint = 5;
    const maxPoints = 12;
    
    // Check if speed is below the limit
    if (speed <= speedLimit) {
        return "Ok";
    }
    
    // Calculate demerit points
    // Math.floor ensures we get whole points (no partial points)
    const points = Math.floor((speed - speedLimit) / kmPerPoint);
    
    // Check if license should be suspended
    if (points > maxPoints) {
        return "License suspended";
    } else {
        return `Points: ${points}`;
    }
}

 

