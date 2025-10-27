import type { WrapperProps } from "@docusaurus/types";
import { LocaleProvider } from "@site/src/contexts/LocaleContext";
import { VersionProvider } from "@site/src/contexts/VersionContext";
import type LayoutType from "@theme/Layout";
import Layout from "@theme-original/Layout";
import type { ReactNode } from "react";

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): ReactNode {
	return (
		<VersionProvider>
			<LocaleProvider>
				<Layout {...props} wrapperClassName="homePage" />
			</LocaleProvider>
		</VersionProvider>
	);
}
