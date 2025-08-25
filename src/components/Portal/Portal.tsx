import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  containerId?: string;
}

export const Portal: React.FC<PortalProps> = ({
  children,
  containerId = 'modal-root',
}) => {
  const [container, setContainer] = React.useState<HTMLElement | null>(null);

  useEffect(() => {
    let modalContainer = document.getElementById(containerId);

    if (!modalContainer) {
      modalContainer = document.createElement('div');
      modalContainer.id = containerId;
      modalContainer.style.position = 'fixed';
      modalContainer.style.top = '0';
      modalContainer.style.left = '0';
      modalContainer.style.zIndex = '1000';
      document.body.appendChild(modalContainer);
    }

    setContainer(modalContainer);

    return () => {
      if (modalContainer && modalContainer.children.length === 0) {
        document.body.removeChild(modalContainer);
      }
    };
  }, [containerId]);

  if (!container) return null;

  return createPortal(children, container);
};
