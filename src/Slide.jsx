import React, { useEffect, useState } from 'react';

function Slider({ width, height, autoPlay, autoPlayTime }) {

  useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/photos?_limit=8')
          .then(response => response.json())
          .then(data => setImage(data))
  }, [])


    const [image, setImage] = useState([]);
    const [paused, setPaused] = useState(false);
    const [touchPosition, setTouchPosition] = useState();
    const [activeIndex, setActiveIndex] = useState(0);



    function updateIndex(newIndex) {
      if (newIndex < 0) {
        newIndex = image.length -1
      } else if (newIndex >= image.length) {
        newIndex = 0
      }

      setActiveIndex(newIndex)
    }


    useEffect(() => {
      if (autoPlay) {
        const interval = setInterval(() => {
          if (!paused) {
            updateIndex(activeIndex +1);
          }
        }, autoPlayTime ? autoPlayTime : 2000)
  
        return () => {
          if (interval) {
            clearInterval(interval)
          }
        }
      }
    });

    const handleTouchStart = (e) => {
      const touchDown = e.touches[0].clientX;
      setTouchPosition(touchDown);
    }



    const handleTouchMove = (e) => {
      if (touchPosition === null) {
        return;
      }
  
      const currentPosition = e.touches[0].clientX;
      const direction = touchPosition - currentPosition;
  
      console.log(direction)
      if (direction > 8) {
        updateIndex(activeIndex +1);
      }
  
      if (direction < -8) {
        updateIndex(activeIndex -1);
      }
  
      setTouchPosition(null);
    }





  if (image.length < 1) return <div>Loading</div> 

  return (
    <div 
      className="slider"
      onTouchStart={handleTouchStart}
      onTouchMove={(e) => handleTouchMove(e)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        width: width ? `${width}px`:'600px',
        height: '100%',
        margin: '10px 10px',
        overflow: 'hidden'
      }}
      >
      
      <div 
        className="slide-inner"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
          display: 'flex',
          transition: 'transform 0.3s',
          whiteSpace: 'nowrap',
          height: '100%'
        }}
        >
        {
          image.map((el) => (
            <div 
              className='slide-item'
              key={el.id}
              style={{
                width: '100%',
                height: '100%'
        }}
        >
            <img 
                className='slide-img' 
                src={el.url} 
                alt='sliderImage' 
                style={{
                    width: width ? `${width}px` : `600px`,
                    height: height ? `${height}px` : '300px',
                }}
                />
            <div 
              className="slide-item-title" 
              style={{whiteSpace: 'normal'}}>
                {
                  el.title
                }
            </div>
    </div>
          ))
        }
      
      </div>
      <div className="controls">
        <div className="arrows">
          <button
            onClick={() => updateIndex(activeIndex -1)}
          >1</button>
          <button
            onClick={() => updateIndex(activeIndex +1)}
          >2</button>
        </div>
        <div className="dots">
          {
            image.map((el,i) => (
              <button 
                className={activeIndex === i ? 'dot-active' : 'dot'} 
                key={el.id}
                onClick={() => updateIndex(i)}
                ></button>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Slider