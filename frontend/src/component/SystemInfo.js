import React, {useState, useEffect} from 'react';
import axios from 'axios';

const SystemInfo = () => {
    const [systemInfo, setSystemInfo] = useState(null);
    const [fileContent, setFileContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [infoResponse, fileResponse] = await Promise.all([
                    axios.get('http://localhost:3001/system/info'),
                    axios.get('http://localhost:3001/system/file-content')
                ]);
                setSystemInfo(infoResponse.data);
                setFileContent(fileResponse.data.content);
                setLoading(false);
            } catch (err) {
                setError('Error fetching data');
                setLoading(false);
                console.error(err);
            }
        };

        fetchData();
    }, []);

    const bytesToGB = (bytes) => {
        return (bytes / (1024 * 1024 * 1024)).toFixed(2);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error! </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        );
    }

    if (!systemInfo) return null;

    const InfoCard = ({title, value, icon}) => (
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-3">
                <span className="text-2xl">{icon}</span>
                <div>
                    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
                    <p className="mt-1 text-lg font-semibold text-gray-900">{value}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-4 bg-blue-500">
                    <h2 className="text-2xl font-bold text-white">System Information</h2>
                </div>
            </div>

            <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <InfoCard title="Platform" value={systemInfo.platform} icon="🖥️"/>
                    <InfoCard title="Architecture" value={systemInfo.arch} icon="⚙️"/>
                    <InfoCard title="CPUs" value={systemInfo.cpus} icon="💻"/>
                    <InfoCard
                        title="Total Memory"
                        value={`${bytesToGB(systemInfo.totalMemory)} GB`}
                        icon="💾"
                    />
                    <InfoCard
                        title="Free Memory"
                        value={`${bytesToGB(systemInfo.freeMemory)} GB`}
                        icon="🔄"
                    />
                </div>

                {/* Новый компонент для отображения содержимого файла */}
                <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">File Content (info.txt)</h3>
                    <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <pre className="whitespace-pre-wrap text-sm text-gray-700">
              {fileContent}
            </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemInfo;