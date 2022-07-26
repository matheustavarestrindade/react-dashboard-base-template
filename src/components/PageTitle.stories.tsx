import { ComponentStory, ComponentMeta } from "@storybook/react";
import ThemeProvider from "../context/ThemeProvider";
import PageTitle from "./PageTitle";

const headerOptions = [
    <h1>This is a Header</h1>,
    <h2>This is a Sub Header</h2>,
    <h3>This is a Sub Sub Header</h3>,
    <h4>This is a Sub Sub Sub Header</h4>,
    <h5>This is a Sub Sub Sub Sub Header</h5>,
    <h6>This is a Sub Sub Sub Sub Sub Header</h6>,
    <p>This is a paragraph</p>,
];

export default {
    title: "Components/Page Title",
    component: PageTitle,
    decorators: [
        (Story) => (
            <div style={{ display: "flex", alignItems: "center", backgroundColor: "", padding: "3rem" }}>
                <ThemeProvider>
                    <Story />
                </ThemeProvider>
            </div>
        ),
    ],
    argTypes: {
        children: {
            options: Object.keys(headerOptions),
            mapping: headerOptions,
            control: { type: "select", labels: ["h1 Header", "h2 Header", "h3 Header", "h4 Header", "h5 Header", "h6 Header", "p tag"] },
        },
    },
} as ComponentMeta<typeof PageTitle>;

const Template: ComponentStory<typeof PageTitle> = (args) => <PageTitle {...args} />;

export const HeaderExample = Template.bind({});

HeaderExample.args = {
    children: <h1>This is a Header</h1>,
};
