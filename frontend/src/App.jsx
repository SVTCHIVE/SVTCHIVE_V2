import { Route, Routes } from "react-router-dom";

import "./App.css";

import { DarkModeContext, DarkModeProvider } from "@context/DarkModeContext";
import Home from "@pages/Home";
import FanChantList from "@pages/FanChantList";
import FanChantDetail from "@pages/FanChantDetail";
import { HeaderProvider } from "@context/HeaderContext";
import { useContext } from "react";

function App() {
	return (
		<DarkModeProvider>
			<HeaderProvider>
				<Background />
				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route path="/fanchant">
						<Route
							path=""
							element={<FanChantList />}
						/>
						<Route
							path="detail"
							element={<FanChantDetail />}
						/>
					</Route>
					<Route
						path="error"
						element=""
					></Route>
				</Routes>
			</HeaderProvider>
		</DarkModeProvider>
	);
}

function Background() {
	const { darkMode } = useContext(DarkModeContext);

	return <div className={`fixed top-0 w-full h-full -z-50 ${darkMode ? "bg-dark-bg" : "bg-light-bg"}`}></div>;
}

export default App;
