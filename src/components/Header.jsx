import NavBar from "./NavBar";

const Header = () => {
  return (
    <header className="text-center py-8 pb-4 bg-green-950 border-b-5 border-yellow-400">
      <h1 className="text-5xl tracking-wider m-0">🐝 Habit Hive</h1>
      <p className="text-white mt-2">
        Track your coding hours and build your hive!
      </p>
      <NavBar />
    </header>
  );
};

export default Header;
