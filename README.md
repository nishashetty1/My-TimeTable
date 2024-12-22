# TimeTable Generator

This is a web-based TimeTable Generator made using AI. Designed to help students to easily create their weekly schedules based on their preferences. The application allows users to specify their preferred time slot (morning or afternoon) and select two days off. The generator then generates valid and optimized timetables with respect to the preferences.

## Features

- **Preferred Time Slot**: Choose between "Morning" or "Afternoon" time slots for classes.
- **Day Off Preferences**: Select two days off from Monday to Friday.
- **Randomized Subject Placement**: Subjects are shuffled and placed randomly into available slots, ensuring a varied schedule every time.
- **Optimized Schedule**: The generated timetable is optimized for the user's preferred time slot.

## How It Works

1. The user selects their **preferred time slot** (morning or afternoon) from the dropdown.
2. The user selects their **first and second choice for a day off**.
3. Upon submission, the program generates a timetable with the following conditions:
   - The first slot on Monday is reserved for "Teachers Meeting".
   - The selected days off will have no classes assigned.
   - The timetable is filled with subjects, ensuring that each day has a valid subject in each time slot.
   - The timetable is optimized based on the user's preferred time slot.

## How to Run

1. **Clone or Download the Repository**: 
    - You can clone this repository or download it as a ZIP file.
  
    ```bash
    git clone https://github.com/yourusername/timetable-generator.git
    ```

2. **Open the `index.html` File**: 
    - Simply open the `index.html` file in your browser to run the application.

## Contributing

If you would like to contribute to this project, feel free to fork the repository and submit a pull request. Please ensure your contributions align with the project's goals.

Happy Timetabling! 📅
