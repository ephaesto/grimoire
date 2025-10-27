import { useHistory, useLocation } from "@docusaurus/router";
import { i18n } from "@site/docusaurusConfig";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

type LocaleContextType = {
	locale: string;
	setLocale: (newLocale: string) => void;
};

const LocaleContext = createContext<LocaleContextType>({
	locale: "",
	setLocale: () => {},
});

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { locales, defaultLocale } = i18n;
	const { pathname } = useLocation();
	const history = useHistory();
	const [locale, setLocale] = useState(defaultLocale);

	const setMyLocale = (newLocale: string) => {
		if (newLocale === locale) return;
		const pathArray = pathname.split("/").filter((v) => Boolean(v));
		const newPath = `/${pathArray
			.map((value) => {
				if (value === locale) {
					return newLocale;
				}
				return value;
			})
			.join("/")}`;

		setLocale(newLocale);
		history.push(newPath);
	};

	useEffect(() => {
		const pathArray = pathname.split("/").filter((v) => Boolean(v));
		const candidate = pathArray.filter((value) => locales.includes(value));
		const current = candidate.length === 1 ? candidate[0] : defaultLocale;
		if (current !== locale) {
			setLocale(current);
		}
	}, [pathname]);

	return (
		<LocaleContext.Provider value={{ locale, setLocale: setMyLocale }}>
			{children}
		</LocaleContext.Provider>
	);
};

export const useLocale = () => useContext(LocaleContext);
