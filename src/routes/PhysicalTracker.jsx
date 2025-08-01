import HabitTracker from "../components/HabitTracker";
import physicalImage from "../assets/codingImage.jpg"; // Use your own image

const physicalConfig = {
  title: "Your Physical Hive",
  imageSrc: physicalImage,
  entryLabel: "How many hours did you exercise?",
  placeholder: "e.g. 1.5",
  unit: "h",
  mosaicGridSize: 4,
  clearWarning:
    "Are you sure you want to clear all your physical activity data? This cannot be undone.",
};

const PhysicalTracker = ({ entries, setEntries }) => (
  <HabitTracker entries={entries} setEntries={setEntries} {...physicalConfig} />
);

export default PhysicalTracker;
