import React from 'react';
import { ChevronDown } from 'lucide-react';
import AnnotatedText from './AnnotatedText';

interface ComparisonViewProps {
  selectedTags: string[];
}

const sampleText = `This spontaneous case was reported by an other health professional via Regulatory authority (15020410209932023000221) from China (Local reference ID: TCH-2825) on 19-Dec-2023 and describes the occurrence of LIPIDS INCREASED (Lipids blood increased) and BLOOD CREATINE PHOSPHOKINASE INCREASED (Creatine kinase increased) in a 53-year-old Asian (Han Chinese) male patient who received Brigatinib tablet (batch no. 024856) for Lung neoplasm malignant. Co-suspect product included non-company product Lorlatinib for Lung neoplasm malignant. Concurrent medical conditions included Lung neoplasm malignant (Lung adenocarcinoma). On 12-Feb-2023, the patient started Lorlatinib (Oral) at a dose of 100 milligram once a day. On 01-Dec-2023, the patient started Brigatinib (Oral) at a dose of 90 milligram once a day.`;

const ComparisonView: React.FC<ComparisonViewProps> = ({ selectedTags }) => {
  return (
    <div className="flex-1 grid grid-cols-2 gap-4 p-4">
      {/* SME Annotations */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="bg-blue-50 px-4 py-3 border-b border-gray-200 rounded-t-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">SME Annotations</h3>
            <div className="flex items-center space-x-2">
              <select className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white">
                <option>SME1</option>
                <option>SME2</option>
                <option>SME3</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <AnnotatedText 
            text={sampleText}
            selectedTags={selectedTags}
            annotations={[
              { start: 316, end: 332, type: 'LIPIDS_INCREASED', label: 'LIPIDS INCREASED' },
              { start: 349, end: 386, type: 'BLOOD_CREATINE', label: 'BLOOD CREATINE PHOSPHOKINASE' },
              { start: 415, end: 427, type: 'AGE', label: '53-year-old' },
              { start: 428, end: 433, type: 'SEX', label: 'Asian' },
              { start: 500, end: 510, type: 'DRUG', label: 'Brigatinib' },
              { start: 549, end: 571, type: 'INDICATION', label: 'Lung neoplasm malignant' },
              { start: 611, end: 621, type: 'SDRUG', label: 'Lorlatinib' },
              { start: 719, end: 739, type: 'MEDICAL_HISTORY', label: 'Lung adenocarcinoma' },
              { start: 744, end: 755, type: 'DATE', label: '12-Feb-2023' },
              { start: 777, end: 787, type: 'DRUG', label: 'Lorlatinib' },
              { start: 807, end: 820, type: 'DOSE', label: '100 milligram' },
              { start: 836, end: 847, type: 'DATE', label: '01-Dec-2023' },
              { start: 869, end: 879, type: 'DRUG', label: 'Brigatinib' },
              { start: 899, end: 911, type: 'DOSE', label: '90 milligram' }
            ]}
          />
        </div>
      </div>

      {/* AI Annotations */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="bg-green-50 px-4 py-3 border-b border-gray-200 rounded-t-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">AI Annotation / Meta Information</h3>
            <div className="flex items-center space-x-2">
              <select className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white">
                <option>LLM</option>
                <option>NLP Model</option>
                <option>Rule-based</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <AnnotatedText 
            text={sampleText}
            selectedTags={selectedTags}
            annotations={[
              { start: 316, end: 332, type: 'LIPIDS_INCREASED', label: 'LIPIDS INCREASED' },
              { start: 349, end: 386, type: 'BLOOD_CREATINE', label: 'BLOOD CREATINE PHOSPHOKINASE' },
              { start: 415, end: 427, type: 'AGE', label: '53-year-old' },
              { start: 428, end: 446, type: 'SEX', label: 'Asian (Han Chinese)' },
              { start: 500, end: 510, type: 'DRUG', label: 'Brigatinib' },
              { start: 549, end: 571, type: 'INDICATION', label: 'Lung neoplasm malignant' },
              { start: 611, end: 621, type: 'SDRUG', label: 'Lorlatinib' },
              { start: 689, end: 710, type: 'MEDICAL_HISTORY', label: 'Lung neoplasm malignant' },
              { start: 712, end: 732, type: 'MEDICAL_HISTORY', label: 'Lung adenocarcinoma' },
              { start: 744, end: 755, type: 'DATE', label: '12-Feb-2023' },
              { start: 777, end: 787, type: 'DRUG', label: 'Lorlatinib' },
              { start: 807, end: 820, type: 'DOSE', label: '100 milligram' },
              { start: 836, end: 847, type: 'DATE', label: '01-Dec-2023' },
              { start: 869, end: 879, type: 'DRUG', label: 'Brigatinib' },
              { start: 899, end: 911, type: 'DOSE', label: '90 milligram' }
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;