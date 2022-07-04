import { faArrowLeft, faCheck, faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createStyles, Paper, Title, Text, TextInput, Button, Container, Group, Anchor, Center, Box, Grid, PasswordInput, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useConfiguration from "../../hooks/useConfiguration";
import { useUser } from "../../context/UserProvider";
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

const RegisterPage = () => {
    const { classes } = useStyles();
    const { t } = useTranslation({ prefix: "pages.authentication.register" });
    const [loading, setLoading] = useState<boolean>(false);
    const configuration = useConfiguration();
    const { loginUser } = useUser();

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
        },
        errorMessages: {
            confirmPassword: t("password_mismatch"),
            email: t("invalid_email"),
            firstName: t("first_name_required"),
            lastName: t("last_name_required"),
        },
        validationRules: {
            email: (value) => /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(value),
            confirmPassword: (value, values) => (values && value !== values.password ? false : true),
            firstName: (value) => value.length > 2,
            lastName: (value) => value.length > 2,
        },
    });

    const handleSubmit = useCallback(
        async (values: any) => {
            const { email, password, firstName, lastName } = values;
            setLoading(true);
            try {
                const response = await fetch(configuration.api.base_url + configuration.api.authentication.base_url + configuration.api.authentication.register, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        firstName,
                        lastName,
                    }),
                });
                if (response.status !== 200) {
                    showNotification({
                        icon: <FontAwesomeIcon icon={faExclamation} />,
                        id: "submit-error",
                        title: t("submit_error"),
                        message: t("submit_error_message_user_already_exists"),
                        color: "red",
                    });
                    setLoading(false);
                    return;
                }
                const json: any = await response.json();
                loginUser({
                    email: json.email,
                    role: json.role,
                    permissions: json.permissions,
                    jwt_token: json.jwt,
                    jwt_expiration_date: json.jwt_expiration_date,
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
                setLoading(false);
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
        [configuration.api.authentication.base_url, configuration.api.authentication.register, configuration.api.base_url, loginUser, t]
    );

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
                    <LoadingOverlay visible={loading} transitionDuration={500} />

                    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                        <Grid>
                            <Grid.Col sm={12}>
                                <TextInput label={t("email")} placeholder={t("email_placeholder")} required {...form.getInputProps("email")} />
                            </Grid.Col>
                            <Grid.Col md={6} sm={12}>
                                <PasswordInput label={t("password")} placeholder={t("password_placeholder")} required {...form.getInputProps("password")} />
                            </Grid.Col>
                            <Grid.Col md={6} sm={12}>
                                <PasswordInput label={t("confirm_password")} placeholder={t("confirm_password_placeholder")} required {...form.getInputProps("confirmPassword")} />
                            </Grid.Col>
                            <Grid.Col md={6} sm={12}>
                                <TextInput label={t("first_name")} placeholder={t("first_name_placeholder")} required {...form.getInputProps("firstName")} />
                            </Grid.Col>
                            <Grid.Col md={6} sm={12}>
                                <TextInput label={t("last_name")} placeholder={t("last_name_placeholder")} required {...form.getInputProps("lastName")} />
                            </Grid.Col>
                        </Grid>

                        <Group position="apart" mt="lg" className={classes.controls}>
                            <Anchor component={Link} to="/login" color="dimmed" size="sm" className={classes.control}>
                                <Center inline>
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                    <Box ml={5}>{t("back_to_login_page")}</Box>
                                </Center>
                            </Anchor>
                            <Button className={classes.control} type="submit">
                                {t("register_btn")}
                            </Button>
                        </Group>
                    </form>
                </Paper>
            </Container>
        </div>
    );
};

export default RegisterPage;
