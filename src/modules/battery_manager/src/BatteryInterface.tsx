export default interface BatteryInterface {
    batteryId: number;
    initialVoltage: number;
    dischargeRate: number;
    capacitymAh: number;
    from: string;
    batteryType: string;
    inUse: boolean;
}
