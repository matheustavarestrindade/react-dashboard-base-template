import useTranslation from "../../hooks/useTranslation";
import { Paper, createStyles, TextInput, PasswordInput, Checkbox, Button, Title, Text, Anchor } from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: 900,
        backgroundSize: "cover",
        backgroundImage: "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
    },

    form: {
        borderRight: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]}`,
        minHeight: 900,
        maxWidth: 450,
        paddingTop: 80,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            maxWidth: "100%",
        },
    },

    title: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    logo: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        width: 120,
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
    },
}));

const LoginPage = () => {
    const { classes } = useStyles();
    const { t } = useTranslation({ prefix: "pages.authentication.login" });

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
                    {t("title")}
                </Title>

                <TextInput label={t("email")} placeholder={t("email_placeholder")} size="md" />
                <PasswordInput label={t("password")} placeholder={t("password_placeholder")} mt="md" size="md" />
                <Checkbox label={t("keep_me_logged_in")} mt="xl" size="md" />
                <Button fullWidth mt="xl" size="md">
                    {t("login_btn")}
                </Button>

                <Text align="center" mt="md">
                    {t("dont_have_account")}
                    <Anchor component={Link} to="/register" weight={700}>
                        {t("sign_up")}
                    </Anchor>
                </Text>
            </Paper>
        </div>
    );
};

export default LoginPage;
