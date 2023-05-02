import React, { useState, useEffect } from 'react';

interface JobCardProps {
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
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isWalkingBack, setIsWalkingBack] = useState<boolean>(false);

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
    setIsClicked(true);
  };
  onClick
  }) => {

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
      console.error('Error occurred while adding job to interested list:', error.response.data);
    }
  };
  const showDetails = (event: any) => {
    onClick(event.currentTarget.id);
  }

  const handleMouseEnter = () => {
    setIsHovering(true);
    setIsWalkingBack(false);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setIsWalkingBack(true);
    };
    
    return (
    <div className='JobCard'>
    <div className='JobCardInner'>
    <a href={Link} style={{ color: 'yellow', fontSize: '1.2rem', fontWeight: 'bold', textShadow: '2px 2px #333' }}>
    {Title}
    </a>
    <p>{Company}</p>
    <p>{Location}</p>
    <p>{DatePosted}</p>
    <img
    className='PokemonImage'
    src={pokemon}
    alt='Pokemon'
    onClick={handleClick}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    style={{
    cursor: 'pointer',
    transform: isWalkingBack ? 'scaleX(-1)' : 'scaleX(1)',
    animation: isHovering
    ? 'walk 0.5s steps(4) infinite'
    : 'none',
    }}
    />
    <button onClick={onInterested}>Interested</button>

  return (
    <div className='JobCard' onClick={showDetails} id={`${ID}`}>
      <div className='JobCardInner'>
        <a href={Link} target='_blank' rel='noreferrer noopener'>{Title}</a>
        <p>{Company}</p>
        <p>{Location}</p>
        <p>{DatePosted} {TimePosted ?`(${TimePosted})` : null}</p>
        <button id='interestedButton' onClick={onInterested}>Interested</button>
      </div>
      <div>

      </div>

    </div>
    </div>
    );
    };
    
    export default JobCard;