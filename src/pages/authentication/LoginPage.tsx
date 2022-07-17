import useTranslation from "../../hooks/useTranslation";
import { Paper, createStyles, TextInput, PasswordInput, Checkbox, Button, Title, Text, Anchor, Group, LoadingOverlay } from "@mantine/core";
import { Link } from "react-router-dom";
import { useForm } from "@mantine/hooks";
import { useCallback, useState } from "react";
import configuration from "../../ProjectConfiguration";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faExclamation } from "@fortawesome/free-solid-svg-icons";
import { showNotification } from "@mantine/notifications";
import { useUser } from "../../context/UserProvider";

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: "100vh",
        maxHeight: "100vh",
        backgroundSize: "cover",
        backgroundImage: "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
    },

    form: {
        borderRight: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]}`,
        minHeight: "100vh",
        maxHeight: "100vh",
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
    const [loading, setLoading] = useState<boolean>(false);
    const { loginUser } = useUser();
    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },
        errorMessages: {
            email: t("invalid_email"),
        },
        validationRules: {
            email: (value) => /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(value),
        },
    });

    const handleSubmit = useCallback(
        async (values: { email: string; password: string }) => {
            const { email, password } = values;
            setLoading(true);
            try {
                const response = await fetch(configuration.api.base_url + configuration.api.authentication.base_url + configuration.api.authentication.login, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                });
                if (response.status !== 200) {
                    showNotification({
                        icon: <FontAwesomeIcon icon={faExclamation} />,
                        id: "submit-error",
                        title: t("submit_error"),
                        message: t("submit_error_message_invalid_credentials"),
                        color: "red",
                    });
                    setLoading(false);
                    return;
                }
                const json: any = await response.json();
                console.log(json);
                loginUser({
                    email: json.email,
                    role: json.role,
                    permissions: json.permissions,
                    jwt_token: json.jwt,
                    jwt_expiration_date: new Date(json.jwt_expiration_date),
                    first_name: json.first_name,
                    last_name: json.last_name,
                });
                showNotification({
                    id: "registration-success",
                    color: "green",
                    icon: <FontAwesomeIcon icon={faCheck} />,
                    message: t("submit_success_message"),
                    title: t("submit_success"),
                });
            } catch (err) {
                showNotification({
                    icon: <FontAwesomeIcon icon={faExclamation} />,
                    id: "submit-error",
                    title: t("submit_error"),
                    message: t("submit_error_message"),
                    color: "red",
                });
            }
            setLoading(false);
        },
        [loginUser, t]
    );

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <LoadingOverlay visible={loading} transitionDuration={500} />
                <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
                    {t("title")}
                </Title>
                <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                    <TextInput label={t("email")} placeholder={t("email_placeholder")} size="md" {...form.getInputProps("email")} />
                    <PasswordInput label={t("password")} placeholder={t("password_placeholder")} mt="md" size="md" {...form.getInputProps("password")} />
                    <Group position="apart" mt="md">
                        <Checkbox label={t("keep_me_logged_in")} size="sm" />
                        <Anchor component={Link} to="/reset-password" size="sm">
                            {t("forgot_password")}
                        </Anchor>
                    </Group>
                    <Button fullWidth mt="xl" size="md" type="submit">
                        {t("login_btn")}
                    </Button>
                    <Text align="center" mt="md">
                        {t("dont_have_account")}
                        <Anchor component={Link} to="/register" weight={700}>
                            {t("sign_up")}
                        </Anchor>
                    </Text>
                </form>
            </Paper>
        </div>
    );
};

export default LoginPage;
