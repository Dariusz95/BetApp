import React, { useEffect, useRef, useState } from 'react';
import MatchHubConnection from './components/MatchHubConnection';
import { MatchResultProps } from './interfaces/MatchResultProps';
import MatchResult from './components/MatchResult';
import { IMatchResult } from '../bet-page/interfaces/Match';

const MatchResultPage: React.FC<MatchResultProps> = ({ matches }) => {
  const [data, setData] = useState<IMatchResult[]>([]);

  const handleCounterUpdated = (updatedData: IMatchResult) => {
    setData((prevData) => {
        const existingMatchIndex = prevData.findIndex(
          (match) => match.id === updatedData.id
        );
    
        if (existingMatchIndex !== -1) {
          prevData[existingMatchIndex] = updatedData;
          return [...prevData];
        } else {
          return [...prevData, updatedData];
        }
      });
  };

  return (
    <div className="match-result">
        <MatchHubConnection
          matches={matches}
          onCounterUpdated={handleCounterUpdated}
        />
      {data && <MatchResult data={data} />}
    </div>
  );
};

export default MatchResultPage;