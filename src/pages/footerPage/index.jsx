import { useLocation } from "react-router-dom";
import Terms from "@/components/footer/terms";
import WrongPage from "../wrong/WrongPage";
import Policy from "@/components/footer/policy";
import Guide from "@/components/footer/guide";
import About from "@/components/footer/about";
import Disclaimer from "@/components/footer/disclaimer";
import FAQ from "@/components/footer/faq";

const FooterPage = () => {
    const location = useLocation().pathname;

    const getBoardComponent = () => {
        switch(location) {
            case "/terms": return <Terms />;
            case "/policy": return <Policy />;
            case "/guide": return <Guide />;
            case "/disclaimer": return <Disclaimer />;
            case "/about": return <About />;
            case "/faq": return <FAQ />;
            default : return <WrongPage />;
        }
    };

    return (
        <>
            {getBoardComponent()}
        </>
    );
}

export default FooterPage;