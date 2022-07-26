import { Grid } from "@mantine/core";
import { BatteryInterface } from "../BatteryTypes";

const BatteryFromDatabase = ({ battery }: { battery: BatteryInterface[] }) => {
    return (
        <Grid.Col>
            <h1>BatteryFromDatabase</h1>
        </Grid.Col>
    );
};

export default BatteryFromDatabase;
