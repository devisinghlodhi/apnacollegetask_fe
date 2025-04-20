// src/pages/Progress.jsx
import React, { useEffect, useState } from 'react';
import ProgressChart from '../components/ProgressChart';
import useAxios from '../hooks/useAxios';

const Progress = () => {
  const [axios] = useAxios()
  const [progress, setProgress] = useState({ easy: 0, medium: 0, hard: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get('/api/progress');
        setProgress(response?.data?.data);
      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  const total = progress.easy + progress.medium + progress.hard;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 rounded-xl shadow mt-10">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Progress
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading progress...</p>
      ) : (
        <div className="flex flex-col md:flex-row items-center gap-10 min-h-[300px]">
          {/* Left side - Progress Bars */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            {total > 0 ? (
              <div className="space-y-6 w-full md:w-4/5 max-w-xs">
                {[
                  { label: 'Easy', value: progress.easy, color: 'bg-green-500' },
                  { label: 'Medium', value: progress.medium, color: 'bg-yellow-500' },
                  { label: 'Hard', value: progress.hard, color: 'bg-red-500' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      <span className="text-sm font-medium text-gray-700">{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`${item.color} h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">No progress data available.</p>
            )}
          </div>

          {/* Right side - Chart */}
          <div className="w-full md:w-1/2 flex justify-center">
            {total > 0 ? (
              <ProgressChart
                easy={progress.easy}
                medium={progress.medium}
                hard={progress.hard}
              />
            ) : (
              <div className="text-gray-400">No chart to display.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;
