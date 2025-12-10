import { useEffect, useState } from "react";

interface Props {
  score: number;
  storageKey: string;
  children: (data: { record: number; isNewRecord: boolean }) => React.ReactNode;
}

const ResultRecord: React.FC<Props> = ({ score, storageKey, children }) => {
  const [record, setRecord] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(false);

  useEffect(() => {
    const best = Number(localStorage.getItem(storageKey) || "0");

    if (score > best) {
      localStorage.setItem(storageKey, String(score));
      setRecord(score);
      setIsNewRecord(true);
    } else {
      setRecord(best);
      setIsNewRecord(false);
    }
  }, [score, storageKey]);

  return <>{children({ record, isNewRecord })}</>;
};

export default ResultRecord;
