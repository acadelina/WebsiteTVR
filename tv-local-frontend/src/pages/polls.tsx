'use client';
import Navbar from '@/components/Navbar';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Footer from '../components/Footer';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default,
      locale
    }
  };
}

export default function Sondaj() {
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [pollData, setPollData] = useState<number[]>(Array(10).fill(0));
  const [feedback, setFeedback] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [savedFeedbacks, setSavedFeedbacks] = useState<string[]>([]);

  const t = useTranslations('Sondaj');
  const locale = useLocale();

  useEffect(() => {
    const savedData = localStorage.getItem('pollResponses');
    if (savedData) {
      setPollData(JSON.parse(savedData));
    }
    
    const savedFeedbackData = localStorage.getItem('feedbacks');
    if (savedFeedbackData) {
      setSavedFeedbacks(JSON.parse(savedFeedbackData));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating !== null) {
      const newData = [...pollData];
      newData[rating - 1] += 1;
      localStorage.setItem('pollResponses', JSON.stringify(newData));
      setPollData(newData);
      setSubmitted(true);
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.trim()) {
      const newFeedbacks = [...savedFeedbacks, feedback];
      localStorage.setItem('feedbacks', JSON.stringify(newFeedbacks));
      setSavedFeedbacks(newFeedbacks);
      setFeedback('');
      setFeedbackSubmitted(true);
      
      setTimeout(() => {
        setFeedbackSubmitted(false);
      }, 3000);
    }
  };

  const chartData = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [{
      label: t('number'),
      data: pollData,
      backgroundColor: 'rgba(79, 70, 229, 1)',
      borderColor: 'rgba(79, 70, 229, 1)',
      borderWidth: 1
    }]
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-black">
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('question')}</h1>
          <p className="text-gray-600 mb-6">{t('answer_1')}</p>
          
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <div className="flex flex-wrap gap-3 justify-center">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setRating(num)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium transition-all transform hover:scale-110 ${
                        rating === num 
                          ? 'bg-indigo-600 text-white shadow-lg' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  disabled={rating === null}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    rating === null
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
                  }`}
                >
                  {t('btn_vote')}
                </button>
              </div>
            </form>
          ) : (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200 mb-8">
              <div className="flex items-center text-green-700">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{t('message')} <span className="font-bold">{rating}</span>.</span>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('polls_results')}</h2>
          <div className="h-80 mb-6">
            <Bar 
              data={chartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1
                    },
                    grid: {
                      color: 'rgba(0, 0, 0, 0.05)'
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                },
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      font: {
                        size: 14
                      }
                    }
                  }
                }
              }}
            />
          </div>
          <div className="text-center py-4 border-t border-gray-100">
            <p className="text-gray-600">
              <span className="font-semibold">{t('total_results')}</span> {pollData.reduce((a, b) => a + b, 0)}
            </p>
          </div>
        </div>

        {/* New Feedback Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('feedback')}</h2>
          <p className="text-gray-600 mb-6">{t('feedback_mess')}</p>
          
          {feedbackSubmitted && (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200 mb-6">
              <div className="flex items-center text-green-700">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{t('feedback_confirm')}</span>
              </div>
            </div>
          )}
          
          <form onSubmit={handleFeedbackSubmit}>
            <div className="mb-6">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows={5}
                placeholder={t('answer_2')}
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                disabled={!feedback.trim()}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  !feedback.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
                }`}
              >
                {t('btn_feedback')}
              </button>
            </div>
          </form>

          {savedFeedbacks.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('recent')}</h3>
              <div className="space-y-4">
                {savedFeedbacks.map((item, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
}