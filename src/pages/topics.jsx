import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';

export default function Topics() {
  const [axios] = useAxios();
  const [data, setData] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get('/api/topicdata');
        const topics = response?.data?.data;
        setData(topics)
       
      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  useEffect(() => {
     // Group data by category
     const grouped = data.reduce((acc, topic) => {
      const { category } = topic;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(topic);
      return acc;
    }, {});

    setGroupedData(grouped);
  }, [data])
  

  const handleUpdateStatus = async (id, isDone, level)=>{
    try {
      const response = await axios.post('/api/updatetopic', {
        topicId: id,
        isDone,
        level
      });
     
    } catch (error) {
      console.error('Error fetching progress:', error);
    } 
  }
 

  const handleToggleCheckBox = (e)=>{
    const type = e.target.getAttribute('data-type');
    if(type === 'click-to-checkbox'){
      const id = e.target.getAttribute('data-id');
      const level = e.target.getAttribute('data-level');
      let updateTopics = data.map((item)=>{
        if(item.id == id){
          item.status = (item?.status == true) ? false : true;
          handleUpdateStatus(id, item?.status, level)
        }
        return item;
      })
      setData(updateTopics)
    }
  }

  const handleToggle = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div className="max-w-6xl mx-auto p-6" onClick={handleToggleCheckBox}>
      <h1 className="text-3xl font-bold mb-6 text-center">Topics</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        Object.keys(groupedData).map((category) => (
          <div key={category} className="mb-6">
            <div
              className="cursor-pointer bg-gray-800 text-white py-3 px-4 rounded-lg flex justify-between items-center"
              onClick={() => handleToggle(category)}
            >
              <h2 className="text-xl">{category}</h2>
              <span
                className={`transform transition-transform duration-300 ease-in-out ${
                  expandedCategory === category ? 'rotate-180' : ''
                }`}
              >
                {expandedCategory === category ? '-' : '+'}
              </span>
            </div>

            <div
              className={`px-4 overflow-hidden transition-all duration-500 ease-in-out ${
                expandedCategory === category ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <p className='text-gray-800 mt-4 font-bold'>Sub Topics</p>
              <table className="min-w-full mt-4 table-auto border-collapse">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-800">Name</th>
                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-800">Leetcode</th>
                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-800">YouTube</th>
                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-800">Article</th>
                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-800">Level</th>
                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-800">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedData[category].map((topic) => (
                    <tr key={topic.id} className="border-b hover:bg-gray-100">
                      <td className="py-2 px-4">
                      <input type="checkbox" defaultChecked={topic?.status ? 'checked' : ''} className='me-2' data-type="click-to-checkbox" data-level={topic?.level} data-id={topic?.id} id={`check-id-${topic?.id}`} /> 
                      <label htmlFor={`check-id-${topic?.id}`}>{topic.name}</label>
                      </td>
                      <td className="py-2 px-4">
                        <a href={topic.leetcode_link} target="_blank" className="text-blue-500">
                          Leetcode
                        </a>
                      </td>
                      <td className="py-2 px-4">
                        <a href={topic.youtube_link} target="_blank" className="text-blue-500">
                          YouTube
                        </a>
                      </td>
                      <td className="py-2 px-4">
                        <a href={topic.article_link} target="_blank" className="text-blue-500">
                          Article
                        </a>
                      </td>
                      <td className="py-2 px-4">{topic.level}</td>
                      <td className={`py-2 px-4 ${topic?.status ? 'text-green-600' : 'text-amber-500'}`}>{topic?.status ? 'Done' : 'Pending'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
