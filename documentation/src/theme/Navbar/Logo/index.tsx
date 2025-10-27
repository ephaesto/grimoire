import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { ReactNode } from "react";

export default function NavbarLogo(): ReactNode {
	const { siteConfig } = useDocusaurusContext();

	const { logo, title } = siteConfig.themeConfig?.navbar as any;

	return (
		<Link href="#" className="navbar__brand" aria-label="Home">
			<img className="navbar__logo" src={useBaseUrl(logo.src)} alt={logo.alt} />
			<strong>{title}</strong>
		</Link>
	);
}
