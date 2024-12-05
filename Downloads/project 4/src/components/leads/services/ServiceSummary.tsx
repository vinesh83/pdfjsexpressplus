import React, { useState } from 'react';
import { DollarSign, Send, Sparkles, Loader2 } from 'lucide-react';
import { generateQuoteNotes } from '../../../utils/generateQuoteNotes';
import { Service } from '../../../types/services';

interface ServiceSummaryProps {
  attorneyFees: number;
  filingFees: number;
  total: number;
  services: Service[];
  clientName: string;
  onSendQuote?: (notes: string) => void;
}

const ServiceSummary: React.FC<ServiceSummaryProps> = ({ 
  attorneyFees, 
  filingFees, 
  total,
  services,
  clientName,
  onSendQuote 
}) => {
  const [attorneyNotes, setAttorneyNotes] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const handleSendQuote = () => {
    if (onSendQuote) {
      onSendQuote(attorneyNotes);
      setAttorneyNotes('');
    }
  };

  const handleGenerateNotes = async () => {
    try {
      setIsGenerating(true);
      setError(null);
      const generatedNotes = await generateQuoteNotes(services, clientName, total);
      setAttorneyNotes(generatedNotes);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white p-6 space-y-6">
      {/* Fee Breakdown */}
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-32 text-sm font-medium text-gray-500">Attorney Fees</div>
            <div className="text-lg font-semibold text-gray-900">
              {formatCurrency(attorneyFees)}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-32 text-sm font-medium text-gray-500">Filing Fees</div>
            <div className="text-lg font-semibold text-gray-900">
              {formatCurrency(filingFees)}
            </div>
          </div>
        </div>

        {/* Total Amount */}
        <div className="flex items-center space-x-2 bg-green-50 px-6 py-3 rounded-xl">
          <div className="text-sm font-medium text-green-700">Total</div>
          <div className="flex items-center">
            <DollarSign className="w-6 h-6 text-green-600" />
            <span className="text-2xl font-bold text-green-600">
              {formatCurrency(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Attorney Notes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            Special Note From Attorney
          </label>
          <button
            onClick={handleGenerateNotes}
            disabled={isGenerating || services.length === 0}
            className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate with AI</span>
              </>
            )}
          </button>
        </div>
        
        <textarea
          value={attorneyNotes}
          onChange={(e) => setAttorneyNotes(e.target.value)}
          placeholder="Add any special notes or instructions to include with the fee quote..."
          className="w-full h-32 px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
        />

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}
      </div>

      {/* Send Quote Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSendQuote}
          disabled={total === 0}
          className={`
            flex items-center space-x-2 px-6 py-3 rounded-xl font-medium
            transition-all duration-200
            ${total > 0
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          <Send className="w-5 h-5" />
          <span>Send Fee Quote</span>
        </button>
      </div>
    </div>
  );
};

export default ServiceSummary;