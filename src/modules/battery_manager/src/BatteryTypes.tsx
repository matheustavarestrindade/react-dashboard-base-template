enum EBatteryModel {
    // Zinc Air

    ZINC_AIR_5 = "Zinc air 5",
    ZINC_AIR_10 = "Zinc air 10",
    ZINC_AIR_13 = "Zinc air 13",
    ZINC_AIR_312 = "Zinc air 312",
    ZINC_AIR_630 = "Zinc air 630",
    ZINC_AIR_675 = "Zinc air 675",

    // Lithium Cell

    LITHIUM_CELL_CR1025 = "Lithium cell CR1025",
    LITHIUM_CELL_CR927 = "Lithium cell CR927",
    LITHIUM_CELL_CR1130 = "Lithium cell CR1130",
    LITHIUM_CELL_CR1216 = "Lithium cell CR1216",
    LITHIUM_CELL_CR1220 = "Lithium cell CR1220",
    LITHIUM_CELL_CR1225 = "Lithium cell CR1225",
    LITHIUM_CELL_CR1616 = "Lithium cell CR1616",
    LITHIUM_CELL_CR1620 = "Lithium cell CR1620",
    LITHIUM_CELL_CR1632 = "Lithium cell CR1632",
    LITHIUM_CELL_CR2012 = "Lithium cell CR2012",
    LITHIUM_CELL_CR2016 = "Lithium cell CR2016",
    LITHIUM_CELL_CR2020 = "Lithium cell CR2020",
    LITHIUM_CELL_CR2025 = "Lithium cell CR2025",
    LITHIUM_CELL_CR2032 = "Lithium cell CR2032",
    LITHIUM_CELL_CR2040 = "Lithium cell CR2040",
    LITHIUM_CELL_CR2050 = "Lithium cell CR2050",
    LITHIUM_CELL_CR2320 = "Lithium cell CR2320",
    LITHIUM_CELL_CR2325 = "Lithium cell CR2325",
    LITHIUM_CELL_CR2330 = "Lithium cell CR2330",
    LITHIUM_CELL_BR2335 = "Lithium cell BR2335",
    LITHIUM_CELL_CR2354 = "Lithium cell CR2354",
    LITHIUM_CELL_CR2412 = "Lithium cell CR2412",
    LITHIUM_CELL_CR2430 = "Lithium cell CR2430",
    LITHIUM_CELL_CR2450 = "Lithium cell CR2450",
    LITHIUM_CELL_CR2477 = "Lithium cell CR2477",
    LITHIUM_CELL_CR3032 = "Lithium cell CR3032",
    LITHIUM_CELL_CR11108 = "Lithium cell CR11108",

    // Lithium Ion

    LITHIUM_ION_07540 = "Lithium Ion 07540",
    LITHIUM_ION_08570 = "Lithium Ion 08570",
    LITHIUM_ION_10180 = "Lithium Ion 10180",
    LITHIUM_ION_10280 = "Lithium Ion 10280",
    LITHIUM_ION_10440 = "Lithium Ion 10440",
    LITHIUM_ION_14250 = "Lithium Ion 14250",
    LITHIUM_ION_14300 = "Lithium Ion 14300",
    LITHIUM_ION_14430 = "Lithium Ion 14430",
    LITHIUM_ION_14500 = "Lithium Ion 14500",
    LITHIUM_ION_14650 = "Lithium Ion 14650",
    LITHIUM_ION_15270 = "Lithium Ion 15270",
    LITHIUM_ION_16340 = "Lithium Ion 16340",
    LITHIUM_ION_16650 = "Lithium Ion 16650",
    LITHIUM_ION_17500 = "Lithium Ion 17500",
    LITHIUM_ION_17650 = "Lithium Ion 17650",
    LITHIUM_ION_17670 = "Lithium Ion 17670",
    LITHIUM_ION_18350 = "Lithium Ion 18350",
    LITHIUM_ION_18490 = "Lithium Ion 18490",
    LITHIUM_ION_18500 = "Lithium Ion 18500",
    LITHIUM_ION_18650 = "Lithium Ion 18650",
    LITHIUM_ION_20700 = "Lithium Ion 20700",
    LITHIUM_ION_21700 = "Lithium Ion 21700",
    LITHIUM_ION_25500 = "Lithium Ion 25500",
    LITHIUM_ION_26500 = "Lithium Ion 26500",
    LITHIUM_ION_26650 = "Lithium Ion 26650",
    LITHIUM_ION_26800 = "Lithium Ion 26800",
    LITHIUM_ION_32600 = "Lithium Ion 32600",
    LITHIUM_ION_32650 = "Lithium Ion 32650",
    LITHIUM_ION_38120 = "Lithium Ion 38120",
    LITHIUM_ION_38140 = "Lithium Ion 38140",
    LITHIUM_ION_40152 = "Lithium Ion 40152",
    LITHIUM_ION_4680 = "Lithium Ion 4680",
}

interface BatteryInterface {
    batteryId: number;
    initialVoltage: number;
    dischargeRate: number;
    capacitymAh: number;
    from: string;
    batteryType: string;
    inUse: boolean;
}

type BatteryOrganizedByTypes = {
    [key in EBatteryModel]?: BatteryInterface[];
};

export { EBatteryModel };
export type { BatteryOrganizedByTypes, BatteryInterface };
