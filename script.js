const subjects = [
    "EM-5", "AOA", "OS", "BVLSI", "Track",
    "AOA(P)", "OS(P)", "BVLSI(P)", "Track(P)", "PS"
];
const timeSlots = ["9:00 - 11:00", "11:15 - 1:15", "1:45 - 3:45"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

document.getElementById('preferences-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const preferredSlot = this.elements['preferred-slot'].value;
    const dayOff1 = this.elements['day-off-1'].value;
    const dayOff2 = this.elements['day-off-2'].value;

    const timetables = generateTimetables(preferredSlot, dayOff1, dayOff2);
    displayTimetables(timetables);
});



function generateTimetables(preferredSlot, dayOff1, dayOff2) {
    const subjects = [
        "EM-5", "AOA", "OS", "BVLSI", "Track",
        "AOA(P)", "OS(P)", "BVLSI(P)", "Track(P)", "PS"
    ];
    const timeSlots = ["9:00 - 11:00", "11:15 - 1:15", "1:45 - 3:45"];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createEmptyTimetable() {
        const timetable = {};
        days.forEach(day => {
            timetable[day] = {};
            timeSlots.forEach(slot => {
                timetable[day][slot] = null;
            });
        });
        return timetable;
    }

    function isValidPlacement(timetable, day, slot, subject) {
        if (timetable[day][slot] !== null) return false;
        if (day === "Monday" && slot === "9:00 - 11:00") return false;
        return true;
    }

    function generateSingleTimetable(dayOff) {
        const timetable = createEmptyTimetable();
        const workingDays = days.filter(day => day !== dayOff);

        // Set day off if it's a valid day
        if (days.includes(dayOff)) {
            timeSlots.forEach(slot => {
                timetable[dayOff][slot] = "Day Off";
            });
        }

        // Set Monday's first slot as Teacher's meeting
        timetable["Monday"]["9:00 - 11:00"] = "Teachers Meeting";

        const subjectsCopy = [...subjects];
        shuffleArray(subjectsCopy);

        let subjectIndex = 0;
        for (const day of workingDays) {
            for (const slot of timeSlots) {
                if (isValidPlacement(timetable, day, slot, subjectsCopy[subjectIndex])) {
                    timetable[day][slot] = subjectsCopy[subjectIndex];
                    subjectIndex++;
                    if (subjectIndex >= subjectsCopy.length) {
                        return timetable; // All subjects placed
                    }
                }
            }
        }

        return null; // Unable to place all subjects
    }

    function optimizeTimetable(timetable, preferredSlot) {
        const preferredSlots = preferredSlot === 'morning' 
            ? ["9:00 - 11:00", "11:15 - 1:15"] 
            : ["11:15 - 1:15", "1:45 - 3:45"];

        for (const day of days) {
            if (timetable[day]["9:00 - 11:00"] === "Day Off") continue; // Skip day off

            const daySubjects = Object.values(timetable[day]).filter(s => s !== null && s !== "Teachers Meeting");
            const daySlots = Object.keys(timetable[day]).filter(s => timetable[day][s] !== "Teachers Meeting");

            // Sort subjects into preferred and non-preferred
            const preferred = daySubjects.filter(s => s.endsWith("(P)"));
            const nonPreferred = daySubjects.filter(s => !s.endsWith("(P)"));

            // Assign subjects to slots based on preference
            let prefIndex = 0;
            let nonPrefIndex = 0;
            for (const slot of daySlots) {
                if (preferredSlots.includes(slot) && prefIndex < preferred.length) {
                    timetable[day][slot] = preferred[prefIndex++];
                } else if (nonPrefIndex < nonPreferred.length) {
                    timetable[day][slot] = nonPreferred[nonPrefIndex++];
                }
            }
        }

        return timetable;
    }

    function generateValidTimetable(dayOff) {
        let attempts = 0;
        const maxAttempts = 100;

        while (attempts < maxAttempts) {
            const timetable = generateSingleTimetable(dayOff);
            if (timetable) {
                return optimizeTimetable(timetable, preferredSlot);
            }
            attempts++;
        }

        return null; // Unable to generate a valid timetable
    }

    const timetable1 = generateValidTimetable(dayOff1);
    const timetable2 = generateValidTimetable(dayOff2);

    return [timetable1, timetable2].filter(t => t !== null);
}




function displayTimetables(timetables) {
    const timetablesDiv = document.getElementById('timetables');
    timetablesDiv.innerHTML = '';

    timetables.forEach((timetable, index) => {
        const table = document.createElement('table');
        const caption = table.createCaption();
        caption.textContent = `Option ${index + 1}`;

        const headerRow = table.insertRow();
        headerRow.insertCell().textContent = "Time / Day";
        days.forEach(day => {
            headerRow.insertCell().textContent = day;
        });

        timeSlots.forEach(slot => {
            const row = table.insertRow();
            row.insertCell().textContent = slot;
            days.forEach(day => {
                const cell = row.insertCell();
                if (timetable[day][slot] === "Day Off") {
                    cell.textContent = ""; // Empty cell for day off
                } else {
                    cell.textContent = timetable[day][slot] || ""; // Display subject or empty
                }
            });
        });

        timetablesDiv.appendChild(table);
    });
}
