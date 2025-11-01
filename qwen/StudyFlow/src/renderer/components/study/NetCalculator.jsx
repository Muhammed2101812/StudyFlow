import React from 'react';
import { calculateNet } from '../../utils/calculations.js';

const NetCalculator = ({ correct, wrong, penaltyEnabled = true, className = '' }) => {
  const net = calculateNet(correct || 0, wrong || 0, penaltyEnabled);

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${penaltyEnabled ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'} ${className}`}>
      <span className="font-bold">Net: {net.toFixed(2)}</span>
      {penaltyEnabled && (
        <span className="ml-1 text-xs" title="Yanlış cevaplar doğruları etkiliyor">(*)</span>
      )}
    </div>
  );
};

export default NetCalculator;
