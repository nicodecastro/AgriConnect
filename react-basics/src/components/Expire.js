import React, { useEffect, useState } from 'react';
import './Expire.css';

function Expire(props)
{
  const { text, delay, expireKey, bgColor } = props;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
      if (expireKey != 0) {
          setIsVisible(true);
          const timer = setTimeout(() => setIsVisible(false), delay);
          return () => clearTimeout(timer);
      }
  }, [expireKey]);

  return (
      isVisible ? 
      <div className='popup-page'>
        <div className={`popup-content`} style={{backgroundColor: bgColor}}>
          <p>{text}</p>
        </div>
      </div>
          : <span />
  );
}

export default Expire;