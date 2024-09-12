import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Css/StoriesList.css';




const StoriesList = () => {
    const [stories, setStories] = useState([]);
    const [activeTab, setActiveTab] = useState('New');
    const [currentPage, setCurrentPage] = useState(1);
    const [storiesPerPage] = useState(8); // Number of stories per page

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await axios.get('https://mxpertztestapi.onrender.com/api/adventure');
                if (Array.isArray(response.data)) {
                    setStories(response.data);
                } else {
                    console.error('Unexpected data format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching stories:', error);
            }
        };

        fetchStories();
    }, []);

    const defaultImageUrl = 'https://fastly.picsum.photos/id/385/200/300.jpg?hmac=IG8cHDliDmlgbSYX1yquX_5cAHcuS_O378oPs5rZGrU';

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1); // Reset to the first page when changing tab
    };

    const filteredStories = stories.filter(story => {
        if (activeTab === 'All') return true;
        return story.Status === activeTab;
    });

    // Pagination logic
    const indexOfLastStory = currentPage * storiesPerPage;
    const indexOfFirstStory = indexOfLastStory - storiesPerPage;
    const currentStories = filteredStories.slice(indexOfFirstStory, indexOfLastStory);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="stories-list">
            <div className="top-image-container">
                <img 
                    src="https://fastly.picsum.photos/id/385/200/300.jpg?hmac=IG8cHDliDmlgbSYX1yquX_5cAHcuS_O378oPs5rZGrU" 
                    alt="Top Banner"
                    className="top-image"
                />
                <div className="top-image-text">
                    <h1>Science Fiction Movies</h1>
                    <div className="tabs">
                <button 
                    className={`tab new ${activeTab === 'New' ? 'active' : ''}`} 
                    onClick={() => handleTabClick('New')}
                >
                    New
                </button>
                <button 
                    className={`tab in-progress ${activeTab === 'In Progress' ? 'active' : ''}`} 
                    onClick={() => handleTabClick('In Progress')}
                >
                    In Progress
                </button>
                <button 
                    className={`tab completed ${activeTab === 'Completed' ? 'active' : ''}`} 
                    onClick={() => handleTabClick('Completed')}
                >
                    Completed
                </button>
                <button 
                    className={`tab clear ${activeTab === 'All' ? 'active' : ''}`} 
                    onClick={() => handleTabClick('All')}
                >
                    Clear All
                </button>
            </div>
                </div>
            </div>
           
            <div className="stories-grid">
                {currentStories.length > 0 ? (
                    currentStories.map((story) => {
                        const image = (story.Image && story.Image[0]) ? `https://ik.imagekit.io/dev24/${story.Image[0]}` : defaultImageUrl;
                        const title = story.Title || 'No Title';
                        const status = story.Status ? story.Status.toLowerCase() : 'unknown-status';

                        return (
                            <Link to={`/story/${story._id}`} key={story._id} className="story-card">
                                <img
                                    src={image}
                                    alt={title}
                                    className="story-image"
                                />
                                <h2>{title}</h2>
                                <p className={`status ${status}`}>{story.Status || 'Default Status'}</p>
                            </Link>
                        );
                    })
                ) : (
                    <p>No stories available.</p>
                )}
            </div>
            <div className="pagination">
                <button 
                    className="page-button" 
                    onClick={() => paginate(currentPage - 1)} 
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="page-info">Page {currentPage}</span>
                <button 
                    className="page-button" 
                    onClick={() => paginate(currentPage + 1)} 
                    disabled={currentPage >= Math.ceil(filteredStories.length / storiesPerPage)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default StoriesList;
