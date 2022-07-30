import { useEffect } from "react";
import MinerSystemModule from "../MinerSystemModule";
const MinerSystemRedirect = () => {
    useEffect(() => {
        if (MinerSystemModule.module_external_url) window.location.href = MinerSystemModule.module_external_url;
    }, []);
    return <></>;
};

export default MinerSystemRedirect;
