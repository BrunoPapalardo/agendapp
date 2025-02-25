import { useState, useEffect } from 'react';

const AgendaJa = () => {
  const [position, setPosition] = useState({ top: 20, left: 20 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const startDrag = (e: React.MouseEvent) => {
    e.preventDefault(); // Impede o comportamento padrão de seleção
    setDragging(true);
    setOffset({
      x: e.clientX - position.left,
      y: e.clientY - position.top,
    });
  };

  const stopDrag = () => {
    setDragging(false);
  };

  const handleDrag = (e: MouseEvent) => {
    if (dragging) {
      setPosition({
        top: e.clientY - offset.y,
        left: e.clientX - offset.x,
      });
    }
  };

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', stopDrag);
    } else {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', stopDrag);
    }

    // Cleanup the listeners when component unmounts
    return () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', stopDrag);
    };
  }, [dragging]);

  return (
    <div
      className="fixed p-4 bg-blue-500 text-white rounded-full shadow-lg cursor-pointer z-50"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
      onMouseDown={startDrag}
    >
      Agenda Já
    </div>
  );
};

export default AgendaJa;
