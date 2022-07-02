import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createStyles, Paper, Title, Text, TextInput, Button, Container, Group, Anchor, Center, Box } from "@mantine/core";
import { Link } from "react-router-dom";
import useTranslation from "../../hooks/useTranslation";

const useStyles = createStyles((theme) => ({
    title: {
        fontSize: 26,
        fontWeight: 900,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    controls: {
        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column-reverse",
        },
    },

    control: {
        [theme.fn.smallerThan("xs")]: {
            width: "100%",
            textAlign: "center",
        },
    },
}));

const ForgotPassword = () => {
    const { classes } = useStyles();
    const { t } = useTranslation({ prefix: "pages.authentication.forgot_password" });

    return (
        <div style={{ backgroundColor: "#fefefe", width: "100vw", height: "100vh", display: "flex", alignItems: "center" }}>
            <Container size={460} my={30}>
                <Title className={classes.title} align="center">
                    {t("title")}
                </Title>
                <Text color="dimmed" size="sm" align="center">
                    {t("subtitle")}
                </Text>

                <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                    <TextInput label={t("mail")} placeholder={t("mail_placeholder")} required />
                    <Group position="apart" mt="lg" className={classes.controls}>
                        <Anchor component={Link} to="/login" color="dimmed" size="sm" className={classes.control}>
                            <Center inline>
                                <FontAwesomeIcon icon={faArrowLeft} />
                                <Box ml={5}>{t("back_to_login_page")}</Box>
                            </Center>
                        </Anchor>
                        <Button className={classes.control}>{t("reset_password")}</Button>
                    </Group>
                </Paper>
            </Container>
        </div>
    );
};

export default ForgotPassword;
