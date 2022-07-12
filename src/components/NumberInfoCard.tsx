import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, LoadingOverlay, Text, Group, ThemeIcon, Title, Center, Space } from "@mantine/core";
import { useEffect, useState } from "react";

const InfoCard = ({ icon, header, content }: { icon: IconDefinition; header: string; content: string | number | undefined | null }) => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (content === undefined || content === null) {
            setLoading(true);
            return;
        }
        setLoading(false);
    }, [content]);

    return (
        <Card>
            <Group>
                <ThemeIcon>
                    <FontAwesomeIcon icon={icon} />
                </ThemeIcon>
                <Text weight={500}>{header}</Text>
            </Group>
            <Center style={{ position: "relative" }}>
                <LoadingOverlay visible={loading} color="dark" transitionDuration={1000} />
                {(content !== null && content !== undefined && <Title>{content}</Title>) || <Space h={45} />}
            </Center>
        </Card>
    );
};

export default InfoCard;
