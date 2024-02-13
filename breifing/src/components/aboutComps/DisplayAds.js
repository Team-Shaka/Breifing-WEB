import React, { useEffect } from "react";

const DisplayAds = () => {
    useEffect(() => {
        const pushAd = () => {
            try {
                const adsbygoogle = window.adsbygoogle;
                console.log({ adsbygoogle });
                adsbygoogle.push({});
            } catch (e) {
                console.error(e);
            }
        };

        let interval = setInterval(() => {
            if (window.adsbygoogle) {
                pushAd();
                clearInterval(interval);
            }
        }, 300);

        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-6262787102529442"
            data-ad-slot="2400520752"
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
    );
};

export default DisplayAds;
