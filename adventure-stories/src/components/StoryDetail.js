import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Tabs from './Tabs';
import Tab from './Tab';
import './Css/StoryDetails.css';




const StoryDetail = () => {
    const { id } = useParams();
    const [story, setStory] = useState(null);

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const response = await axios.get(`https://mxpertztestapi.onrender.com/api/adventure/${id}`);
                setStory(response.data);
            } catch (error) {
                console.error('Error fetching story details:', error);
            }
        };

        fetchStory();
    }, [id]);

    if (!story) return <p>Loading...</p>;

    return (
        <div className="story-detail">
            <Tabs>
                <Tab label="Story Details">
                    <h1>{story.Title}</h1>
                    {story.Image.length > 0 ? (
                        <img src={`https://ik.imagekit.io/dev24/${story.Image[0]}`} alt={story.Title} />
                    ) : (
                        <p>No image available</p>
                    )}
                    <p>Status: {story.Status}</p>
                </Tab>
                <Tab label="Brainquest">
                    {story.Brainquest.map((question) => (
                        <div key={question._id} className="question-card">
                            <h3>{question.Question}</h3>
                            <ul>
                                {question.Option.map((option, index) => (
                                    <li key={index}>{option}</li>
                                ))}
                            </ul>
                            <p>Answer: {question.Answer}</p>
                        </div>
                    ))}
                </Tab>
                <Tab label="Additional Info">
                    <p>No additional information provided.</p>
                </Tab>
            </Tabs>
        </div>
    );
};

export default StoryDetail;
