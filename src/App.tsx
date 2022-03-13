import logo from "./assets/logo.svg";
import Stories from "./components/Stories/Stories";

function App() {
  const year = new Date().getFullYear();

  return (
    <div id="app">
      <header>
        <div className="content-wrapped">
          <div className="header__inner">
            <img width={36} src={logo} alt="Hacker News logo" />
            <h1>Hacker News</h1>
          </div>
        </div>
      </header>
      <main>
        <div className="content-wrapped">
          <Stories />
        </div>
      </main>
      <footer>
        <div className="content-wrapped align-center">
          <p>Copyright {year} - Hacker News - All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
