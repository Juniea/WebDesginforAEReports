import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import AnnotatedText from './AnnotatedText';
import axios from 'axios';

interface Annotation {
  start: number;
  end: number;
  type: string;
  label: string;
}

const ComparisonView: React.FC = () => {
  const [caseId] = useState('2-405-MENGJIE');  // 你可以从 props 传进来
  const [source, setSource] = useState('SME1');
  const [text, setText] = useState('');
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://10.14.16.56:5001/api/view/${caseId}?source=${source}`);
	setText(res.data.text);
        setAnnotations(res.data.annotations);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, [caseId, source]);

  return (
    <div className="flex-1 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Annotations from: {source}</h3>
        <div className="flex items-center space-x-2">
          <select
            className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            <option value="SME1">SME1</option>
            <option value="LLM">LLM</option>
            <option value="ETHER">ETHER</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>
      <AnnotatedText text={text} selectedTags={[]} annotations={annotations} />
    </div>
  );
};

export default ComparisonView;
