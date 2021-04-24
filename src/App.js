import Navbar from './screens/Navbar';
import './App.scss';
import TabSection from './screens/TabSection';

function App() {
  return (
    <div className="App">
      <Navbar />
      <TabSection/>
      {/* <div className="sidebar__syncandsche">
        <Sidebar />
        <SyncCabinet />
      </div> */}

      {/* <div className="SyncCabinet">
        <SyncCabinet />
      </div> */}
    </div>
  );
}

export default App;
