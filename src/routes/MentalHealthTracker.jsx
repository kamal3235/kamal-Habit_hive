import HabitTracker from "../components/HabitTracker";
import mentalImage from "../assets/codingImage.jpg"; // Use your own image

const mentalConfig = {
  title: "Your Mental Health Hive",
  imageSrc: mentalImage,
  entryLabel: "How many hours did you meditate or reflect?",
  placeholder: "e.g. 0.5",
  unit: "h",
  mosaicGridSize: 4,
  clearWarning:
    "Are you sure you want to clear all your mental health data? This cannot be undone.",
};

const MentalHealthTracker = ({ entries, setEntries }) => (
  <HabitTracker entries={entries} setEntries={setEntries} {...mentalConfig} />
);

export default MentalHealthTracker;
