import { useColorMode } from "@docusaurus/theme-common";
import type { Props } from "@theme/Navbar/Search";
import clsx from "clsx";
import type { ReactNode } from "react";

import styles from "./styles.module.css";

export default function NavbarSearch({
	children,
	className,
}: Props): ReactNode {
	const { colorMode } = useColorMode();
	return (
		<div
			id="orama-ui-theme"
			className={clsx(
				className,
				styles.navbarSearchContainer,
				colorMode === "dark" ? "dark" : "light",
			)}
		>
			{children}
		</div>
	);
}
