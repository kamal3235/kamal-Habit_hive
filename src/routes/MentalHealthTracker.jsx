import HabitTracker from "../components/HabitTracker";
import meditatingBee from "../assets/meditatingBee.jpg";

const mentalConfig = {
  title: "Your Mental Health Hive",
  imageSrc: meditatingBee,
  entryLabel: "How many minutes did you meditate or reflect?",
  placeholder: "e.g. 15",
  unit: "min",
  mosaicGridSize: 4,
  clearWarning:
    "Are you sure you want to clear all your mental health data? This cannot be undone.",
  inspoQuote: "Bee Kind to Your Mind!",
};

const MentalHealthTracker = ({ entries, setEntries }) => (
  <HabitTracker entries={entries} setEntries={setEntries} {...mentalConfig} />
);

export default MentalHealthTracker;
