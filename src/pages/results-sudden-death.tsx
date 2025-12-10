import React from "react";
import { useSearchParams } from "react-router-dom";

import ResultButtons from "../components/result/ResultButtons";
import ResultScore from "../components/result/ResultScore";
import ResultTitle from "../components/result/ResultTitle";
import ResultText from "../components/result/ResultText";
import ResultRecord from "../components/result/ResultRecord";
import ResultMessageSuddenDeath from "../components/result/ResultMessageSuddenDeath";
import Background from "../components/Background";

const ResultsSuddenDeath: React.FC = () => {
  const [params] = useSearchParams();
  const score = Number(params.get("score")) || 0;

  return (
    <div className="w-full h-[100dvh] relative bg-black overflow-hidden">

      <Background />

      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden">
        <div className="min-h-full flex flex-col items-center justify-center py-10 px-4 text-center">

          <ResultTitle text="MORT SUBITE" />

          <ResultText />

          <ResultRecord score={score} storageKey="bestSuddenDeath">
            {({ record, isNewRecord }) => (
              <div className="w-full flex flex-col items-center my-4">
                
                <ResultScore score={score} record={record} />
                
                <ResultMessageSuddenDeath
                  score={score}
                  isNewRecord={isNewRecord}
                />
              </div>
            )}
          </ResultRecord>

          <div className="mt-6 pb-8">
            <ResultButtons replayPath="/sudden-death" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResultsSuddenDeath;
