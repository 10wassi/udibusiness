import  React,{ useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only show custom cursor if screen is large enough
    const handleResize = () => {
      setVisible(window.innerWidth >= 1024);
    };

    handleResize(); // Set initial visibility
    window.addEventListener('resize', handleResize);

    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      
      // Add event listeners for interactive elements
      const interactiveElements = document.querySelectorAll('a, button');
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', onElementMouseEnter);
        element.addEventListener('mouseleave', onElementMouseLeave);
      });
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      
      // Remove event listeners for interactive elements
      const interactiveElements = document.querySelectorAll('a, button');
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', onElementMouseEnter);
        element.removeEventListener('mouseleave', onElementMouseLeave);
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseEnter = () => {
      setVisible(true);
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    const onElementMouseEnter = () => {
      setIsHovering(true);
    };

    const onElementMouseLeave = () => {
      setIsHovering(false);
    };

    if (visible) {
      addEventListeners();
    }

    return () => {
      removeEventListeners();
      window.removeEventListener('resize', handleResize);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      <div 
        className="cursor-dot"
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px)`,
          width: isHovering ? '12px' : '8px',
          height: isHovering ? '12px' : '8px',
        }}
      />
      <div 
        className="cursor-outline"
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px)`,
          width: isHovering ? '60px' : '40px',
          height: isHovering ? '60px' : '40px',
          borderColor: isHovering ? 'rgba(255, 192, 0, 0.5)' : 'rgba(0, 128, 255, 0.5)',
        }}
      />
    </>
  );
};

export default CustomCursor;
