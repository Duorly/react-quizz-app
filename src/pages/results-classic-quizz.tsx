import React from "react";
import { useSearchParams } from "react-router-dom";

import ResultButtons from "../components/result/ResultButtons";
import ResultTitle from "../components/result/ResultTitle";
import ResultText from "../components/result/ResultText";
import ResultScoreClassic from "../components/result/ResultScoreClassic";
import ResultMessage from "../components/result/ResultMessage";

import Background from "../components/Background";

const ClassicQuizzResults: React.FC = () => {
    const [params] = useSearchParams();

    const score = Number(params.get("score")) || 0;
    const total = Number(params.get("total")) || 20;

    const getMessage = () => {
        const ratio = score / total;

        if (ratio === 1) return "Parfait, incroyable !";
        if (ratio >= 0.8) return "Presque parfait, essayez encore !";
        if (ratio >= 0.5) return "Pas mal, continuez !";
        return "Essayez encore, vous pouvez le faire !";
    };

    return (
        <div className="w-full h-[100dvh] relative bg-black overflow-hidden">
            <Background />
            <div className="absolute inset-0 bg-black/20" />

         
            <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden">

                
                <div className="min-h-full flex flex-col items-center justify-center py-10 px-4 text-center">

                    <ResultTitle text="Résultats" />

                    <ResultText  />

                    <ResultScoreClassic score={score} total={total} />

                    <ResultMessage message={getMessage()} />

                    <div className="pb-8">
                        <ResultButtons replayPath="/theme-selection" />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ClassicQuizzResults;