import React from "react";

//include images into your bundle
import { ToDoList } from "./todolist";

//create your first component
const Home = () => {
	return (
		<div className="container">
			<ToDoList />
		</div>
	);
};

export default Home;
