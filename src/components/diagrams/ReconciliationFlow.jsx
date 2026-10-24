import React from 'react';
import DiagramFrame from './DiagramFrame.jsx';
import { ArrowDefs, Connector, Node, TEXT } from './primitives.jsx';

export default function ReconciliationFlow() {
  return (
    <DiagramFrame
      title="Reconciliation flow"
      desc="Ledger rows and bank statements feed a matching engine directly, while invoices go through Docling extraction first. The engine produces matched entries, an exception queue, and an audit log."
      caption="Two inputs match directly. Invoices take the AI path, which is the branch that removed the manual re-keying."
      viewBox="0 0 620 300"
    >
      <ArrowDefs prefix="rec" />

      <Node x={0} y={24} w={132} h={44} label="Ledger rows" sub="Table export" />
      <Node x={0} y={96} w={132} h={44} label="Bank statements" sub="Statement feed" />
      <Node x={0} y={168} w={132} h={44} label="Invoices" sub="PDF, unstructured" />

      <Node x={164} y={168} w={112} h={44} label="Docling" sub="Table extraction" accent />

      <Node x={316} y={90} w={124} h={100} label="Matching engine" sub="Multi-table rules" />

      <Node x={476} y={76} w={136} h={44} label="Matched entries" />
      <Node x={476} y={148} w={136} h={44} label="Exception queue" />
      <Node x={476} y={220} w={136} h={40} label="Audit log" />

      <Connector prefix="rec" d="M132 46 H240 V110 H316" />
      <Connector prefix="rec" d="M132 118 H240 V140 H316" />
      <Connector prefix="rec" d="M132 190 H164" accent />
      <Connector prefix="rec" d="M276 190 H300 V168 H316" accent />

      <Connector prefix="rec" d="M440 140 H458 V98 H476" />
      <Connector prefix="rec" d="M440 140 H458 V170 H476" />
      <Connector prefix="rec" d="M440 140 H458 V240 H476" />

      <text x={170} y={160} style={TEXT.sub} fill="var(--accent-ink)">
        structure kept
      </text>
    </DiagramFrame>
  );
}
