import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import NumberInfoCard from "./NumberInfoCard";

export default {
    title: "Components/Number Info Card",
    component: NumberInfoCard,

    decorators: [
        (Story) => (
            <div style={{ display: "flex", alignItems: "center", backgroundColor: "#f1f1f1", padding: "3rem" }}>
                <Story />
            </div>
        ),
    ],
} as ComponentMeta<typeof NumberInfoCard>;

const Template: ComponentStory<typeof NumberInfoCard> = (args) => <NumberInfoCard {...args}></NumberInfoCard>;

export const LoadingCard = Template.bind({});

LoadingCard.storyName = "Loading Card";

LoadingCard.args = {
    header: "Loading Card",
    icon: faUser,
    content: null,
};

export const UserCard = Template.bind({});

UserCard.storyName = "User Display Card";

UserCard.args = {
    icon: faUser,
    header: "This is a user card",
    content: "1234",
};
