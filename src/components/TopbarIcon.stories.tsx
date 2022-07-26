import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withReactContext } from "storybook-react-context";
import { PageNavigationContext } from "../context/PageNavigationProvider";
import ThemeProvider from "../context/ThemeProvider";
import TopBarIcon from "./TopbarIcon";

export default {
    title: "Components/TopBar Icon",
    component: TopBarIcon,
    decorators: [
        withReactContext({
            Context: PageNavigationContext,
        }),
        (Story) => (
            <div style={{ display: "flex", alignItems: "center", backgroundColor: "#202020", padding: "3rem" }}>
                <ThemeProvider>
                    <Story />
                </ThemeProvider>
            </div>
        ),
    ],
} as ComponentMeta<typeof TopBarIcon>;

const Template: ComponentStory<typeof TopBarIcon> = (args) => <TopBarIcon {...args} />;

export const UserIcon = Template.bind({});

UserIcon.args = {
    icon: faUser,
};
