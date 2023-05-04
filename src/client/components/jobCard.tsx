import React, { useState, useEffect, useContext } from 'react';
import { JobFeedContainerContext } from '../pages/JobPage';

export interface JobCardProps {
  Title: string;
  Company: string;
  Location: string;
  Link: string;
  DatePosted: string;
  TimePosted: string;
  ID: number;
  onClick?: (ID: number) => void;
}

const JobCard: React.FC<JobCardProps> = ({
  Title,
  Company,
  Location,
  Link,
  TimePosted,
  DatePosted,
  ID,
}) => {
  const [pokemon, setPokemon] = useState<string>('');
  // const [isHovering, setIsHovering] = useState<boolean>(false);
  // const [isWalkingBack, setIsWalkingBack] = useState<boolean>(false);
  const { jobs, setJobDetails } = useContext(JobFeedContainerContext);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')
      .then((response) => response.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const randomPokemon = data.results[randomIndex];

        fetch(randomPokemon.url)
          .then((response) => response.json())
          .then((data) => {
            setPokemon(data.sprites.front_default);
          });
      });
  }, []);

  const handleClick = () => {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')
      .then((response) => response.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const randomPokemon = data.results[randomIndex];

        fetch(randomPokemon.url)
          .then((response) => response.json())
          .then((data) => {
            setPokemon(data.sprites.front_default);
          });
      });
  };

  const onInterested = async () => {
    try {
      const response = await fetch('api/user/interested', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobId: ID }),
      });

      if (response.ok) {
        console.log('Job successfully added to interested list');
      } else {
        console.log('Failed to add job to interested list');
      }
    } catch (error) {
      console.error(
        'Error occurred while adding job to interested list:',
        error.response.data
      );
    }
  };

  const onClickDetails = async (ID: number) => {
    try {
      const response = await fetch(`/api/search/getLinkedInData/${ID}`, {
        method: 'GET',
      });
      const data = await response.text();
      const jobsIndex = jobs.findIndex((el: JobCardProps) => {
        return el.ID === ID;
      });

      setJobDetails({ html: data, job: jobs[jobsIndex] });
    } catch (error) {
      console.error(
        'Error occurred while adding job to interested list:',
        error
      );
    }
  };

  return (
    <div className="JobCard" onClick={() => onClickDetails(ID)} id={`${ID}`}>
      <div className="JobCardInner">
        <a href={Link} target="_blank" rel="noreferrer noopener">
          {Title}
        </a>
        <p>{Company}</p>
        <p>{Location}</p>
        <p>
          {DatePosted} {TimePosted ? `(${TimePosted})` : null}
        </p>
        <button id="interestedButton" onClick={onInterested}>
          Interested
        </button>
      </div>
      <img
        className="PokemonImage"
        src={pokemon}
        alt="Pokemon"
        onClick={handleClick}
      />
    </div>
  );
};

export default JobCard;
