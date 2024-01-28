import { ApplicationConfigProvider } from "./context/ApplicationConfigContext";
import LayoutChild from "./layoutChild";
import Constants from "./model/Constants";
import "./globals.css";

export const metadata = {
    title: Constants.APP_NAME
};

const RootLayout = ({
    children,
}: { children: React.ReactNode }) => {
    return (
        <ApplicationConfigProvider>
            <LayoutChild>{children}</LayoutChild>
        </ApplicationConfigProvider>
    );
};

export default RootLayout;
