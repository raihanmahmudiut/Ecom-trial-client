// CustomMenu.js (or CustomMenu.tsx for TypeScript)
import React from "react";
import { Menu } from "antd";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const CustomMenu = styled(Menu)`
	&& .ant-menu-item {
		border-bottom: 2px solid gray; /* Customize the background color for the selected item */
	}
`;

export default CustomMenu;
