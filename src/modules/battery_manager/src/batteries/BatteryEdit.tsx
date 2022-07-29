import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Group, Modal, NumberInput, Select, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import useTranslation from "../../../../hooks/useTranslation";
import BatteryManagerModule from "../../BatteryManagerModule";
import { BatteryInterface, EBatteryModel } from "../BatteryTypes";

const BatteryEdit = ({ battery, onBatteryEdit }: { battery: BatteryInterface; onBatteryEdit: (needsSaving: boolean, battery: BatteryInterface) => void }) => {
    const [hasChanged, setHasChanged] = useState(false);
    const { t } = useTranslation({ prefix: BatteryManagerModule.module_translation_prefix + "batteries.edit_battery_modal" });

    const form = useForm({
        initialValues: {
            batteryId: battery.batteryId,
            batteryType: battery.batteryType,
            initialVoltage: battery.initialVoltage,
            dischargeRate: battery.dischargeRate,
            inUse: battery.inUse,
            capacitymAh: battery.capacitymAh,
            from: battery.from,
        },
    });

    return (
        <Modal opened={true} title={t("title") + " " + form.getInputProps("batteryId").value} onClose={() => onBatteryEdit(false, battery)}>
            <NumberInput
                mt={"sm"}
                variant="filled"
                label={t("battery_initial_voltage")}
                value={form.getInputProps("initialVoltage").value}
                precision={1}
                onChange={(e) => {
                    console.log(e);
                    form.setFieldValue("initialVoltage", e || 0);
                    setHasChanged(true);
                }}
                parser={(value) => value && value.replace(/[^\d.]/g, "")}
                formatter={(value) => (value && !Number.isNaN(parseFloat(value)) ? `${value}v` : "")}
                hideControls
            />

            <NumberInput
                mt={"sm"}
                variant="filled"
                label={t("battery_discharge_rate")}
                precision={1}
                value={form.getInputProps("dischargeRate").value}
                onChange={(e) => {
                    form.setFieldValue("dischargeRate", e || 0);
                    setHasChanged(true);
                }}
                parser={(value) => value && value.replace(/[^\d.]/g, "")}
                formatter={(value) => (value && !Number.isNaN(parseFloat(value)) ? `${value}C` : "")}
                hideControls
            />

            <NumberInput
                mt={"sm"}
                variant="filled"
                value={form.getInputProps("capacitymAh").value}
                onChange={(e) => {
                    form.setFieldValue("capacitymAh", e || 0);
                    setHasChanged(true);
                }}
                parser={(value) => value && value.replace(/\D/g, "")}
                formatter={(value) => (value && !Number.isNaN(parseFloat(value)) ? `${value}mAh` : "")}
                label={t("battery_capacity")}
                hideControls
            />

            <TextInput
                mt={"sm"}
                variant="filled"
                value={form.getInputProps("from").value}
                label={t("battery_from")}
                onChange={(e) => {
                    form.setFieldValue("from", e.currentTarget.value);
                    setHasChanged(true);
                }}
            ></TextInput>

            <Select
                mt={"sm"}
                variant="filled"
                onChange={(e) => {
                    form.setFieldValue("batteryType", e || "LITHIUM_ION_18650");
                    setHasChanged(true);
                }}
                onDropdownClose={() => console.log("close")}
                label={t("select_type_placeholder")}
                searchable
                nothingFound={t("select_type_nothing_found")}
                value={form.getInputProps("batteryType").value}
                data={Object.keys(EBatteryModel)
                    .map((key) => ({ value: key, label: (EBatteryModel as any)[key] }))
                    .sort((a, b) => a.value.localeCompare(b.value))}
                mb={"lg"}
            />
            <Switch
                mt={"sm"}
                label={t("battery_in_use")}
                onLabel={t("switch_on")}
                offLabel={t("switch_off")}
                value={form.getInputProps("inUse").value}
                onChange={(e) => {
                    form.setFieldValue("inUse", e.currentTarget.checked);
                    setHasChanged(true);
                }}
                defaultChecked={battery.inUse}
                size="lg"
            />
            <Group position="right" mt={"lg"}>
                <ActionIcon variant="filled" color={"green"} onClick={() => onBatteryEdit(hasChanged, form.values)}>
                    <FontAwesomeIcon icon={faSave} />
                </ActionIcon>
                <ActionIcon variant="filled" color={"red"} onClick={() => onBatteryEdit(false, form.values)}>
                    <FontAwesomeIcon icon={faTimes} />
                </ActionIcon>
            </Group>
        </Modal>
    );
};

export default BatteryEdit;
