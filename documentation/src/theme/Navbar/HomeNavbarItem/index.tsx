import useBaseUrl from "@docusaurus/useBaseUrl";
import { useLocale } from "@site/src/contexts/LocaleContext";
import { useVersion } from "@site/src/contexts/VersionContext";
import NavbarItem from "@theme/NavbarItem";
import type { ReactNode } from "react";

interface HomeNavbarItemProps {
	label: string;
	position: "left" | "right";
	onClick?: () => void;
	mobile?: boolean;
}

export default function HomeNavbarItem({
	label,
	position,
	onClick,
	mobile = false,
}: HomeNavbarItemProps): ReactNode {
	const baseUrl = useBaseUrl(`/`);
	const { locale } = useLocale();
	const { version } = useVersion();
	const propsChild = {
		...(onClick ? { onClick } : {}),
	};

	return (
		<NavbarItem
			mobile={mobile}
			{...propsChild}
			label={label}
			position={position}
			href={`${baseUrl}${version}/${locale}`}
		/>
	);
}
