
import { useWeb3React } from "@web3-react/core";
import { t } from "i18next";
import { receive } from "../API";
import { addMessage, showLoding } from "../utils/tool";
import { Contracts } from "../web3";
export const useGetReward = () => {
    const { account } = useWeb3React();
    function getReward(incomeType: any, callbackFun: any) {
        if (!account) return addMessage(t("Please link wallet"))
        if (!incomeType) return addMessage(t("failed"))
        receive({
            "incomeType": incomeType
        }).then((res: any) => {
            showLoding(true)
            if (res?.code === 200) {
                Contracts.example.withdrawReward(account as string, res?.data).then((res: string) => {
                    showLoding(false)
                    addMessage(t("Received successfully"))
                    setTimeout(() =>
                        callbackFun()
                        , 5000)
                }).catch((res: any) => {
                    // if (res.code === 4001) {
                    addMessage(t("failed"))
                    showLoding(false)
                    // }
                })
            } else {
                showLoding(false)
                addMessage(res.msg)
            }
        })
    }
    return { getReward }
}