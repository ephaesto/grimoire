import {
	ErrorCauseBoundary,
	ThemeClassNames,
	useThemeConfig,
} from "@docusaurus/theme-common";
import {
	splitNavbarItems,
	useNavbarMobileSidebar,
} from "@docusaurus/theme-common/internal";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useLocale } from "@site/src/contexts/LocaleContext";
import { useVersion } from "@site/src/contexts/VersionContext";
import NavbarColorModeToggle from "@theme/Navbar/ColorModeToggle";
import NavbarLogo from "@theme/Navbar/Logo";
import NavbarMobileSidebarToggle from "@theme/Navbar/MobileSidebar/Toggle";
import NavbarSearch from "@theme/Navbar/Search";
import NavbarItem, { type Props as NavbarItemConfig } from "@theme/NavbarItem";
import SearchBar from "@theme/SearchBar";
import clsx from "clsx";
import type { ReactNode } from "react";
import HomeNavbarItem from "../HomeNavbarItem";
import LocaleDropdown from "../LocaleDropdown";
import VersionDropdown from "../VersionDropdown";
import styles from "./styles.module.css";

function useNavbarItems() {
	// TODO temporary casting until ThemeConfig type is improved
	return useThemeConfig().navbar.items as NavbarItemConfig[];
}

function NavbarItems({ items }: { items: NavbarItemConfig[] }): ReactNode {
	const baseUrl = useBaseUrl(`/`);
	const { locale } = useLocale();
	const { version } = useVersion();
	return (
		<>
			{items.map((item) => (
				<ErrorCauseBoundary
					key={crypto.randomUUID()}
					onError={(error) =>
						new Error(
							`A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
							{ cause: error },
						)
					}
				>
					{((inItem) => {
						if ((inItem as any).to === "home")
							return (
								<HomeNavbarItem
									label={(item as any).label}
									position={(item as any).position}
								/>
							);
						if ((inItem as any).to === "versionDropdown")
							return <VersionDropdown />;
						if (inItem.type === "localeDropdown") return <LocaleDropdown />;
						if (inItem.type === "search") return;
						if ((inItem as any).to) {
							return (
								<NavbarItem
									{...item}
									href={`${baseUrl}${(item as any).to}/${version}/${locale}`}
								/>
							);
						}

						return <NavbarItem {...item} />;
					})(item)}
				</ErrorCauseBoundary>
			))}
		</>
	);
}

function SearchNavbarItems({
	items,
}: {
	items: NavbarItemConfig[];
}): ReactNode {
	return (
		<>
			{items.map((item) => (
				<ErrorCauseBoundary
					key={crypto.randomUUID()}
					onError={(error) =>
						new Error(
							`A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
							{ cause: error },
						)
					}
				>
					{((inItem) => {
						if (inItem.type === "search") return <NavbarItem {...item} />;
					})(item)}
				</ErrorCauseBoundary>
			))}
		</>
	);
}

function NavbarContentLayout({
	left,
	right,
}: {
	left: ReactNode;
	right: ReactNode;
}) {
	return (
		<div className="navbar__inner">
			<div
				className={clsx(
					ThemeClassNames.layout.navbar.containerLeft,
					"navbar__items",
				)}
			>
				{left}
			</div>
			<div
				className={clsx(
					ThemeClassNames.layout.navbar.containerRight,
					"navbar__items navbar__items--right",
				)}
			>
				{right}
			</div>
		</div>
	);
}

export default function NavbarContent(): ReactNode {
	const mobileSidebar = useNavbarMobileSidebar();

	const items = useNavbarItems();
	const [leftItems, rightItems] = splitNavbarItems(items);

	const searchBarItem = items.find((item) => item.type === "search");

	return (
		<NavbarContentLayout
			left={
				// TODO stop hardcoding items?
				<>
					{!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
					<NavbarLogo />
					<NavbarItems items={leftItems} />
				</>
			}
			right={
				// TODO stop hardcoding items?
				// Ask the user to add the respective navbar items => more flexible
				<>
					<NavbarItems items={rightItems} />
					<NavbarColorModeToggle className={styles.colorModeToggle} />
					<SearchNavbarItems items={rightItems} />
					{!searchBarItem && (
						<NavbarSearch>
							<SearchBar />
						</NavbarSearch>
					)}
				</>
			}
		/>
	);
}
