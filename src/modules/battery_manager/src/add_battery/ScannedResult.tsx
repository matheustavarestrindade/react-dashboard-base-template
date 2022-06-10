import { faBattery, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Group, Space, ThemeIcon } from "@mantine/core";
import BatteryInterface from "../BatteryInterface";

const ScannedResult = ({ battery, updateBatteryInformation }: { battery: BatteryInterface; updateBatteryInformation: (battery: BatteryInterface) => void }) => {
    console.log(battery);
    return (
        <tr>
            <td>{battery.bat_id !== undefined ? battery.bat_id : "Not Defined"}</td>
            <td>{battery.initial_voltage !== undefined ? battery.initial_voltage + "v" : "Not Defined"}</td>
            <td>{battery.discharge_rate !== undefined ? battery.discharge_rate + " C" : "Not Defined"}</td>
            <td>{battery.capacity !== undefined ? battery.capacity + "mAh" : "Not Defined"}</td>
            <td>{battery.from !== undefined ? battery.from : "Not Defined"}</td>
            <td>
                <Button size="sm" variant="light">
                    <FontAwesomeIcon icon={faEdit} />
                </Button>
            </td>
        </tr>
    );
};

export default ScannedResult;
