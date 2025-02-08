import './App.css'
import ToolBar from "./Components/ToolBar/ToolBar.tsx";
import {Route, Routes} from "react-router-dom";
import QuoteList from "./Containers/QuoteList/QuoteList.tsx";
import NewQuote from "./Containers/NewQuote/NewQuote.tsx";

function App() {

  return (
    <>
      <header>
        <ToolBar />
      </header>
      <main>
          <Routes>
              <Route path='/' element={<QuoteList />} />
              <Route path="/quotes/:categoryId" element={<QuoteList />} />
              <Route path="/add-quote" element={<NewQuote />} />
          </Routes>
      </main>
    </>
  )
}

export default App
