import React from "react";
import { render } from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";

import "./styles.css";

render(
	<React.StrictMode>
		<ChakraProvider></ChakraProvider>
	</React.StrictMode>,
	document.getElementById("app")
);
